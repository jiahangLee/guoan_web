/**
 * Created by liekkas on 2017/3/2.
 */
import React from 'react'
import CommonTemplate from '../template/CommonTemplate'
import KPIS from '../../../consts/kpis'

const KPI_ARRAY = [KPIS.timeInUse, KPIS.timeInUseAvg, KPIS.timeInUseAvgOnline, KPIS.timeInUseAvgByUser, KPIS.timeInUseAvgByUserOnline]
const TITLE = '用户使用'
const BIZ = 'overview'
const BIZ_SUBTYPE = 'common'

const UserUse = () => {
  return (
    <CommonTemplate title={TITLE} kpiArr={KPI_ARRAY} biz={BIZ} bizSubtype={BIZ_SUBTYPE} />
  )
}

export default UserUse
