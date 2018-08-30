/**
 * Created by liekkas on 2017/3/1.
 */
import React from 'react'
import ManyKpiTemplate from '../template/ManyKpiTemplate'
import KPIS from '../../../consts/kpis'

const KPI_GROUP = [
  {
    label: '使用时长类',
    value: [ KPIS.timeInUse,KPIS.timeInUseAvgByUser,KPIS.userIndex]//,KPIS.marketShare]
  }
]
const TITLE = '直播业务使用分析'
const BIZ = 'dvb_three'
const BIZ_SUBTYPE = 'common'

const BusinessUse = () => {
  return (
    <ManyKpiTemplate title={TITLE} kpiGroup={KPI_GROUP} biz={BIZ} bizSubtype={BIZ_SUBTYPE} />
  )
}

export default BusinessUse
