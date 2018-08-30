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
    value: [KPIS.activeUser, KPIS.activeUserRatio]//,KPIS.marketShare]
    // value: [KPIS.userAccumulated, KPIS.activeUser, KPIS.activeUserRatio, KPIS.businessUser,KPIS.businessUserRatio]//,KPIS.marketShare]
  },{
    label: '使用时长类',
    value: [KPIS.timeInUse, KPIS.timeInUseAvg,KPIS.timeInUseAvgOnline,KPIS.timeInUseAvgByUser,KPIS.timeInUseAvgByUserOnline,KPIS.timeInUsePerTimeAvg,KPIS.marketShare,KPIS.businessMarketShare]//,KPIS.marketShare]
  }, {
    label: '使用次数类',
    value: [KPIS.useCount, KPIS.useCountAvg,KPIS.useCountAvgOnline,KPIS.userUseCountAvg,KPIS.userUseCountAvgOnline]
  }, {
    label: '使用天数类',
    value: [KPIS.useDay, KPIS.userUseDay,KPIS.userUseDayOnline]
  },{
    label: '收视率类',
    // value: [KPIS.userIndex,KPIS.userOverlapDegree,KPIS.canRunTime,KPIS.gravityOnline,KPIS.resourceUtilizationRate,KPIS.marketShare,KPIS.businessMarketShare]//,KPIS.marketShare]
    value: [KPIS.userIndex]
  }
]
const COLUMN_ARRAY = [COLUMNS.area_name, COLUMNS.program_type]
const TITLE = 'VOD点播节目排行'
const BIZ = 'vod'
const BIZ_SUBTYPE = 'programRank'
const EXTRAS='programRank'

const ProgramAnalysis = () => {
  return (
    <ManyKpiTemplate title={TITLE} kpiGroup={KPI_GROUP} biz={BIZ} bizSubtype={BIZ_SUBTYPE} legendField={COLUMNS.statistic_time.en} columnArr={COLUMN_ARRAY} rowKeyField={COLUMNS.statistic_time.en+COLUMNS.program_type.en} labelField={COLUMNS.program_type.en} />
  )
}

export default ProgramAnalysis
