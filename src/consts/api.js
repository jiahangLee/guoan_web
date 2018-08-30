/**
 * Created by liekkas on 2017/3/17.
 */
import {REST_API, REST_PERSONAS_API} from '../config'

export default {
  SECTION: `${REST_API}/analyses/config/sections`,
  SECTION2: `${REST_API}/analyses/config/sections2`,
  GAMEVISIT: `${REST_API}/analyses/config/gameVisits`,
  PROGRAM: `${REST_API}/analyses/config/programs`,
  AREA: `${REST_API}/analyses/config/areas`,
  CHANNEL: `${REST_API}/analyses/config/channels`,
  SINGLEGAME: `${REST_API}/analyses/config/singleGame`,
  CHANNELOFTHREE: `${REST_API}/analyses/config/channelsOfThree`,
  PROGRAMSOFCHANNEL: `${REST_API}/analyses/config/programsOfChannel`,
  PROGRAMSOFCHANNELOFTHREE: `${REST_API}/analyses/config/programsOfChannelOfThree`,
  USERRADIO: `${REST_API}/analyses/userradio`,
  STATS: `${REST_API}/analyses/statistic`,
  RETENTION: `${REST_API}/analyses/retentionstatistic`,
  FLOWSTATS: `${REST_API}/analyses/flowstatistic`,
  FLOWTREND: `${REST_API}/analyses/flowTrend`,
  FLOWTRENDMINUTE: `${REST_API}/analyses/flowTrendMinute`,
  PROGRAMRANK: `${REST_API}/analyses/programRank`,
  THREERANK: `${REST_API}/analyses/threeRank`,
  SINGLE:`${REST_API}/analyses/single`,
  KPILIST:`${REST_API}/analyses/kpiList`,
  COORDMAPLIST:`${REST_API}/analyses/coordMapList`,
  CHANNELGROUP:`${REST_API}/analyses/config/channelGroups`,
  CHANNELGROUPRANK:`${REST_API}/analyses/channelGroupsRank`,
  MEDIASOFOTT: `${REST_API}/analyses/config/mediasOfOtt`,
  MEDIASTATISTIC: `${REST_API}/analyses/mediastatistic`,
  ADTYPE: `${REST_API}/analyses/config/advertOfCommon`,
  ADTYPETHREE: `${REST_API}/analyses/config/advertOfThree`,
  ADBUSINESS: `${REST_API}/analyses/advertstatistic`,
  APPCONFIG: `${REST_API}/analyses/config/appsections`,
  ECOMCONFIG: `${REST_API}/analyses/config/ecoms`,

  ValueLevel: `${REST_PERSONAS_API}/value/valueLevel`,//群体画像-价值类-等级
  ValueAllBusinessSort: `${REST_PERSONAS_API}/value/valueAllBusinessSort`,//群体画像-价值类-总业务付费产品排行
  ValueChildBusinessSort: `${REST_PERSONAS_API}/value/valueChildBusinessSort`,//群体画像-价值类-分业务付费产品排行
  ValueLevelValueArea: `${REST_PERSONAS_API}/value/valueArea`,//群体画像-价值类-区域分布
  ValueTrend: `${REST_PERSONAS_API}/value/valueTrend`,//群体画像-价值类-付费用户趋势
  ValueBusinessPreference: `${REST_PERSONAS_API}/value/valueBusinessPreference`,//群体画像-价值类-业务偏好
  ValueJudge: `${REST_PERSONAS_API}/value/valueJudge`,//群体画像-价值类-人员判定
  ValueTagsCluster: `${REST_PERSONAS_API}/value/valueTagsCluster`,//群体画像-价值类-用户标签分群
  ValuePreferenceCluster: `${REST_PERSONAS_API}/value/valuePreferenceCluster`,//群体画像-价值类-价值偏好

  ViscosityOverview: `${REST_PERSONAS_API}/viscosity/viscosityOverview`,//群体画像-粘性类-概况
  ViscosityOverviewLoss: `${REST_PERSONAS_API}/viscosity/viscosityLoss`,//群体画像-粘性类-概况
  ViscosityAllBusinessSort: `${REST_PERSONAS_API}/viscosity/viscosityAllBusinessSort`,//群体画像-粘性类-总业务排行
  ViscosityChildBusinessSort: `${REST_PERSONAS_API}/viscosity/viscosityChildBusinessSort`,//群体画像-粘性类-分业务排行
  ViscosityArea: `${REST_PERSONAS_API}/viscosity/viscosityArea`,//群体画像-粘性类-区域分布
  ViscosityTrend: `${REST_PERSONAS_API}/viscosity/viscosityTrend`,//群体画像-粘性类-用户趋势
  ViscosityJudge: `${REST_PERSONAS_API}/viscosity/viscosityJudge`,//群体画像-粘性类-人员判定
  ViscosityTagsCluster: `${REST_PERSONAS_API}/viscosity/viscosityTagsCluster`,//群体画像-粘性类-标签分群
  ViscosityPreferenceCluster: `${REST_PERSONAS_API}/viscosity/viscosityPreferenceCluster`,//群体画像-粘性类-价值偏好
  PreferenceCluster : `${REST_PERSONAS_API}/preference/preferenceCluster`,//群体画像 -- 业务群体
  ObjectiveMarkerTagsOtt:`${REST_PERSONAS_API}/marker/objectiveMarkerTagsOtt`,//群体画像 -- 业务群体详情

  portraitBusinessTop:`${REST_PERSONAS_API}/portrait/portraitBusinessTop`,//个人画像: 业务使用排行
  portraitInfo:`${REST_PERSONAS_API}/portrait/portraitInfo`, //个人画像: 用户信息
  portraitTagsCluster:`${REST_PERSONAS_API}/portrait/portraitTagsCluster`,  //个人画像: 用户非客观标签,用户偏好
  portraitTagsOtt:`${REST_PERSONAS_API}/portrait/portraitTagsOtt`,// 个人画像：点播收藏
  portraitJudge : `${REST_PERSONAS_API}/portrait/portraitJudge`,// 个人画像：家庭成员判断

  tagsNonobjective : `${REST_PERSONAS_API}/tags/tagsNonobjective`,// 标签类: 非客观标签
  tagsObjective : `${REST_PERSONAS_API}/tags/tagsObjective`,// 标签类: 客观标签

  //数据资产
  UserCover:`${REST_API}/analyses/coverUser`,//覆盖用户量
  StockData:`${REST_API}/analyses/stockData`,//存量数据

  dataReportLis:`${REST_API}/analyses/dataReport/list`,//数据报告list
  dataReportAdd:`${REST_API}/analyses/dataReport/add`,//数据报告添加
  dataReportUpdate:`${REST_API}/analyses/dataReport/update`,//数据报告修改
  dataReportDelete:`${REST_API}/analyses/dataReport/del`,//数据报告删除
  dataReportUpload:`${REST_API}/analyses/dataReport/down`,//数据报告下载
  checkDownAuth:`${REST_API}/analyses/dataReport/checkDownAuth`,//数据报告下载权限校验

  helpDocDownload:`${REST_API}/analyses/dataReport/down/helpDoc/`,//帮助文档下载

  adviceAdd:`${REST_API}/analyses/advice/add`,//提交意见添加
  adviceList:`${REST_API}/analyses/advice/list`,//提交意见list

  helpRetrieval:`${REST_API}/analyses/helpSearch`,//提交意见list

  userUseLog:`${REST_API}/analyses/userUseLog/add`,//记录用户使用日志
}
