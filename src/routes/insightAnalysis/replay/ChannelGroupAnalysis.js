/**
 * Created by liekkas on 2017/4/4.
 */
import React from 'react'
import CompareTemplate from '../template/CompareTemplate'
import KPIS from '../../../consts/kpis'
import COLUMNS from '../../../consts/columns'

const KPI_ARRAY = [KPIS.activeUser, KPIS.activeUserRatio, KPIS.timeInUse, KPIS.timeInUseAvg, KPIS.timeInUseAvgOnline,
  KPIS.timeInUseAvgByUser, KPIS.timeInUseAvgByUserOnline,KPIS.marketShare,KPIS.businessMarketShare]
const COLUMN_ARRAY = [COLUMNS.area_name, COLUMNS.statistic_time, COLUMNS.channel_group_type]
const TITLE = '回看频道组分析'
const BIZ = 'replay'
const BIZ_SUBTYPE = 'channel_group'
const COMPARE_TYPES = [
  'CHC华诚付费频道组',
  'SITV频道组',
  '中国教育频道组',
  '中国网络电视频道组',
  '中数传媒频道组',
  '其他频道组',
  '北京频道组',
  '北广传媒频道组',
  '北方新媒体频道组',
  '华数传媒频道组',
  '卫视频道组',
  '地方频道组',
  '境外频道组',
  '天华传媒频道组',
  '天瑞传媒频道组',
  '央视频道组',
  '广播频道组',
  '数字付费频道组',
  '星元传媒',
  '测试频道组'
]


const ChannelGroupAnalysis = () => {
  return (
    <CompareTemplate title={TITLE} kpiArr={KPI_ARRAY} columnArr={COLUMN_ARRAY}
                     labelField={COLUMNS.statistic_time.en}
                     legendField={COLUMNS.channel_group_type.en}
                     rowKeyField={COLUMNS.statistic_time.en+COLUMNS.channel_group_type.en}
                     compareTypes={COMPARE_TYPES}
                     biz={BIZ} bizSubtype={BIZ_SUBTYPE}/>
  )
}

export default ChannelGroupAnalysis
