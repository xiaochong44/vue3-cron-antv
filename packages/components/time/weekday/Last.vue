<template>
  <div class="cron-body-row">
    <Radio :checked="type === LAST" @change="change">
      <span class="symbol">{{ tag_ }}</span>
      {{ Message.common.current }}{{ targetTimeUnit
      }}{{ Message.custom.lastTh }}
    </Radio>
    <Select
      size="small"
      style="width: 100px;"
      v-model:value="lastNum"
      :options="nums"
      :placeholder="Message.common.placeholder"
      :disabled="type !== LAST"
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
import { Radio, InputNumber, message, Select } from "ant-design-vue";
import { EVERY, LAST } from "../../../constant/filed";
import Local from "../../../locale";
import { InputNumberConfig } from "../../../utils/types";
import { isNumber } from "../../../utils/validate";
const Message = Local.messages();

export default defineComponent({
  components: { Radio, InputNumber, Select },
  props: {
    nums: {
      type: Array as PropType<{ label: string; value: string }[]>,
      default: null,
    },
    targetTimeUnit: {
      type: String,
      default: null,
    },
    timeUnit: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: LAST,
    },
    tag: {
      type: String,
      default: LAST,
    },
    onChange: {
      type: Function as PropType<(arg: { tag: string; type: string }) => void>,
    },
  },
  setup(props) {
    const type_ = ref(props.type);
    const lastNum = ref(1);
    const cycle = ref(1);
    const tag_ = computed(
      () =>
        (lastNum.value >= 1 && lastNum.value < 7 ? lastNum.value : "") + LAST
    );
    function change() {
      props.onChange && props.onChange({ type: LAST, tag: tag_.value });
    }
    function changeTag(newValue: string) {
      if (props.type !== LAST) {
        return;
      }
      if (newValue === LAST) {
        lastNum.value = 7;
        return;
      }
      const numStr = newValue.substring(0, newValue.length - 1);
      if (
        isNumber(numStr) &&
        parseInt(numStr) >= parseInt(props.nums[0].value) &&
        parseInt(numStr) <= parseInt(props.nums[props.nums.length - 1].value)
      ) {
        lastNum.value = parseInt(numStr);
      } else {
        message.error(Message.common.numError + ":" + numStr);
      }
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
      tag_,
      LAST,
      lastNum,
      change,
      changeTag,
    };
  },
});
</script>
