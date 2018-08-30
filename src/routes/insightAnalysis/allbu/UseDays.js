/**
 * Created by liekkas on 2017/3/2.
 */
import React from 'react'
import CompareTemplate from '../template/CompareTemplate'
import KPIS from '../../../consts/kpis'
import COLUMNS from '../../../consts/columns'

const KPI_ARRAY = [KPIS.useDay, KPIS.userUseDay,KPIS.userUseDayOnline]
const COLUMN_ARRAY = [COLUMNS.area_name, COLUMNS.statistic_time, COLUMNS.biz_type]
const TITLE = '全业务使用天数'
const BIZ = 'all'
const BIZ_SUBTYPE = 'useDays'
// const COMPARE_TYPES = ["直播", "回看", "时移", "VOD", "OTT", "教育", "游戏", "应用商店", "智慧社区", "百灵K歌","幸福健身团", "电商平台", "广告", "APP"]
const COMPARE_TYPES = ["直播", "回看", "时移", "VOD点播", "OTT点播", "教育","游戏大厅","应用商店", "智慧社区", "百灵K歌","幸福健身团"]
const UseDays = () => {
  return (
    <CompareTemplate title={TITLE} kpiArr={KPI_ARRAY} columnArr={COLUMN_ARRAY}
                     labelField={COLUMNS.statistic_time.en}
                     legendField={COLUMNS.biz_type.en}
                     rowKeyField={COLUMNS.statistic_time.en+COLUMNS.biz_type.en}
                     compareTypes={COMPARE_TYPES}
                     biz={BIZ} bizSubtype={BIZ_SUBTYPE} />
  )
}

export default UseDays
