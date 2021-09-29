<template>
  <div class="cron-body-row">
    <Radio :checked="type===EMPTY" @click="change">
      <span class="symbol">{{ Message.custom.empty }}</span>
    </Radio>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Radio } from 'ant-design-vue'
import { EMPTY } from '../../constant/filed'
import Local from '../../locale'
const Message = Local.messages()

export default defineComponent({
  components:{ Radio },
  props: {
    timeUnit: {
      type: String,
      default: null
    },
    symbol: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: EMPTY
    },
    tag: {
      type: String,
      default: EMPTY
    },
    onChange: {
      type: Function as PropType<(arg:{tag:string,type:string})=>void>
    }
  },
  setup(props){
    function change(){
      props.onChange&&props.onChange({tag: EMPTY,type: EMPTY})
    }
    return{
      Message,
      change,
      EMPTY
    }
  }
})
</script>
