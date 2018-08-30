/**
 * Created by 王晓普 on 2017/7/17.
 */
import React from 'react'
import ManyCompareTemplate from '../template/ManyCompareTemplate'
import KPIS from '../../../consts/kpis'
import COLUMNS from '../../../consts/columns'

const KPI_GROUP = [
  {
    label: '用户活跃类',
    value: [ KPIS.activeUser, KPIS.activeUserRatio]//,KPIS.marketShare]
  },{
    label: '使用时长类',
    value: [KPIS.timeInUse,KPIS.timeInUseAvgByUser,KPIS.timeInUsePerTimeAvg,KPIS.businessMarketShare]//,KPIS.marketShare]
  }, {
    label: '使用次数类',
    value: [KPIS.useCount,KPIS.userUseCountAvg]
  }
]
const COLUMN_ARRAY = [COLUMNS.area_name, COLUMNS.statistic_time, COLUMNS.section_subtype_name]
const TITLE = 'VOD点播栏目分析'
const BIZ = 'vod_three'
const BIZ_SUBTYPE = 'section'

const SectionAnalysis = () => {
  return (
    <ManyCompareTemplate title={TITLE} kpiGroup={KPI_GROUP} biz={BIZ} bizSubtype={BIZ_SUBTYPE}  legendField={COLUMNS.section_subtype_name.en} columnArr={COLUMN_ARRAY} rowKeyField={COLUMNS.statistic_time.en+COLUMNS.section_subtype_name.en}/>
  )
}

export default SectionAnalysis
