/**
 * Created by wanggy on 2018/1/24
 */
import React from 'react'
import SearchAndTableTemplate from '../dataAssets/template/SearchAndTableTemplate'
import COLUMNS from '../../consts/columns'

const COLUMN_ARRAY = [COLUMNS.statistic_time,COLUMNS.area_name,COLUMNS.business_type,COLUMNS.online_user,COLUMNS.new_user]
const TITLE = '覆盖用户量'
const BIZ = 'userCover'
const BIZ_SUBTYPE = 'dataAssets'

const UserCover = () => {
  return (
    <SearchAndTableTemplate title={TITLE}  biz={BIZ} bizSubtype={BIZ_SUBTYPE}  columnArr={COLUMN_ARRAY} />
  )
}

export default UserCover
