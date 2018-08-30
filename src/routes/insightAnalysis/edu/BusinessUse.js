/**
 * Created by liekkas on 2017/3/1.
 */
import React from 'react'
import ManyKpiTemplate from '../template/ManyKpiTemplate'
import KPIS from '../../../consts/kpis'

const KPI_GROUP = [
  {
    label: '使用时长类',
    value: [KPIS.timeInUse, KPIS.timeInUseAvg,KPIS.timeInUseAvgOnline,KPIS.timeInUseAvgByUser,KPIS.timeInUseAvgByUserOnline,KPIS.timeInUsePerTimeAvg,KPIS.marketShare,KPIS.userIndex]//,KPIS.marketShare]
  }, {
    label: '使用次数类',
    value: [KPIS.useCount, KPIS.useCountAvg,KPIS.useCountAvgOnline,KPIS.userUseCountAvg,KPIS.userUseCountAvgOnline]
  }, {
    label: '使用天数类',
    value: [KPIS.useDay, KPIS.userUseDay,KPIS.userUseDayOnline]
  }
]
const TITLE = '教育业务使用分析'
const BIZ = 'education'
const BIZ_SUBTYPE = 'common'

const BusinessUse = () => {
  return (
    <ManyKpiTemplate title={TITLE} kpiGroup={KPI_GROUP} biz={BIZ} bizSubtype={BIZ_SUBTYPE} />
  )
}

export default BusinessUse
