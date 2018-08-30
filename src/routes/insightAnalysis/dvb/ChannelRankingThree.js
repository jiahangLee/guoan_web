/**
 * Created by 王晓普 on 2017/7/17.
 */
import React from 'react'
import ManyKpiTemplate from '../template/ManyKpiTemplate'
import KPIS from '../../../consts/kpis'
import COLUMNS from '../../../consts/columns'

const KPI_GROUP = [
  {
    label: '用户活跃类',
    value: [ KPIS.activeUser, KPIS.activeUserRatio]//,KPIS.marketShare]
  },{
    label: '使用时长类',
    value: [KPIS.timeInUse, KPIS.timeInUseAvg,KPIS.timeInUseAvgByUser]//,KPIS.marketShare]
  },{
    label: '收视率类',
    value: [KPIS.audienceRatings]
  },{
    label:'业务市占率类',
    value:[KPIS.businessMarketShare]
  }
]
const COLUMN_ARRAY = [COLUMNS.area_name,COLUMNS.channel_name,COLUMNS.row_num]
const TITLE = '频道排名 - 图表'
const BIZ = 'dvb'
const BIZ_SUBTYPE = 'threeRank'

const ChannelRanking = () => {
  return (
    <ManyKpiTemplate title={TITLE} kpiGroup={KPI_GROUP} biz={BIZ} bizSubtype={BIZ_SUBTYPE} legendField={COLUMNS.statistic_time.en} columnArr={COLUMN_ARRAY} rowKeyField={COLUMNS.statistic_time.en+COLUMNS.channel_type.en} labelField={COLUMNS.channel_type.en} />
  )
}

export default ChannelRanking
