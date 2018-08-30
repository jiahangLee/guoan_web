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
    value: [KPIS.activeUser]//,KPIS.marketShare]
    // value: [KPIS.userAccumulated, KPIS.activeUser, KPIS.activeUserRatio, KPIS.businessUser,KPIS.businessUserRatio]//,KPIS.marketShare]
  },{
    label: '使用时长类',
    value: [KPIS.timeInUse,KPIS.timeInUseAvgByUser]//,KPIS.marketShare]
  }, {
    label: '使用次数类',
    value: [KPIS.useCount,KPIS.userUseCountAvg]
  }
]
const COLUMN_ARRAY = [COLUMNS.area_name, COLUMNS.program_subtype_name]
const TITLE = 'VOD点播节目排行'
const BIZ = 'vod'
const BIZ_SUBTYPE = 'threeRank'
const EXTRAS='programRank'

const ProgramAnalysis = () => {
  return (
    <ManyKpiTemplate title={TITLE} kpiGroup={KPI_GROUP} biz={BIZ} bizSubtype={BIZ_SUBTYPE} legendField={COLUMNS.statistic_time.en} columnArr={COLUMN_ARRAY} rowKeyField={COLUMNS.statistic_time.en+COLUMNS.program_subtype_name.en} labelField={COLUMNS.program_subtype_name.en} />
  )
}

export default ProgramAnalysis
