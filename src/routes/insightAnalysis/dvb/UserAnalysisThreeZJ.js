/**
 * Created by liekkas on 2017/3/1.
 */
import React from 'react'
import CommonTemplate from '../template/CommonTemplate'
import KPIS from '../../../consts/kpis'

const KPI_ARRAY = [KPIS.userAccumulated, KPIS.activeUser, KPIS.activeUserRatio]
const TITLE = '直播用户分析'
const BIZ = 'dvb_three'
const BIZ_SUBTYPE = 'common'

const UserAnalysis = () => {
  return (
    <CommonTemplate title={TITLE} kpiArr={KPI_ARRAY} biz={BIZ} bizSubtype={BIZ_SUBTYPE} />
  )
}

export default UserAnalysis
