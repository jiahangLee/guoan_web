/**
 * Created by zhangtao on 2017/11/28.
 */
import React from 'react'
import ManyCompareTemplate from '../template/ManyCompareTemplate'
import KPIS from '../../../consts/kpis'
import COLUMNS from '../../../consts/columns'

const KPI_GROUP = [
  {
    label: '用户活跃类',
    value: [ KPIS.activeUser, KPIS.activeUserRatio]//,KPIS.marketShare]
  },
  {
    label: '使用时长类',
    value: [KPIS.timeInUse, KPIS.timeInUseAvg,KPIS.timeInUseAvgOnline,KPIS.timeInUseAvgByUser,KPIS.timeInUseAvgByUserOnline,KPIS.marketShare,KPIS.businessMarketShare,KPIS.userIndex]//,KPIS.marketShare]
  },
  {
    label: '使用次数类',
    value: [KPIS.useCount, KPIS.useCountAvg,KPIS.useCountAvgOnline]
  }
]
const COLUMN_ARRAY = [COLUMNS.area_name, COLUMNS.statistic_time, COLUMNS.app_section_type1]
const TITLE = '一级应用分类分析'
const BIZ = 'app'
const BIZ_SUBTYPE = 'type1'

const businessAppType1Analysis = () => {
  return (
    <ManyCompareTemplate title={TITLE} kpiGroup={KPI_GROUP} biz={BIZ} bizSubtype={BIZ_SUBTYPE} legendField={COLUMNS.app_section_type1.en} columnArr={COLUMN_ARRAY} rowKeyField={COLUMNS.statistic_time.en+COLUMNS.app_section_type1.en}/>
  )
}

export default businessAppType1Analysis
