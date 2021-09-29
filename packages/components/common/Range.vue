<template>
  <div class="cron-body-row">
    <Radio :checked="type===RANGE" @change="change">
      <span class="symbol">{{ tag_ }}</span>
      {{ Message.common.between }}
      <InputNumber 
        size="small" 
        v-model:value="lower" 
        :min="lowerConfig.min" 
        :step="lowerConfig.step" 
        :max="upper_"
        :disabled="type!==RANGE"
        @change="change"
      />
      {{ timeUnit }}{{ Message.common.and }}
      <InputNumber 
        size="small" 
        v-model:value="upper_" 
        :min="lower" 
        :step="upperConfig.step" 
        :max="upperConfig.max"
        :disabled="type!==RANGE"
        @change="change"
      />
      {{ Message.common.end }}{{ Message.common.every }}{{ timeUnit }}
    </Radio>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed,PropType,watch,onMounted } from 'vue'
import { Radio,InputNumber } from 'ant-design-vue'
import { RANGE } from '../../constant/filed'
import Local from '../../locale'
import { InputNumberConfig } from '../../utils/types'
import { isNumber } from '../../utils/validate'
const Message = Local.messages()

export default defineComponent({
  components:{ Radio,InputNumber },
  props: {
    upper: {
      type: Number,
      default: 1
    },
    lowerConfig: {
      type: Object as PropType<InputNumberConfig>,
      default: null
    },
    upperConfig: {
      type: Object as PropType<InputNumberConfig>,
      default: null
    },
    timeUnit: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: RANGE
    },
    tag: {
      type: String,
      default: RANGE
    },
    onChange: {
      type: Function as PropType<(arg:{tag:string,type:string})=>void>
    }
  },
  setup(props){
    const type_ = ref(props.type)
    const upper_ = ref(1)
    const lower = ref(0)
    if(lower.value<props.lowerConfig.min){
      lower.value=props.lowerConfig.min
    }
    if(upper_.value<props.upperConfig.min){
      upper_.value=props.upperConfig.min
    }
    const cycle = ref(1)
    const tag_ = computed(()=>{
      return `${lower.value}${RANGE}${upper_.value}`
    })
    function change() {
      props.onChange&&props.onChange({ type:RANGE,tag: tag_.value })
    }
    function changeTag(newValue) {
      if (props.type !== RANGE) {
        return;
      }
      const arr: any = newValue.split(RANGE);
      if (arr.length !== 2) {
        //this.$message.error(this.$t('common.tagError') + ':' + newValue)
        return;
      }
      if (arr[0] === RANGE) {
        arr[0] = 0;
      }
      if (
        !isNumber(arr[0]) ||
        parseInt(arr[0]) < props.lowerConfig.min ||
        parseInt(arr[0]) > props.lowerConfig.max
      ) {
        //this.$message.error(this.$t('period.startError') + ':' + arr[0])
        return;
      }
      if (
        !isNumber(arr[1]) ||
        parseInt(arr[1]) < props.upperConfig.min ||
        parseInt(arr[1]) > props.upperConfig.max
      ) {
        //this.$message.error(this.$t('period.cycleError') + ':' + arr[1])
        return;
      }
      lower.value = parseInt(arr[0]);
      upper_.value = parseInt(arr[1]);
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
    return{
      Message,
      type_,
      lower,
      cycle,
      tag_,
      upper_,
      RANGE,
      change
    }
  }
})
</script>
