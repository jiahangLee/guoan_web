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
    value: [KPIS.activeUser,KPIS.activeUserRatio,  KPIS.businessUser,KPIS.businessUserRatio, KPIS.newUser, KPIS.newUserGrowthRate]
  },
  {
    label: '使用时长类',
    value: [KPIS.timeInUse, KPIS.timeInUseAvg, KPIS.timeInUseAvgOnline, KPIS.timeInUseAvgByUser, KPIS.timeInUseAvgByUserOnline, KPIS.timeInUsePerTimeAvg]//,KPIS.marketShare]
  },
  {
    label: '使用次数类',
    value: [KPIS.useCount, KPIS.useCountAvg, KPIS.useCountAvgOnline, KPIS.userUseCountAvg, KPIS.userUseCountAvgOnline]
  },
   {
    label: '使用天数类',
    value: [KPIS.useDay, KPIS.userUseDay, KPIS.userUseDayOnline]
  },
  {
    label: '市占率类',
    value: [KPIS.marketShare, KPIS.businessMarketShare]
  }
  , {
    label: '流动类',
    value: [KPIS.userFlowRate]
  }
]
const COLUMN_ARRAY = [COLUMNS.area_name, COLUMNS.statistic_time, COLUMNS.game_visit_type1_name]
const TITLE = '一级类型用户分析'
const BIZ = 'game_visit'
const BIZ_SUBTYPE = 'type1'

const businessAppAnalysis = () => {
  return (
    <ManyCompareTemplate title={TITLE} kpiGroup={KPI_GROUP} biz={BIZ} bizSubtype={BIZ_SUBTYPE}
                         legendField={COLUMNS.game_visit_type1_name.en} columnArr={COLUMN_ARRAY}
                         rowKeyField={COLUMNS.statistic_time.en + COLUMNS.game_visit_type1_name.en}/>
  )
}

export default businessAppAnalysis
