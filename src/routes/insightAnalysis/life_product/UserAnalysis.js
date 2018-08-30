/**
 * Created by liekkas on 2017/3/1.
 */
import React from 'react'
import CommonTemplate from '../template/CommonTemplate'
import KPIS from '../../../consts/kpis'

const KPI_ARRAY = [ KPIS.activeUser, KPIS.activeUserRatio,KPIS.businessUser, KPIS.newUser, KPIS.useCount, KPIS.timeInUse, KPIS.newUserGrowthRate]
const TITLE = '百灵K歌用户分析'
const BIZ = 'life_product'
const BIZ_SUBTYPE = 'common'

const UserAnalysis = () => {
  return (
    <CommonTemplate title={TITLE} kpiArr={KPI_ARRAY} biz={BIZ} bizSubtype={BIZ_SUBTYPE}/>
  )
}

export default UserAnalysis
