/**
 * Created by liekkas on 2017/3/2.
 */
import React from 'react'
import CommonTemplate from '../template/CommonTemplate'
import KPIS from '../../../consts/kpis'

// const KPI_ARRAY = [KPIS.newUser]
const KPI_ARRAY = [KPIS.newUser,KPIS.lossUser]
const TITLE = '用户发展'
const BIZ = 'overview'
const BIZ_SUBTYPE = 'common'

const UserDevelop = () => {
  return (
    <CommonTemplate title={TITLE} kpiArr={KPI_ARRAY} biz={BIZ} bizSubtype={BIZ_SUBTYPE} />
  )
}

export default UserDevelop
