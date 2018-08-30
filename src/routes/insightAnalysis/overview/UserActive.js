/**
 * Created by liekkas on 2017/3/2.
 */
import React from 'react'
import ManyKpiTemplate from '../template/ManyKpiTemplate'
import KPIS from '../../../consts/kpis'

const KPI_GROUP = [
  {
    label: '开机',
    value: [KPIS.open_device_user,KPIS.open_device_ratio,KPIS.open_device_day,KPIS.open_device_day_by_user,KPIS.open_device_day_by_user_online]
  }, {
    label: '开盒',
    value: [KPIS.open_box_user, KPIS.open_box_count,KPIS.open_box_count_avg,KPIS.open_box_count_avg_online,KPIS.open_box_by_user,KPIS.open_box_by_user_online]
  }
]
const TITLE = '用户活跃'
const BIZ = 'overview'
const BIZ_SUBTYPE = 'common'

const UserActive = () => {
  return (
    <ManyKpiTemplate title={TITLE} kpiGroup={KPI_GROUP} biz={BIZ} bizSubtype={BIZ_SUBTYPE} />
  )
}


export default UserActive
