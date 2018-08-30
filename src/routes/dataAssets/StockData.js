/**
 * Created by wanggy on 2018/1/24
 */
import React from 'react'
import SearchAndTableTemplate from '../dataAssets/template/SearchAndTableTemplate'
import COLUMNS from '../../consts/columns'

const COLUMN_ARRAY = [COLUMNS.statistic_time,COLUMNS.area_name,COLUMNS.business_type,COLUMNS.history_data,COLUMNS.increment_data]
const TITLE = '存量数据'
const BIZ = 'stockData'
const BIZ_SUBTYPE = 'dataAssets'

const UserCover = () => {
  return (
    <SearchAndTableTemplate title={TITLE}  biz={BIZ} bizSubtype={BIZ_SUBTYPE}  columnArr={COLUMN_ARRAY} />
  )
}

export default UserCover
