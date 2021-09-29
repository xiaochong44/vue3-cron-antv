<template>
  <div class="cron-body-row">
    <Radio :checked="type === FIXED" @change="change">
      <Tooltip :title="tag_">
        <span class="symbol">,</span>
      </Tooltip>
      {{ Message.common.specified }}
    </Radio>
    <Select
      size="small"
      mode="tags"
      :placeholder="Message.common.placeholder"
      style="width: 300px"
      :options="nums"
      :disabled="type !== FIXED"
      v-model:value="numArray"
      @change="change"
    >
    </Select>
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
import { Radio, InputNumber, Tooltip, Select } from "ant-design-vue";
import { FIXED } from "../../constant/filed";
import Local from "../../locale";
import { isNumber } from "../../utils/validate";
const Message = Local.messages();
const Option = Select.Option;

export default defineComponent({
  components: { Radio, InputNumber, Tooltip, Select, Option },
  props: {
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
      default: FIXED,
    },
    tag: {
      type: String,
      default: FIXED,
    },
    onChange: {
      type: Function as PropType<(arg: { tag: string; type: string }) => void>,
    },
  },
  setup(props) {
    const type_ = ref(props.type);
    const tag_ = computed(() => {
      let tag = "";
      if (numArray && numArray.value.length) {
        numArray.value.sort();
        for (let i = 0; i < numArray.value.length; i++) {
          tag += numArray.value[i] + FIXED;
        }
        tag = tag.substring(0, tag.length - 1);
      }
      return tag;
    });
    const numArray = ref<number[]>([]);
    const open = ref(true);
    function change() {
      props.onChange && props.onChange({ type: FIXED, tag: tag_.value||FIXED });
    }
    function changeTag(val) {
      if (props.type === FIXED) {
        const arrts = props.tag.split(",");
        numArray.value = [];
        arrts.forEach(x=>{
          if(isNumber(x)&&parseInt(x)>=parseInt(props.nums[0].value)&&parseInt(x)<=parseInt(props.nums[props.nums.length-1].value)){
            numArray.value.push(parseInt(x));
          }
        })        
      }
    }
    onMounted(() => {
      changeTag(props.tag);
    });
    watch(
      () => props.tag,
      (val) => changeTag(val),
      { deep: true }
    );
    watch(
      () => props.type,
      () => changeTag(props.tag),
      { deep: true }
    );
    return {
      Message,
      type_,
      tag_,
      open,
      FIXED,
      change,
      numArray,
      changeTag,
    };
  },
});
</script>
