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
    value: [KPIS.multipleExposure, KPIS.unMultipleExposure]
  }
]

const COLUMN_ARRAY = [COLUMNS.statistic_time, COLUMNS.adplacename, COLUMNS.adtype]
const TITLE = '广告业务分析'
const BIZ = 'advert_three'//advertisement
const BIZ_SUBTYPE = 'adBusiness'

const AdBusinessAnalysis = () => {
  return (
    <ManyCompareTemplate title={TITLE} kpiGroup={KPI_GROUP} biz={BIZ}
                         bizSubtype={BIZ_SUBTYPE}  legendField={COLUMNS.adtype.en} columnArr={COLUMN_ARRAY} rowKeyField={COLUMNS.statistic_time.en+COLUMNS.adplacename.en}/>
  )
}

export default AdBusinessAnalysis
