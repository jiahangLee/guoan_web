/**
 * Created by zhangtao on 2017/11/28.
 */
import React from 'react'
import ManyCompareTemplate from '../template/ManyCompareTemplate'
import KPIS from '../../../consts/kpis'
import COLUMNS from '../../../consts/columns'

const KPI_GROUP = [
  {
    label: '',
    value: [KPIS.downloadCount, KPIS.downloadUser, KPIS.installCount,KPIS.installUser]
  }
]
const COLUMN_ARRAY = [COLUMNS.area_name, COLUMNS.statistic_time, COLUMNS.game_subtype_name]
const TITLE = '游戏使用分析'
const BIZ = 'game_room'
const BIZ_SUBTYPE = 'use_common'

const BusinessGameUseAnalysis = () => {
  return (
    <ManyCompareTemplate title={TITLE} kpiGroup={KPI_GROUP} biz={BIZ} bizSubtype={BIZ_SUBTYPE}
                         legendField={COLUMNS.game_subtype_name.en} columnArr={COLUMN_ARRAY}
                         rowKeyField={COLUMNS.statistic_time.en + COLUMNS.game_subtype_name.en}/>
  )
}

export default BusinessGameUseAnalysis
