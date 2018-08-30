/**
 * Created by zhangtao on 2017/10/15.
 */
import React from 'react'
import SingleCompareTemplate from '../template/SingleCompareTemplate'
import KPIS from '../../../consts/kpis'
import COLUMNS from '../../../consts/columns'


const KPI_GROUP = [
  // {
  //   label: '用户活跃类',
  //   value: [KPIS.newAccessUser]
  // },
  {
    label: '用户留存类',
    value: [KPIS.retention_user_next,KPIS.retention_user_3, KPIS.retention_user_5, KPIS.retention_user_7,KPIS.retention_user_15, KPIS.retention_user_month]
  }, {
    label: '留存率',
    value: [KPIS.retention_user_next_rate, KPIS.retention_user_3_rate, KPIS.retention_user_5_rate, KPIS.retention_user_7_rate, KPIS.retention_user_15_rate,KPIS.retention_user_month_rate]
  }
]

const COLUMN_ARRAY = [COLUMNS.area_name, COLUMNS.statistic_time,COLUMNS.game_subtype_name1]
const TITLE = '一级类型用户留存率分析'
const BIZ = 'game_visit_rt'
const BIZ_SUBTYPE = 'type1'

const UserRetentionRateType1Analysis = () => {
  return (
    <SingleCompareTemplate title={TITLE} kpiGroup={KPI_GROUP} biz={BIZ} bizSubtype={BIZ_SUBTYPE} legendField={COLUMNS.game_subtype_name1.en} columnArr={COLUMN_ARRAY}/>
  )
}

export default UserRetentionRateType1Analysis
