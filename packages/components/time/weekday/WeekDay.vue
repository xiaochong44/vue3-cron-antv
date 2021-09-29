<template>
  <div class="cron-body-row">
    <Radio :checked="type === WEEK_DAY" @change="change">
      <span class="symbol">{{ tag_ }}</span>
      {{ Message.common.current }}{{targetTimeUnit}}{{Message.common.nth}}
    </Radio>
    <InputNumber
      size="small"
      v-model:value="nth"
      :min="1"
      :step="1"
      :max="5"
      :disabled="type !== WEEK_DAY"
      @change="change"
    />
    {{Message.common.index}}
    <Select
      size="small"
      style="width: 100px;"
      v-model:value="weekDayNum"
      :options="nums"
      :placeholder="Message.common.placeholder"
      :disabled="type !== WEEK_DAY"
      @change="change"
    />
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
import { WEEK_DAY } from "../../../constant/filed";
import Local from "../../../locale";
import { isNumber } from "../../../utils/validate";
const Message = Local.messages();

export default defineComponent({
  components: { Radio, InputNumber,Select },
  props: {
    targetTimeUnit: {
      type: String,
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
      default: WEEK_DAY ,
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
    const nth = ref(1);
    const weekDayNum = ref(1);
    const tag_ = computed(() => `${nth.value}${WEEK_DAY}${weekDayNum.value}`);
    function change() {
      props.onChange && props.onChange({ type: WEEK_DAY, tag: tag_.value });
    }
    function changeTag(newValue) {
      if (props.type !== WEEK_DAY) {
        return;
      }
      const arr: any = newValue.split(WEEK_DAY);
      if (arr.length !== 2) {
        message.error(`${Message.common.tagError}:${newValue}`)        
        return;
      }     
      if (
        !isNumber(arr[0]) ||
        parseInt(arr[0]) < parseInt(props.nums[0].value) ||
        parseInt(arr[0]) > parseInt(props.nums[props.nums.length - 1].value)
      ) {
        message.error(`${Message.period.startError}:${arr[0]}`)
        return;
      }
      if (
        !isNumber(arr[1]) ||
        parseInt(arr[1]) < 1 ||
        parseInt(arr[1]) > 5
      ) {
        message.error(`${Message.period.cycleError}:${arr[1]}`)
        return;
      }
      nth.value = parseInt(arr[0]);
      weekDayNum.value = parseInt(arr[1]);
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
      nth,
      weekDayNum,
      tag_,
      WEEK_DAY,
      change,
      changeTag,
    };
  },
});
</script>
