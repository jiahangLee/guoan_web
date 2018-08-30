/**
 * Created by liekkas on 2017/3/2.
 */
import React from 'react'
import CommonTemplate from '../template/CommonTemplate'
import KPIS from '../../../consts/kpis'

const KPI_ARRAY = [KPIS.open_device_user, KPIS.open_device_ratio]
const TITLE = '用户使用'
const BIZ = 'overview_three'
const BIZ_SUBTYPE = 'common'

const UserUse = () => {
  return (
    <CommonTemplate title={TITLE} kpiArr={KPI_ARRAY} biz={BIZ} bizSubtype={BIZ_SUBTYPE} />
  )
}

export default UserUse
