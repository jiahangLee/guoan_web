/**
 * Created by liekkas on 2017/3/2.
 */
import React from 'react'
import ManyKpiPieChartTemplate from '../template/ManyKpiPieChartTemplate'
import KPIS from '../../../consts/kpis'

const KPI_GROUP = [
  {
    label: '时长',
    value: [KPIS.userCount,KPIS.userLevel,KPIS.userRate],
    period:['1','5','15','30','60','day','week','halfmonth','month','quarter','year']
  }, {
    label: '次数',
    value: [KPIS.userCount,KPIS.userLevel,KPIS.userRate],
    period:['1','5','15','30','60','day','week','halfmonth','month','quarter','year']
  }, {
    label: '天数',
    value: [KPIS.userCount,KPIS.userLevel,KPIS.userRate],
    period:['1','5','15','30','60','week','halfmonth','month','quarter','year']
  }
]
const TITLE = '用户占比'
const BIZ = 'education'
const BIZ_SUBTYPE = 'area_pie'

const UserActive = () => {
  return (
    <ManyKpiPieChartTemplate title={TITLE} kpiGroup={KPI_GROUP} biz={BIZ} bizSubtype={BIZ_SUBTYPE} />
  )
}


export default UserActive
