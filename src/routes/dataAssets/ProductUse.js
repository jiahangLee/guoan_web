/**
 * Created by wanggy on 2018/1/24
 */
import React from 'react'
import SearchAndTableTemplate from '../dataAssets/template/SearchAndTableTemplate'
import COLUMNS from '../../consts/columns'

const COLUMN_ARRAY = [COLUMNS.statistic_time,COLUMNS.area_name,COLUMNS.business_type,COLUMNS.business_children_type,
  COLUMNS.user_count,COLUMNS.login_count,COLUMNS.browse_page_count,COLUMNS.data_download_count,COLUMNS.pic_download_count]
const TITLE = '产品使用量'
const BIZ = 'productUse'
const BIZ_SUBTYPE = 'dataAssets'

const ProductUse = () => {
  return (
    <SearchAndTableTemplate title={TITLE}  biz={BIZ} bizSubtype={BIZ_SUBTYPE}  columnArr={COLUMN_ARRAY} />
  )
}

export default ProductUse
