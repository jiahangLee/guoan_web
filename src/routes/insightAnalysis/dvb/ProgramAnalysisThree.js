/**
 * Created by zhangtao on 2017/10/23.
 */
import React from 'react'
import ManyCompareTemplate from '../template/ManyCompareTemplate'
import KPIS from '../../../consts/kpis'
import COLUMNS from '../../../consts/columns'

const KPI_GROUP = [
  {
    label: '用户活跃类',
    value: [ KPIS.activeUser]//,KPIS.marketShare]
  },{
    label: '使用时长类',
    value: [KPIS.timeInUse]//,KPIS.marketShare]
  }
]
const COLUMN_ARRAY = [COLUMNS.area_name, COLUMNS.statistic_time, COLUMNS.channel_label,COLUMNS.program_label]
const TITLE = '节目分析'
const BIZ = 'dvb'
const BIZ_SUBTYPE = 'dvbProgram_three'

const ChannelAnalysis = () => {
  return (
    <ManyCompareTemplate title={TITLE} kpiGroup={KPI_GROUP} biz={BIZ} bizSubtype={BIZ_SUBTYPE} legendField={COLUMNS.program_label.en} columnArr={COLUMN_ARRAY} rowKeyField={COLUMNS.statistic_time.en+COLUMNS.program_label.en}/>
  )
}

export default ChannelAnalysis
