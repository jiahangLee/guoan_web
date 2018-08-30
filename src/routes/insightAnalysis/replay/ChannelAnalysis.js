/**
 * Created by 王晓普 on 2017/7/17.
 */
import React from 'react'
import ManyCompareTemplate from '../template/ManyCompareTemplate'
import KPIS from '../../../consts/kpis'
import COLUMNS from '../../../consts/columns'

const KPI_GROUP = [
  {
    label: '用户活跃类',
    value: [KPIS.userIndex, KPIS.userAccumulated,KPIS.activeUser, KPIS.activeUserRatio,KPIS.businessUser,KPIS.businessUserRatio]//,KPIS.marketShare]
  },{
    label: '使用时长类',
    value: [KPIS.timeInUse, KPIS.timeInUseAvg,KPIS.timeInUseAvgOnline,KPIS.timeInUseAvgByUser,KPIS.timeInUseAvgByUserOnline,KPIS.marketShare,KPIS.businessMarketShare]//,KPIS.marketShare]
  }, {
    label: '使用天数类',
    value: [KPIS.useDay, KPIS.userUseDay,KPIS.userUseDayOnline]
  },{
    label: '使用次数类',
    value: [KPIS.useCount, KPIS.useCountAvg,KPIS.useCountAvgOnline,KPIS.userUseCountAvg,KPIS.userUseCountAvgOnline,KPIS.timeInUsePerTimeAvg]
  },{
    label:'收视率类',
    value:[KPIS.gravityOnline,KPIS.resourceUtilizationRate]
  }
]
const COLUMN_ARRAY = [COLUMNS.area_name, COLUMNS.statistic_time, COLUMNS.channel_name]
const TITLE = '频道分析'
const BIZ = 'replay'
const BIZ_SUBTYPE = 'channel'

const ChannelAnalysis = () => {
  return (
    <ManyCompareTemplate title={TITLE} kpiGroup={KPI_GROUP} biz={BIZ} bizSubtype={BIZ_SUBTYPE} legendField={COLUMNS.channel_type.en} columnArr={COLUMN_ARRAY} rowKeyField={COLUMNS.statistic_time.en+COLUMNS.channel_type.en}/>
  )
}

export default ChannelAnalysis
