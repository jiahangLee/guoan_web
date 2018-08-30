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
    value: [ KPIS.activeUser, KPIS.activeUserRatio]//,KPIS.marketShare]
  },{
    label: '使用时长类',
    value: [KPIS.timeInUse,KPIS.timeInUseAvgByUser]//,KPIS.marketShare]
  },{
    label: '收视率类',
    value: [KPIS.audienceRatings]
  },{
    label:'业务市占率类',
    value:[KPIS.businessMarketShare]
  }
]
const COLUMN_ARRAY = [COLUMNS.area_name, COLUMNS.statistic_time, COLUMNS.channel_name]
const TITLE = '频道分析'
const BIZ = 'dvb'
const BIZ_SUBTYPE = 'channel_three'

const ChannelAnalysis = () => {
  return (
    <ManyCompareTemplate title={TITLE} kpiGroup={KPI_GROUP} biz={BIZ} bizSubtype={BIZ_SUBTYPE} legendField={COLUMNS.channel_type.en} columnArr={COLUMN_ARRAY} rowKeyField={COLUMNS.statistic_time.en+COLUMNS.channel_type.en}/>
  )
}

export default ChannelAnalysis
