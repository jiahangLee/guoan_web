/**
 * Created by wanggy on 2017/11/6
 */
import React from 'react'
import CommonTemplate from '../template/CommonTemplate'
import KPIS from '../../../consts/kpis'

const KPI_ARRAY = [KPIS.businessUser, KPIS.businessUserRatio, KPIS.activeUser, KPIS.activeUserRatio,
  KPIS.newUser, KPIS.newUserGrowthRate, KPIS.visitUser, KPIS.visitRate, KPIS.accumulatedVisitUser, KPIS.newVisitUser]
const TITLE = '用户分析'
const BIZ = 'game_room'
const BIZ_SUBTYPE = 'common'

const UserAnalysis = () => {
  return (
    <CommonTemplate title={TITLE} kpiArr={KPI_ARRAY} biz={BIZ} bizSubtype={BIZ_SUBTYPE}/>
  )
}

export default UserAnalysis
