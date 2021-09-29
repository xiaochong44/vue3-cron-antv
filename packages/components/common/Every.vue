<template>
  <div class="cron-body-row">
    <Radio :checked="type===EVERY" @click="change">
      <span class="symbol">{{ EVERY }}</span>{{ Message.common.every }}{{ timeUnit }}
    </Radio>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Radio } from 'ant-design-vue'
import { EVERY } from '../../constant/filed'
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
      default: EVERY
    },
    tag: {
      type: String,
      default: EVERY
    },
    onChange: {
      type: Function as PropType<(arg:{tag:string,type:string})=>void>
    }
  },
  setup(props){
    function change(){
      props.onChange&&props.onChange({tag: EVERY,type: EVERY})
    }
    return{
      Message,
      change,
      EVERY
    }
  }
})
</script>
