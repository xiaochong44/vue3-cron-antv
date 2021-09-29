<template>
  <div class="cron-body-row">
    <Radio :checked="type===LAST_WORK_DAY" @click="change">
      <span class="symbol">{{ LAST_WORK_DAY }}</span>
      {{ Message.common.current }}{{ targetTimeUnit }}{{Message.custom.latestWorkday}}
    </Radio>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Radio } from 'ant-design-vue'
import { LAST_WORK_DAY } from '../../constant/filed'
import Local from '../../locale'
const Message = Local.messages()

export default defineComponent({
  components:{ Radio },
  props: {
    targetTimeUnit: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: LAST_WORK_DAY
    },
    tag: {
      type: String,
      default: LAST_WORK_DAY
    },
    onChange: {
      type: Function as PropType<(arg:{tag:string,type:string})=>void>
    }
  },
  setup(props){
    function change(){
      props.onChange&&props.onChange({tag: LAST_WORK_DAY,type: LAST_WORK_DAY})
    }
    return{
      Message,
      change,
      LAST_WORK_DAY
    }
  }
})
</script>
