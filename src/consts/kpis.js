/**
 * Created by liekkas on 2017/3/15.
 */
const period=['1','5','15','30','60','day','week','halfmonth','month','quarter','year']
const area = ['0201','9601','9701','9702']
export default {
  areaArr : ['0201','9601','9701','9702'],
  personasGroupValue: {en: 'personas_group_value', cn: '价值类'},
  personasGroupViscosity: {en: 'personas_group_viscosity', cn: '粘性类'},
  personasGroupBusinessGroup: {en: 'personas_group_businessGroup', cn: '业务群体'},
  networkUser: {en: 'network_user', cn: '在网用户', unit: '户',period:[period[5]]},
  networkUser2: {en: 'networkUser', cn: '在网用户', unit: '户',period},
  networkUserAccumulated: {en: 'network_user_accumulated', cn: '累计在网用户', unit: '户',period},
  userAccumulated: {en: 'user_accumulated', cn: '累计用户', unit: '户',period,area:[area[1]]},
  onlineUserAccumulated: {en: 'online_user_accumulated', cn: '累计在线用户', unit: '户',period},
  onlineUser: {en: 'online_user', cn: '在线用户', unit: '户',period},
  activeUser: {en: 'active_user', cn: '活跃用户', unit: '户',period,area},
  activeUserRatio: {en: 'active_user_ratio', cn: '活跃度', unit: '%',period,area:[area[1]],areaRP:area},
  newUser: {en: 'new_user', cn: '新增用户', unit: '户',period},
  newUserGrowthRate: {en: 'new_user_growth_rate', cn: '用户增长率', unit: '%',period},
  businessUser: {en: 'business_user', cn: '业务用户', unit: '户',period},
  businessUserRatio: {en: 'business_user_ratio', cn: '业务用户占比', unit: '%',period},
  userIndex: {en: 'user_index', cn: '用户指数', unit: '%',period,area:[area[1]],areaRP : [area[1]]},
  lossUser: {en: 'loss_user', cn: '潜在流失用户', unit: '户',period:[period[8]]},

  timeInUse: {en: 'time_in_use', cn: '使用时长', unit: '分钟',period,area,areaRP : area},
  timeInUseAvg: {en: 'time_in_use_avg', cn: '平均使用时长', unit: '分钟',area,areaRP : [area[0],area[2],area[3]], period:[period[5],period[6],period[7],period[8],period[9],period[10]]},
  timeInUseAvgOnline: {en: 'time_in_use_avg_online', cn: '平均使用时长_在线', unit: '分钟',period:[period[5],period[6],period[7],period[8],period[9],period[10]]},
  timeInUseAvgByUser: {en: 'time_in_use_avg_by_user', cn: '户均使用时长', unit: '分钟',period,area,areaRP : [area[1]]},
  timeInUseAvgByUserOnline: {en: 'time_in_use_avg_by_user_online', cn: '户均使用时长_在线', unit: '分钟',period},
  marketShare: {en:'market_share', cn:'市占率', unit: '%',period},
  businessMarketShare: {en:'business_market_share',cn:'业务市占率',unit:'%',period,area:[area[1]]},

  useCount: {en: 'use_count', cn: '使用次数', unit: '次',period , area,areaRP : area},
  useCountAvg: {en: 'use_count_avg', cn: '平均使用次数', unit: '次',period:[period[5],period[6],period[7],period[8],period[9],period[10]]},
  useCountAvgOnline: {en: 'use_count_avg_online', cn: '平均使用次数_在线', unit: '次',period:[period[5],period[6],period[7],period[8],period[9],period[10]]},
  userUseCountAvg: {en: 'user_use_count_avg', cn: '户均使用次数', unit: '次',period , area,areaRP : [area[1]]},
  userUseCountAvgOnline: {en: 'user_use_count_avg_online', cn: '户均使用次数_在线', unit: '次',period},
  timeInUsePerTimeAvg: {en: 'time_in_use_per_time_avg', cn: '次均使用时长', unit: '分钟',period,area:[area[1]],areaRP : [area[1]]},


  useDay: {en: 'use_day', cn: '使用天数', unit: '天',period:[period[6],period[7],period[8],period[9],period[10]]},
  userUseDay: {en: 'user_use_day', cn: '户均使用天数', unit: '天',period:[period[6],period[7],period[8],period[9],period[10]]},
  userUseDayOnline: {en: 'user_use_day_online', cn: '户均使用天数_在线', unit: '天',period:[period[6],period[7],period[8],period[9],period[10]]},
  bounces: {en: 'bounces', cn: '跳出次数', unit: '次',period:[period[5],period[6],period[7],period[8],period[9],period[10]]},
  outOfProportion: {en: 'out_of_proportion', cn: '跳出比例', unit: '%',period:[period[5],period[6],period[7],period[8],period[9],period[10]]},


  open_device_day: {en: 'open_device_day', cn: '开机天数', unit: '天',period},
  open_device_day_by_user: {en: 'open_device_day_by_user', cn: '户均开机天数', unit: '天',period},
  open_device_day_by_user_online: {en: 'open_device_day_by_user_online', cn: '户均开机天数在线', unit: '天',period},
  open_device_ratio: {en: 'open_device_ratio', cn: '开机率', unit: '%',period},
  open_device_ratio_by_day: {en: 'open_device_ratio_by_day', cn: '日均开机率', unit: '%',period},
  open_device_user: {en: 'open_device_user', cn: '开机用户', unit: '户',period},

  open_box_by_user: {en: 'open_box_by_user', cn: '户均开盒次数', unit: '次',period},
  open_box_by_user_online: {en: 'open_box_by_user_online', cn: '户均开盒次数在线', unit: '次',period},
  open_box_count: {en: 'open_box_count', cn: '开盒次数', unit: '次',period},
  open_box_count_avg: {en: 'open_box_count_avg', cn: '平均开盒次数', unit: '次',period},
  open_box_count_avg_online: {en: 'open_box_count_avg_online', cn: '平均开盒次数在线', unit: '次',period},
  open_box_user: {en: 'open_box_user', cn: '开盒用户', unit: '户',period},

  userOverlapDegree: {en:'user_overlap_degree',cn:'用户重叠度',unit:'%',period},
  canRunTime: {en:'can_run_time',cn:'可运营时长',unit:'分钟',period:[period[5]]},
  gravityOnline: {en:'gravity_online',cn:'在线比重',unit:'%',period:[period[5]]},
  resourceUtilizationRate: {en:'resource_utilization_rate',cn:'资源利用率',unit:'%',period:[period[5]]},
  loyalty :{en:'loyalty',cn:'忠诚度',unit:'%',period},
  audienceRatings:{en:'audience_ratings',cn:'收视率',unit:'%',period,area},

  users: {en: 'users', cn: '关联用户数', unit: '户',period},
  counts: {en: 'counts', cn: '关联次数', unit: '次',period},
  gravity_of_user: {en: 'gravity_of_user', cn: '关联用户比重', unit: '%',period},
  gravity_of_count: {en: 'gravity_of_count', cn: '关联次数比重', unit: '%',period},

  users_in: {en: 'users', cn: '流入用户数', unit: '户',period},
  counts_in: {en: 'counts', cn: '流入次数', unit: '次',period},
  gravity_of_user_in: {en: 'gravity_of_user', cn: '流入用户比重', unit: '%',period},
  gravity_of_count_in: {en: 'gravity_of_count', cn: '流入次数比重', unit: '%',period},

  users_out: {en: 'users', cn: '流出用户数', unit: '户',period},
  counts_out: {en: 'counts', cn: '流出次数', unit: '次',period},
  gravity_of_user_out: {en: 'gravity_of_user', cn: '流出用户比重', unit: '%',period},
  gravity_of_count_out: {en: 'gravity_of_count', cn: '流出次数比重', unit: '%',period},
  userFlowRate: {en: 'user_flow_rate', cn: '用户流动率', unit: '%',period},

  flowInUser: {en: 'flow_in_user', cn: '流入用户数', unit: '户',period},
  flowOutUser: {en: 'flow_out_user', cn: '流出用户数', unit: '户',period},


  newVisitUser: {en: 'new_visit_user', cn: '新增访问用户', unit: '户',period},
  accumulatedVisitUser: {en: 'accumulated_visit_user', cn: '累计访问用户', unit: '户',period},
  visitUser: {en: 'visit_user', cn: '访问用户', unit: '户',period},
  visitRate: {en: 'visit_rate', cn: '访问率', unit: '%',period},


  download_times: {en: 'download_times', cn: '下载次数', unit: '次',period},
  upgrades_times: {en: 'update_times', cn: '升级次数', unit: '次',period},
  setup_times: {en: 'setup_times', cn: '安装次数', unit: '次',period},
  unload_times: {en: 'unload_times', cn: '卸载次数', unit: '次',period},
  retention_user_next: {en: 'retention_user_next', cn: '次日留存用户', unit: '户',period},
  retention_user_next_rate: {en: 'retention_user_next_rate', cn: '次日留存率', unit: '%',period},
  retention_user_3: {en: 'retention_user_3', cn: '3日留存用户', unit: '户',period},
  retention_user_3_rate: {en: 'retention_user_3_rate', cn: '3日留存率', unit: '%',period},
  retention_user_5: {en: 'retention_user_5', cn: '5日留存用户', unit: '户',period},
  retention_user_5_rate: {en: 'retention_user_5_rate', cn: '5日留存率', unit: '%',period},
  retention_user_7: {en: 'retention_user_7', cn: '7日留存用户', unit: '户',period},
  retention_user_7_rate: {en: 'retention_user_7_rate', cn: '7日留存率', unit: '%',period},
  retention_user_15: {en: 'retention_user_15', cn: '15日留存用户', unit: '户',period},
  retention_user_15_rate: {en: 'retention_user_15_rate', cn: '15日留存率', unit: '%',period},
  retention_user_month: {en: 'retention_user_month', cn: '月留存用户', unit: '户',period},
  retention_user_month_rate: {en: 'retention_user_month_rate', cn: '月留存率', unit: '%',period},


  tagsCategory: {en: 'tags_category', cn: '一级分类'},
  tagsCategorySecond: {en: 'tags_category_second', cn: '二级分类'},
  tagsCountry: {en: 'tags_country', cn: '喜好地区', unit: '户',period},
  tagsDirector: {en: 'tags_director', cn: '喜好导演', unit: '户',period},
  tagsLanguage: {en: 'tags_language', cn: '喜好语言', unit: '户',period},
  tagsScreenwriter: {en: 'tags_screenwriter', cn: '喜好编剧', unit: '户',period},
  tagsStarring: {en: 'tags_starring', cn: '喜好明星', unit: '户',period},
  tagsUserdefine: {en: 'tags_userdefine', cn: '用户标签', unit: '户',period},

  operatedoffLineTime: {en: 'operated_offline_time', cn: '下线时长', unit: '时',period},
  operatedoffLineEpisode: {en: 'operated_offline_episode', cn: '下线集数', unit: '集',period},
  operatedoffLineNums: {en: 'operated_offline_nums', cn: '下线部数', unit: '部',period},

  operatedTotalTime2: {en: 'operated_total_time', cn: '运营存量时长', unit: '时',period},
  operatedTotalEpisode2: {en: 'operated_total_episode', cn: '运营存量集数', unit: '集',period},
  operatedTotalNums2: {en: 'operated_total_nums', cn: '运营存量部数', unit: '部',period},
  canOperateTotalTime2: {en: 'can_operate_total_time', cn: '可运营存量时长', unit: '时',period},
  canOperateTotalEpisode2: {en: 'can_operate_total_episode', cn: '可运营存量集数', unit: '集',period},
  canOperateTotalNums2: {en: 'can_operate_total_nums', cn: '可运营存量部数', unit: '部',period},

  operatedTotalTime: {en: 'operated_total_time', cn: '运营增量时长', unit: '时',period},
  operatedTotalEpisode: {en: 'operated_total_episode', cn: '运营增量集数', unit: '集',period},
  operatedTotalNums: {en: 'operated_total_nums', cn: '运营增量部数', unit: '部',period},
  canOperateTotalTime: {en: 'can_operate_total_time', cn: '可运营增量时长', unit: '时',period},
  canOperateTotalEpisode: {en: 'can_operate_total_episode', cn: '可运营增量集数', unit: '集',period},
  canOperateTotalNums: {en: 'can_operate_total_nums', cn: '可运营增量部数', unit: '部',period},
  gravityOnline: {en: 'gravity_online', cn: '在线比重', unit: '%',period:['1','5','15','30','60','day']},
  publishTotalTime: {en: 'publish_total_time', cn: '发布总量时长', unit: '秒',period},
  publishTotalEpisode: {en: 'publish_total_episode', cn: '发布总量集数', unit: '集',period},
  publishTotalNums: {en: 'publish_total_nums', cn: '发布总量部数', unit: '部',period},

  programType: {en: 'programtype', cn: '媒资一级分类喜好群',},
  programTypeNameArray: {en: 'programtypenamearray', cn: '媒资二级分类喜好群',},
  tagsUserdefine: {en: 'tags_userdefine', cn: '自定义标签喜好群',},
  tagsCategory: {en: 'tags_category', cn: '豆瓣分类喜好群',},
  tagsDirector: {en: 'tags_director', cn: '导演喜好群',},
  tagsScreenwriter: {en: 'tags_screenwriter', cn: '编剧喜好群',},
  tagsStarring: {en: 'tags_starring', cn: '明星喜好群',},
  tagsLanguage: {en: 'tags_language', cn: '语言喜好群',},
  tagsCountry: {en: 'tags_country', cn: '地域喜好群',},


  multipleExposure : {en: 'deviceid', cn: '重复曝光次数', unit: '次数',period},
  unMultipleExposure: {en: 'distinct_deviceid', cn: '不重复曝光次数', unit: '次数',period},
  arrivalRate: {en: 'arrival_rate', cn: '到达率', unit: '',period :period},

  userCount : {en: 'user_count', cn: '用户数', unit: '户',period},
  userRate : {en: 'user_rate', cn: '用户占比', unit: '%',period},
  userLevel : {en: 'user_level', cn: '档位级别', unit: '级',period},

  downloadCount : {en: 'download_count', cn: '下载次数', unit: '次数',period},
  downloadUser : {en: 'download_user', cn: '下载用户数', unit: '户',period},
  installCount : {en: 'install_count', cn: '安装次数', unit: '次数',period},
  installUser : {en: 'install_user', cn: '安装用户数', unit: '户',period},

  goodsScanCount : {en: 'goods_scan_count', cn: '商品浏览次数', unit: '次数',period},
  goodsScanUser : {en: 'goods_scan_user', cn: '商品浏览人数', unit: '户',period},
  addToShopcartGoods : {en: 'add_to_shopcart_goods', cn: '购物车添加商品数', unit: '个',period},
  addToShopcartCount : {en: 'add_to_shopcart_count', cn: '购物车添加商品次数', unit: '次数',period},
  addToShopcartRate : {en: 'add_to_shopcart_rate', cn: '购物车成功添加占比', unit: '%',period},



}
