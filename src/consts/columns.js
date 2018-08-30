/**
 * Created by liekkas on 2017/3/24.
 */
export default {
  area_name: {en: 'area_name', cn: '地区', unit: '', width: 100},
  statistic_time: {en: 'statistic_time', cn: '日期', unit: '', width: 150},
  channel_type: {en: 'channel_label', cn: '频道类型', unit: '', width: 100},
  channel_name: {en: 'channel_label', cn: '频道名称', unit: '', width: 100},
  channel_group_type: {en: 'channel_group_label', cn: '频道类型', unit: '', width: 100},
  channel_group_type: {en: 'channel_group_label', cn: '频道名称', unit: '', width: 100},
  user_count: {en: 'user_count', cn: '用户数', unit: '', width: 100},
  login_count: {en: 'login_count', cn: '登录次数（次）', unit: '', width: 100},
  browse_page_count: {en: 'browse_page_count', cn: '浏览页面（页）', unit: '', width: 100},
  data_download_count: {en: 'data_download_count', cn: '数据下载次数（次）', unit: '', width: 100},
  pic_download_count: {en: 'pic_download_count', cn: '图片下载次数（次）', unit: '', width: 100},
  business_type: {en: 'business_type', cn: '业务类型', unit: '', width: 100},
  business_children_type: {en: 'business_children_type', cn: '业务子功能', unit: '', width: 100},

  history_data: {en: 'history_data', cn: '存量数据（M）', unit: '', width: 100},
  increment_data: {en: 'increment_data', cn: '新增数据量（K）', unit: '', width: 100},

  online_user: {en: 'online_user', cn: '覆盖用户（户）', unit: '', width: 100},
  new_user: {en: 'new_user', cn: '新增用户（户）', unit: '', width: 100},
  biz_type: {en: 'compare_type', cn: '业务类型', unit: '', width: 100},
  section_type:{en:'section_name',cn:'栏目名称',unit:'',width:100},
  section_type2:{en:'section_name',cn:'二级栏目名称',unit:'',width:100},
  section2_type:{en:'section_name',cn:'频道名称',unit:'',width:100},
  program_type:{en:'program_name',cn:'节目名称',unit:'',width:100},
  row_num:{en:'row_num',cn:'排名',unit:'',width:100},
  subject:{en:'subject',cn:'子业务',unit:'',width:200},
  channel_subtype_name: {en: 'subtype_name', cn: '频道名称', unit: '', width: 100},
  series_subtype_name:{en:'subtype_name',cn:'剧集名称',unit:'',width:100},
  program_subtype_name:{en:'subtype_name',cn:'节目名称',unit:'',width:100},
  section_subtype_name:{en:'subtype_name',cn:'栏目名称',unit:'',width:100},
  app_subtype_name:{en:'subtype_name',cn:'应用名称',unit:'',width:100},
  app_subtype_name1:{en:'subtype_name',cn:'一级应用名称',unit:'',width:100},
  app_subtype_name2:{en:'subtype_name',cn:'二级应用名称',unit:'',width:100},
  relation_business_name:{en:'relation_business_name',cn:'业务',unit:'',width:100},
  channel_label: {en: 'channel_label', cn: '频道名称', unit: '', width: 100},
  program_label: {en: 'program_label', cn: '节目名称', unit: '', width: 100},
  programtype:{en:'programtype',cn:'栏目',unit:'',width:100},
  programtypename:{en:'programtypename',cn:'类目',unit:'',width:100},
  adplacename:{en:'adplacename',cn:'广告位',unit:'',width:100},
  adtype:{en:'adtype',cn:'广告类型',unit:'',width:100},
  apptype1:{en:'apptype1',cn:'一级应用名称',unit:'',width:100},
  apptype2:{en:'apptype2',cn:'二级应用名称',unit:'',width:100},
  appname:{en:'appname',cn:'应用',unit:'',width:100},
  app_section_type:{en:'section_name',cn:'应用名称',unit:'',width:100},
  app_section_type1:{en:'section_name',cn:'一级应用名称',unit:'',width:100},
  app_section_type2:{en:'section_name',cn:'二级应用名称',unit:'',width:100},
  app_subtype_type:{en:'subtype_name',cn:'应用名称',unit:'',width:100},
  section1_type:{en:'section_name',cn:'专区名称',unit:'',width:100},
  program3_type:{en:'program_name',cn:'产品包名称',unit:'',width:100},
  program1_subtype_name:{en:'subtype_name',cn:'产品包名称',unit:'',width:100},
  section1_subtype_name:{en:'subtype_name',cn:'专区名称',unit:'',width:100},
  section2_subtype_name:{en:'subtype_name',cn:'频道名称',unit:'',width:100},

  game_subtype_name1:{en:'subtype_name',cn:'一级游戏名称',unit:'',width:100},
  game_subtype_name2:{en:'subtype_name',cn:'二级游戏名称',unit:'',width:100},

  game_visit_type1_name:{en:'game_visit_type_name',cn:'一级游戏',unit:'',width:100},
  game_visit_type2_name:{en:'game_visit_type_name',cn:'二级游戏',unit:'',width:100},
  game_visit_single_game_name:{en:'game_visit_single_game_name',cn:'游戏',unit:'',width:100},
  game_subtype_name:{en:'subtype_name',cn:'游戏',unit:'',width:100},

  shop_name:{en:'shop_name',cn:'商城名称',unit:'',width:100},
  type_name:{en:'type_name',cn:'商品类型名称',unit:'',width:100},
  goods_name:{en:'goods_name',cn:'商品名称',unit:'',width:100},



}

