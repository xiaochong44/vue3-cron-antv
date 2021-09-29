<template>
  <div class="cron-body-row">
    <Radio :checked="type === WORK_DAY" @change="change">
      <span class="symbol">{{ tag_ }}</span>
      {{ Message.common.every }}{{targetTimeUnit}}
    </Radio>
    <InputNumber
      size="small"
      v-model:value="startDate"
      :min="startDateConfig.min"
      :step="startDateConfig.step"
      :max="startDateConfig.max"
      :disabled="type !== WORK_DAY"
      @change="change"
    />
    {{timeUnit}}{{Message.common.nearest}}{{Message.custom.workDay}}
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  PropType,
  watch,
  onMounted,
} from "vue";
import { Radio, InputNumber,Select, message } from "ant-design-vue";
import { WORK_DAY  } from "../../constant/filed";
import Local from "../../locale";
import { isNumber } from "../../utils/validate";
import { InputNumberConfig } from "../../utils/types";
const Message = Local.messages();

export default defineComponent({
  components: { Radio, InputNumber,Select },
  props: {
    targetTimeUnit: {
      type: String,
      default: null,
    },
    startDateConfig: {
      type: Object as PropType<InputNumberConfig>,
      default: null,
    },
    nums: {
      type: Array as PropType<{ label: string; value: string }[]>,
      default: null,
    },
    timeUnit: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: WORK_DAY ,
    },
    tag: {
      type: String,
      default: '' ,
    },
    onChange: {
      type: Function as PropType<(arg: { tag: string; type: string }) => void>,
    },
  },
  setup(props) {
    const type_ = ref(props.type);
    const startDate = ref(1);
    const weekDayNum = ref(1);
    const tag_ = computed(() => `${startDate.value}${WORK_DAY}`);
    function change() {
      props.onChange && props.onChange({ type: WORK_DAY, tag: tag_.value });
    }
    function changeTag(newValue) {
      if (props.type !== WORK_DAY) {
        return;
      }
      const numStr = newValue.substring(0, newValue.length - WORK_DAY.length);    
      if (
        !isNumber(numStr) ||
        parseInt(numStr) < props.startDateConfig.min ||
        parseInt(numStr) > props.startDateConfig.max
      ) {
        message.error(`${Message.common.numError}:${numStr}`)
        return;
      }
      startDate.value = parseInt(numStr);
    }
    onMounted(() => {
      changeTag(props.tag);
    });
    watch(
      () => props.tag,
      (val) => {
        changeTag(val);
      },
      { deep: true }
    );
    watch(
      () => props.type,
      () => {
        changeTag(props.tag);
      },
      { deep: true }
    );
    return {
      Message,
      type_,
      startDate,
      weekDayNum,
      tag_,
      WORK_DAY,
      change,
      changeTag,
    };
  },
});
</script>
