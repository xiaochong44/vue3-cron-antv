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
    :nums="nums"
    :start-config="startConfig"
    :cycle-config="cycleConfig"
    @change="change"
  />
  <Range 
    :time-unit="Message.dayOfMonth.title"
    :type="type_"
    :tag="tag_"
    :nums="nums"
    :lower-config="lowerConfig"
    :upper-config="upperConfig"
    @change="change"
  />
  <Fixed 
    :time-unit="Message.dayOfWeek.title"
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
    :time-unit="Message.dayOfWeek.title"
    :target-time-unit="Message.month.title"
    :type="type_"
    :tag="tag_"
    :nums="nums"
    :last-config="startDateConfig"
    @change="change"
  />
  <WeekDay 
    :time-unit="Message.dayOfWeek.title"
    :target-time-unit="Message.month.title"
    :type="type_"
    :tag="tag_"
    :nums="nums"
    @change="change"
  />
</template>
<script lang="ts">
import { defineComponent,PropType,ref } from 'vue'
import Every from '../common/Every.vue'
import Period from './weekday/Period.vue'
import Range from './weekday/Range.vue'
import Local from '../../locale'
import Fixed from '../common/Fixed.vue'
import UnFixed from '../common/UnFixed.vue'
import Last from './weekday/Last.vue'
import WeekDay from './weekday/WeekDay.vue'
import { EVERY, UNFIXED } from '../../constant/filed'
import { InputNumberConfig } from '../../utils/types'
import watchTime from '../../mixins/watchTime'

const Message = Local.messages()
const LENGTH = 7, LOWER_LIMIT = 1, STEP = 1

export default defineComponent({
  components:{ Every,Period,Range,Fixed,UnFixed,Last,WeekDay },
  mixins:[watchTime],
  props:{
    tag: {
      type: String,
      default: UNFIXED
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
    const startDateConfig: InputNumberConfig ={
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
    const nums = Message.daysOfWeekOptions;
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
      startDateConfig,
      nums,
      type_,
      tag_,
      change
    }
  }
})
</script>