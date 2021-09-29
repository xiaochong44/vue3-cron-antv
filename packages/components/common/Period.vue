<template>
  <div class="cron-body-row">
    <Radio :checked="type === PERIOD" @change="change">
      <span class="symbol">{{ tag_ }}</span>
      {{ Message.common.fromThe }}
      <InputNumber
        size="small"
        v-model:value="start"
        :min="startConfig.min"
        :step="startConfig.step"
        :max="startConfig.max"
        :disabled="type !== PERIOD"
        @change="change"
      />
      {{ timeUnit }}{{ Message.common.start }}{{ Message.common.every }}
      <InputNumber
        size="small"
        v-model:value="cycle"
        :min="cycleConfig.min"
        :step="cycleConfig.step"
        :max="cycleConfig.max"
        :disabled="type !== PERIOD"
        @change="change"
      />
      {{ timeUnit }}
    </Radio>
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
import { Radio, InputNumber, message } from "ant-design-vue";
import { EVERY, PERIOD } from "../../constant/filed";
import Local from "../../locale";
import { InputNumberConfig } from "../../utils/types";
import { isNumber } from "../../utils/validate";
const Message = Local.messages();

export default defineComponent({
  components: { Radio, InputNumber },
  props: {
    startConfig: {
      type: Object as PropType<InputNumberConfig>,
      default: null,
    },
    cycleConfig: {
      type: Object as PropType<InputNumberConfig>,
      default: null,
    },
    timeUnit: {
      type: String,
      default: null,
    },
    symbol: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: PERIOD,
    },
    tag: {
      type: String,
      default: PERIOD,
    },
    onChange: {
      type: Function as PropType<(arg: { tag: string; type: string }) => void>,
    },
  },
  setup(props) {
    const type_ = ref(props.type);
    const start = ref(0);
    if(start.value<props.startConfig.min){
      start.value=props.startConfig.min
    }
    const cycle = ref(1);
    const tag_ = computed(() => `${start.value}${PERIOD}${cycle.value}`);
    function change() {
      props.onChange && props.onChange({ type: PERIOD, tag: tag_.value });
    }
    function changeTag(newValue) {
      if (props.type !== PERIOD) {
        return;
      }
      const arr: any = newValue.split(PERIOD);
      if (arr.length !== 2) {
        message.error(`${Message.common.tagError}:${newValue}`)   
        return;
      }
      if (arr[0] === EVERY) {
        arr[0] = 0;
      }
      if (
        !isNumber(arr[0]) ||
        parseInt(arr[0]) < props.startConfig.min ||
        parseInt(arr[0]) > props.startConfig.max
      ) {
        message.error(`${Message.period.startError}:${arr[0]}`)
        return;
      }
      if (
        !isNumber(arr[1]) ||
        parseInt(arr[1]) < props.cycleConfig.min ||
        parseInt(arr[1]) > props.cycleConfig.max
      ) {
        message.error(`${Message.period.cycleError}:${arr[1]}`)
        return;
      }
      start.value = parseInt(arr[0]);
      cycle.value = parseInt(arr[1]);
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
      start,
      cycle,
      tag_,
      PERIOD,
      change,
      changeTag,
    };
  },
});
</script>
