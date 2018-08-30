/**
 * Created by sunjl3 on 2017/11/15.
 */
import React from 'react'
import ManyCompareTemplate from '../template/ManyCompareTemplate'
import KPIS from '../../../consts/kpis'
import COLUMNS from '../../../consts/columns'

const KPI_ARRAY = [KPIS.multipleExposure, KPIS.unMultipleExposure, KPIS.arrivalRate]

const KPI_GROUP = [
  {
    label: '',
    value: [KPIS.multipleExposure, KPIS.unMultipleExposure, KPIS.arrivalRate]
  }
]

const COLUMN_ARRAY = [COLUMNS.statistic_time, COLUMNS.adplacename,COLUMNS.row_num]
const TITLE = '广告业务分析'
const BIZ = 'advert'//advertisement
const BIZ_SUBTYPE = 'adBusinessRank'

const AdBusinessAnalysis = () => {
  return (
    <ManyCompareTemplate title={TITLE} kpiGroup={KPI_GROUP} biz={BIZ}
                         bizSubtype={BIZ_SUBTYPE}  legendField={COLUMNS.adplacename.en} columnArr={COLUMN_ARRAY} rowKeyField={COLUMNS.statistic_time.en+COLUMNS.adplacename.en}/>
  )
}

export default AdBusinessAnalysis
