/**
 * Created by zhangtao on 2017/9/28.
 */
import React from 'react'
import ManyCompareTemplate from '../template/ManyCompareTemplate'
import KPIS from '../../../consts/kpis'
import COLUMNS from '../../../consts/columns'

const KPI_GROUP = [
  {
    label: '用户使用次数类',
    value: [KPIS.download_times,KPIS.upgrades_times,KPIS.unload_times]
  }
]
const COLUMN_ARRAY = [COLUMNS.area_name,COLUMNS.statistic_time,COLUMNS.appname]
const TITLE = '应用装机情况分析'
const BIZ = 'appstore'
const BIZ_SUBTYPE = 'appname'

const businessAppUse = () => {
  return (
    <ManyCompareTemplate title={TITLE} kpiGroup={KPI_GROUP} biz={BIZ} bizSubtype={BIZ_SUBTYPE} legendField={COLUMNS.appname.en} columnArr={COLUMN_ARRAY} rowKeyField={COLUMNS.statistic_time.en+COLUMNS.appname.en}/>
  )
}

export default businessAppUse
