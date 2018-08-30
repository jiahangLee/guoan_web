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
    value: [KPIS.userIndex,KPIS.gravityOnline,KPIS.resourceUtilizationRate]
  },{
    label: '流动类',
    value: [KPIS.userFlowRate]
  }
]
const COLUMN_ARRAY = [COLUMNS.area_name, COLUMNS.statistic_time, COLUMNS.program3_type]
const TITLE = '教育产品包分析'
const BIZ = 'education'
const BIZ_SUBTYPE = 'program'

const ProgramAnalysis = () => {
  return (
    <ManyCompareTemplate title={TITLE} kpiGroup={KPI_GROUP} biz={BIZ} bizSubtype={BIZ_SUBTYPE} legendField={COLUMNS.program3_type.en} columnArr={COLUMN_ARRAY} rowKeyField={COLUMNS.statistic_time.en+COLUMNS.program3_type.en} />
  )
}

export default ProgramAnalysis
