<template>
  <Every 
    :time-unit="Message.year.title"
    :type="type_"
    @change="change"
  />
  <Period
    :time-unit="Message.year.title"
    :type="type_"
    :tag="tag_"
    :start-config="startConfig"
    :cycle-config="cycleConfig"
    @change="change"
  />
  <Range 
    :time-unit="Message.year.title"
    :type="type_"
    :tag="tag_"
    :lower-config="lowerConfig"
    :upper-config="upperConfig"
    @change="change"
  />
  <Fixed 
    :time-unit="Message.year.title"
    :type="type_"
    :tag="tag_"
    :nums="nums"
    @change="change"
  />
  <Empty 
    :type="type_"
    :tag="tag_"
    @change="change"
  />
</template>
<script lang="ts">
import { defineComponent,PropType,ref } from 'vue'
import Every from '../common/Every.vue'
import Period from '../common/Period.vue'
import Range from '../common/Range.vue'
import Local from '../../locale'
import Fixed from '../common/Fixed.vue'
import Empty from '../common/Empty.vue'
import { CUR_YEAR, EMPTY, UPPER_LIMIT_YEAR } from '../../constant/filed'
import { InputNumberConfig } from '../../utils/types'
import watchTime from '../../mixins/watchTime'

const Message = Local.messages()
const LOWER_LIMIT = CUR_YEAR, LENGTH = UPPER_LIMIT_YEAR, STEP = 1

export default defineComponent({
  components:{ Every,Period,Range,Fixed,Empty },
  mixins:[watchTime],
  props:{
    tag: {
      type: String,
      default: EMPTY
    },
    onChange: {
      type: Function as PropType<(arg:{tag:string,type:string})=>void>
    }
  },
  setup(props){
    const startConfig: InputNumberConfig ={
      min: LOWER_LIMIT,
      step: STEP,
      max: LENGTH 
    }
    const cycleConfig: InputNumberConfig ={
      min: STEP,
      step: STEP,
      max: LENGTH 
    }
    const lowerConfig: InputNumberConfig ={
      min: LOWER_LIMIT,
      step: STEP,
      max: LENGTH 
    }
    const upperConfig: InputNumberConfig ={
      min: LOWER_LIMIT,
      step: STEP,
      max: LENGTH 
    }
    const nums = []
    for (let i = LOWER_LIMIT; i < LENGTH+1; i++) {
      const item = {
        label: i.toString(),
        value: i
      }
      nums.push(item)
    }
    const type_ = ref(EMPTY)
    const tag_ = ref(props.tag)
    function change(val){
      type_.value=val.type
      tag_.value=val.tag
      props.onChange&&props.onChange({type:type_.value,tag:tag_.value})
    }
    return{
      Message,
      startConfig,
      cycleConfig,
      lowerConfig,
      upperConfig,
      nums,
      type_,
      tag_,
      change
    }
  }
})
</script>