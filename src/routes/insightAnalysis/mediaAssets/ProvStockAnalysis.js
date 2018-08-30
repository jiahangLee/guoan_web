import React from 'react'
import ManyCompareTemplate from '../template/ManyCompareTemplate'
import KPIS from '../../../consts/kpis'
import COLUMNS from '../../../consts/columns'

const KPI_GROUP = [
  {
    label: '已发布',
    value: [KPIS.operatedTotalTime2, KPIS.operatedTotalEpisode2, KPIS.operatedTotalNums2]
  },
  {
    label: '已审核',
    value: [KPIS.canOperateTotalTime2, KPIS.canOperateTotalEpisode2, KPIS.canOperateTotalNums2, KPIS.gravityOnline]
  }
]

const COLUMN_ARRAY = [COLUMNS.statistic_time, COLUMNS.programtype, COLUMNS.programtypename]
const TITLE = '省平台存量分析'
const BIZ = 'ott'//'mediaAssets'
const BIZ_SUBTYPE = 'programTypeName'

const ProStockAnalysis = () => {
  return (
    <ManyCompareTemplate title={TITLE} kpiGroup={KPI_GROUP} biz={BIZ}
                         bizSubtype={BIZ_SUBTYPE}  legendField={COLUMNS.programtypename.en} columnArr={COLUMN_ARRAY} rowKeyField={COLUMNS.statistic_time.en+COLUMNS.programtype.en}/>
  )
}

export default ProStockAnalysis
