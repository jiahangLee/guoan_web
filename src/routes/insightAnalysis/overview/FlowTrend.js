/**
 * Created by liekkas on 2017/3/2.
 */
import React from 'react'
import FlowChartTemplate from '../template/FlowChartTemplate'
import KPIS from '../../../consts/kpis'

const KPI_ARRAY = [KPIS.activeUser, KPIS.activeUserRatio, KPIS.useCount, KPIS.timeInUse]
const TITLE = '流量走势'
const BIZ = 'overview'
const BIZ_SUBTYPE = 'page'

const UserUse = () => {
  return (
    <FlowChartTemplate title={TITLE} kpiArr={KPI_ARRAY} biz={BIZ} bizSubtype={BIZ_SUBTYPE} />
  )
}

export default UserUse
