/**
 * Created by zhangtao on 2017/9/28.
 */
import React from 'react'
import ManyCompareTemplate from '../template/ManyCompareTemplate'
import KPIS from '../../../consts/kpis'
import COLUMNS from '../../../consts/columns'

const KPI_GROUP = [
  {
    label: '商品浏览类',
    value: [KPIS.goodsScanCount,KPIS.goodsScanUser,KPIS.addToShopcartGoods,KPIS.addToShopcartCount,KPIS.addToShopcartRate]
  }
]
const COLUMN_ARRAY = [COLUMNS.area_name,COLUMNS.statistic_time,COLUMNS.shop_name,COLUMNS.type_name,COLUMNS.goods_name]
const TITLE = '电商平台浏览信息分析'
const BIZ = 'ecom'
const BIZ_SUBTYPE = 'scan'

const businessAppUse = () => {
  return (
    <ManyCompareTemplate title={TITLE} kpiGroup={KPI_GROUP} biz={BIZ} bizSubtype={BIZ_SUBTYPE} legendField={COLUMNS.goods_name.en} columnArr={COLUMN_ARRAY} rowKeyField={COLUMNS.statistic_time.en+COLUMNS.goods_name.en}/>
  )
}

export default businessAppUse
