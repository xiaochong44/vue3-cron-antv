<template>
  <div class="cron-body-row">
    <Radio :checked="type===UNFIXED" @click="change">
      <span class="symbol">{{ UNFIXED }}</span>{{ Message.custom.unspecified }}
    </Radio>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Radio } from 'ant-design-vue'
import { UNFIXED } from '../../constant/filed'
import Local from '../../locale'
const Message = Local.messages()

export default defineComponent({
  components:{ Radio },
  props: {
    type: {
      type: String,
      default: UNFIXED
    },
    tag: {
      type: String,
      default: UNFIXED
    },
    onChange: {
      type: Function as PropType<(arg:{tag:string,type:string})=>void>
    }
  },
  setup(props){
    function change(){
      props.onChange&&props.onChange({tag: UNFIXED,type: UNFIXED})
    }

    return{
      Message,
      change,
      UNFIXED
    }
  }
})
</script>
