/**
 * Created by liekkas on 2017/3/1.
 */
import React from 'react'
import CommonTemplate from '../template/CommonTemplate'
import KPIS from '../../../consts/kpis'

const KPI_ARRAY = [KPIS.userAccumulated, KPIS.activeUser, KPIS.activeUserRatio, KPIS.useCount, KPIS.newUser, KPIS.newUserGrowthRate]
const TITLE = '智慧社区用户分析'
const BIZ = 'in_community'
const BIZ_SUBTYPE = 'common'

const UserAnalysis = () => {
  return (
    <CommonTemplate title={TITLE} kpiArr={KPI_ARRAY} biz={BIZ} bizSubtype={BIZ_SUBTYPE}/>
  )
}

export default UserAnalysis
