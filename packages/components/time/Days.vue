<template>
  <Every 
    :time-unit="Message.dayOfMonth.title"
    :type="type_"
    @change="change"
  />
  <Period
    :time-unit="Message.dayOfMonth.title"
    :type="type_"
    :tag="tag_"
    :start-config="startConfig"
    :cycle-config="cycleConfig"
    @change="change"
  />
  <Range 
    :time-unit="Message.dayOfMonth.title"
    :type="type_"
    :tag="tag_"
    :lower-config="lowerConfig"
    :upper-config="upperConfig"
    @change="change"
  />
  <Fixed 
    :time-unit="Message.dayOfMonth.title"
    :type="type_"
    :tag="tag_"
    :nums="nums"
    @change="change"
  />
  <UnFixed
    :type="type_"
    :nums="nums"
    @change="change"
  />
  <Last 
    :time-unit="Message.dayOfMonth.title"
    :type="type_"
    :tag="tag_"
    :target-time-unit="Message.month.title"
    :last-config="lastConfig"
    @change="change"
  />
  <WorkDay 
    :time-unit="Message.dayOfMonth.title"
    :type="type_"
    :tag="tag_"
    :target-time-unit="Message.month.title"
    :start-date-config="startConfig"
    @change="change"
  />
  <LastWorkDay 
    :type="type_"
    :tag="tag_"
    :target-time-unit="Message.month.title"
    :start-date-config="startConfig"
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
import UnFixed from '../common/UnFixed.vue'
import Last from '../common/Last.vue'
import WorkDay from '../common/WorkDay.vue'
import LastWorkDay from '../common/LastWorkDay.vue'
import { EVERY, BASE_SYMBOL } from '../../constant/filed'
import { InputNumberConfig } from '../../utils/types'
import watchTime from '../../mixins/watchTime'

const Message = Local.messages()
const LENGTH = 31, LOWER_LIMIT = 1, STEP = 1

export default defineComponent({
  components:{ Every,Period,Range,Fixed,UnFixed,Last,WorkDay,LastWorkDay },
  mixins:[watchTime],
  props:{
    tag: {
      type: String,
      default: EVERY
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
    const lastConfig: InputNumberConfig ={
      min: LOWER_LIMIT,
      step: STEP,
      max: LENGTH 
    }
    const nums = []
    for (let i = 1; i < LENGTH+1; i++) {
      const item = {
        label: i.toString(),
        value: i
      }
      nums.push(item)
    }
    const type_ = ref(EVERY)
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
      lastConfig,
      nums,
      type_,
      tag_,
      change
    }
  }
})
</script>