export function convert (field) {
  const result = {
    title: field.cn + (field.unit ? `(${field.unit})` : ''),
    dataIndex: field.en,
    key: field.en,
    width: field.width,
    fixed: true,
  }
  return result
}

// 暴露该常量，用于Table中计算scrollx的长度，实际上convertKpi中不需要指定固定width，这样浏览器缩放时能自适应。
export const DEFAULT_KPI_LENGTH = 210

// 转换kpi为column。假如有对比，用三段呈现
export function convertKpi (field, isCompare = true) {
  let result = {
    title: field.cn + (field.unit ? `(${field.unit})` : ''),
    dataIndex: field.en,
    key: field.en,
  }
  if (isCompare) {
    result.children = [{
      title: '当前值',
      dataIndex: field.en,
      key: field.en,
      sorter: (a, b) => a.key - b.key,
    }, {
      title: '环比(%)',
      dataIndex: field.en + '_mom',
      key: field.en + '_mom'
    }, {
      title: '同比(%)',
      dataIndex: field.en + '_yoy',
      key: field.en + '_yoy'
    }]
  }
  return result
}

// 转换kpi为column。假如有对比，用三段呈现
export function convertFlowKpi(field) {
  let result = {
    title: field.cn + (field.unit ? `(${field.unit})` : ''),
    dataIndex: field.en,
    key: field.en,
  }
  result.children = [{
    title: '一级分类',
    dataIndex: 'first_sort',
    key: 'first_sort',
    width: 100,
  }, {
    title: '二级分类',
    dataIndex: 'second_sort',
    key: 'second_sort',
    width: 100,
  }]
  return result
}

export function convertFlowAPPKpi(field) {
  let result = {
    title: field.cn + (field.unit ? `(${field.unit})` : ''),
    dataIndex: field.en,
    key: field.en,
  }
  result.children = [{
    title: '一级分类',
    dataIndex: 'first_sort',
    key: 'first_sort',
    width: 100,
  }, {
    title: '二级分类',
    dataIndex: 'second_sort',
    key: 'second_sort',
    width: 100,
  }, {
    title: '名称',
    dataIndex: 'third_sort',
    key: 'third_sort',
    width: 100,
  }]
  return result
}

export function convertFlowKpi2 (field) {
  let result = {
    title: field.cn + (field.unit ? `(${field.unit})` : ''),
    dataIndex: field.en,
    key: field.en,
    sorter: (a, b) => a.key - b.key,
  }
  return result
}


