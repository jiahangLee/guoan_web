/**
 * Created by zhangtao on 2017/10/15.
 */
import React from 'react'
import SingleCompareTemplate from '../template/SingleCompareTemplate'
import KPIS from '../../../consts/kpis'
import COLUMNS from '../../../consts/columns'


const KPI_GROUP = [
  {
    label: '用户使用次数类',
    value: [KPIS.download_times,KPIS.upgrades_times,KPIS.setup_times]
  }
]

const COLUMN_ARRAY = [COLUMNS.area_name, COLUMNS.statistic_time]
const TITLE = '幸福健身团用户使用分析'
const BIZ = 'happy_fitness_group'
const BIZ_SUBTYPE = 'second'

const UserRetentionRateAnalysis = () => {
  return (
    <SingleCompareTemplate title={TITLE} kpiGroup={KPI_GROUP} biz={BIZ} bizSubtype={BIZ_SUBTYPE} legendField={COLUMNS.section_type.en} columnArr={COLUMN_ARRAY}/>
  )
}

export default UserRetentionRateAnalysis
