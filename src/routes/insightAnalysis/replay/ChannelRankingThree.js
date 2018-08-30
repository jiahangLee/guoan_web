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
    value: [KPIS.userAccumulated, KPIS.activeUser]//,KPIS.marketShare]
  },{
    label: '使用时长类',
    value: [KPIS.timeInUse, KPIS.timeInUseAvgByUser]//,KPIS.marketShare]
  }, {
    label: '使用次数类',
    value: [KPIS.useCount,KPIS.userUseCountAvg]
  }
]
const COLUMN_ARRAY = [COLUMNS.area_name,COLUMNS.channel_name,COLUMNS.row_num]
const TITLE = '频道排名 - 图表'
const BIZ = 'replay'
const BIZ_SUBTYPE = 'threeRank'

const ChannelRanking = () => {
  return (
    <ManyKpiTemplate title={TITLE} kpiGroup={KPI_GROUP} biz={BIZ} bizSubtype={BIZ_SUBTYPE} legendField={COLUMNS.statistic_time.en} columnArr={COLUMN_ARRAY} rowKeyField={COLUMNS.statistic_time.en+COLUMNS.channel_type.en} labelField={COLUMNS.channel_type.en} />
  )
}

export default ChannelRanking
