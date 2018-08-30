/**
 * Created by zhangtao on 2017/9/28.
 */
import React from 'react'
import FlowTrendTemplate from '../template/FlowTrendTemplate'
import KPIS from '../../../consts/kpis'
import COLUMNS from '../../../consts/columns'

const KPI_GROUP = [
  {
    label: '关联流量',
    value: [KPIS.users, KPIS.counts, KPIS.gravity_of_user,KPIS.gravity_of_count]
  },{
    label: '流入流量',
    value: [KPIS.users_in, KPIS.counts_in, KPIS.gravity_of_user_in,KPIS.gravity_of_count_in]
  }, {
    label: '流出流量',
    value: [KPIS.users_out, KPIS.counts_out, KPIS.gravity_of_user_out,KPIS.gravity_of_count_out]
  }
]
const COLUMN_ARRAY = [COLUMNS.area_name,COLUMNS.statistic_time,COLUMNS.app_subtype_name2,COLUMNS.relation_business_name]
const TITLE = '二级应用用户流动分析'
const BIZ = 'app'
const BIZ_SUBTYPE = 'type2'

const businessFlowTrendType2 = () => {
  return (
    <FlowTrendTemplate title={TITLE} kpiGroup={KPI_GROUP} biz={BIZ} bizSubtype={BIZ_SUBTYPE} legendField={COLUMNS.statistic_time.en} columnArr={COLUMN_ARRAY} rowKeyField={COLUMNS.statistic_time.en+COLUMNS.channel_type.en} labelField={COLUMNS.channel_type.en} />
  )
}

export default businessFlowTrendType2
