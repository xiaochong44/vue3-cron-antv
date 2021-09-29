<template>
  <Popover placement="bottom" trigger="click">
    <Input readonly :value="value"/>
    <template #content>
      <Card
        size="small"
        :tab-list="tabList"
        :active-tab-key="activeTabKey"
        @tab-change="(key)=>activeTabKey=key"
      >
        <div v-if="activeTabKey==='seconds'">
          <Seconds :tag="tag.second" @change="(val)=>timeChange('second',val.tag)"/>
        </div>
        <div v-else-if="activeTabKey==='minutes'">
          <Minutes :tag="tag.minute" @change="(val)=>timeChange('minute',val.tag)"/>
        </div>
        <div v-else-if="activeTabKey==='hours'">
          <Hours :tag="tag.hour" @change="(val)=>timeChange('hour',val.tag)"/>
        </div>
        <div v-else-if="activeTabKey==='days'">
          <Days :tag="tag.dayOfMonth" @change="(val)=>timeChange('dayOfMonth',val.tag)"/>
        </div>
        <div v-else-if="activeTabKey==='months'">
          <Months :tag="tag.month" @change="(val)=>timeChange('month',val.tag)"/>
        </div>
        <div v-else-if="activeTabKey==='weekdays'">
          <WeekDays :tag="tag.dayOfWeek" @change="(val)=>timeChange('dayOfWeek',val.tag)"/>
        </div>
        <div v-else-if="activeTabKey==='years'">
          <Years :tag="tag.year" @change="(val)=>timeChange('year',val.tag)"/>
        </div>
      </Card>
    </template>
  </Popover>
</template>
<script lang="ts">
import { defineComponent,ref,reactive,watch,onMounted } from 'vue'
import { Input,Popover,Card, message } from 'ant-design-vue'
import Seconds from '../time/Seconds.vue'
import Minutes from '../time/Minutes.vue'
import Hours from '../time/Hours.vue'
import Days from '../time/Days.vue'
import Months from '../time/Months.vue'
import Years from '../time/Years.vue'
import WeekDays from '../time/WeekDays.vue'
import { DEFAULT_CRON_EXPRESSION, EMPTY, EVERY, UNFIXED } from '../../constant/filed'
import { CronType } from '../../utils/types'
import Local from '../../locale'
const Message = Local.messages()

export default defineComponent({
  name:'VueCron',
  components:{ Input,Popover,Card,Seconds,Minutes,Hours,Days,Months,Years, WeekDays},
  props:{
    value:{
      type: String,
      default: DEFAULT_CRON_EXPRESSION
    }
  },
  setup(props,{emit}) {
    const tabList=[
      {
        key:'seconds',
        tab:Message.second.title
      },
      {
        key:'minutes',
        tab:Message.minute.title
      },
      {
        key:'hours',
        tab:Message.hour.title
      },
      {
        key:'days',
        tab:Message.dayOfMonth.title
      },
      {
        key:'months',
        tab:Message.month.title
      },
      {
        key:'weekdays',
        tab:Message.dayOfWeek.title
      },
      {
        key:'years',
        tab:Message.year.title
      }
    ]
    const tag = reactive<CronType>({
      second:EVERY,
      minute:EVERY,
      hour:EVERY,
      dayOfMonth:EVERY,
      month:EVERY,
      dayOfWeek: UNFIXED,
      year: EMPTY
    })
    const activeTabKey = ref('seconds')
    function changeTime(newValue:string) {
      if (!newValue || newValue.trim().length < 11) {
        message.error(Message.common.tagError)
        return
      }
      const arr = newValue.trim().split(' ')
      if (arr.length !== 6 && arr.length !== 7) {
        message.error(Message.common.tagError)
        return
      }
      tag.second = arr[0]
      tag.minute = arr[1]
      tag.hour = arr[2]
      tag.dayOfMonth = arr[3]
      tag.month = arr[4]
      tag.dayOfWeek = arr[5]
      tag.year = arr.length === 7 ? arr[6] : ''
    }
    watch(()=>props.value,(val)=>changeTime(val))
    onMounted(()=>{
      changeTime(props.value)
    })
    function timeChange(type:string,val:string ) {
      const newTag:any={...tag}
      newTag[type]=val
      if(type==='dayOfWeek'&&val!=='*'&&val!=='?'){
        newTag.dayOfMonth='?'
      }else if(type==='dayOfMonth'&&val!=='*'&&val!=='?'){
        newTag.dayOfWeek='?'
      }
      let arr:string[]=[]
      arr.push(newTag.second)
      arr.push(newTag.minute)
      arr.push(newTag.hour)
      arr.push(newTag.dayOfMonth)
      arr.push(newTag.month)
      arr.push(newTag.dayOfWeek)
      arr.push(newTag.year)
      emit('update:value',arr.join(' ').trim())
      emit('change',arr.join(' ').trim())
    }
    return{
      tabList,
      activeTabKey,
      tag,
      changeTime,
      timeChange
    }
  },
})
</script>
<style lang="less">
.cron-body-row {
  margin-bottom: 8px;
  .symbol {
    color: #67c23a;
    margin-right: 6px;
  }
}
</style>
