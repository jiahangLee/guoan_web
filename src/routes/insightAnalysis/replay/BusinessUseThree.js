/**
 * Created by liekkas on 2017/3/1.
 */
import React from 'react'
import ManyKpiTemplate from '../template/ManyKpiTemplate'
import KPIS from '../../../consts/kpis'

const KPI_GROUP = [
  {
    label: '使用时长类',
    value: [KPIS.timeInUse,KPIS.timeInUseAvgByUser,KPIS.timeInUsePerTimeAvg]
  }, {
    label: '使用次数类',
    value: [KPIS.useCount,KPIS.userUseCountAvg,KPIS.userIndex]
  }
]
const TITLE = '回看业务使用分析'
const BIZ = 'replay_three'
const BIZ_SUBTYPE = 'common'

const BusinessUse = () => {
  return (
    <ManyKpiTemplate title={TITLE} kpiGroup={KPI_GROUP} biz={BIZ} bizSubtype={BIZ_SUBTYPE} />
  )
}

export default BusinessUse
