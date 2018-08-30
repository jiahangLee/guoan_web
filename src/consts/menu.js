/**
 * Created by liekkas on 2017/3/1.
 */

export default [
  {key: 'home', name: '首 页', path: '/home'},
  {key: 'ia', name: '洞察分析', path: '/ia/overview/userCover'},
  {key: 'os', name: '运营支撑', path: '/os'},
  {key: 'um', name: '用户管理', path: '/um/user'},
  {key: 'da', name: '数据资产', path: '/da'},
  {key: 'hc', name: '帮助中心', path: '/hc'}
]

export const MENUS = {
  // 洞察分析 insightAnalysis
  ia: [
    {
      key: 'overview',
      name: '电视概况',
      icon: 'appstore',
      children: [
        {key: 'userCover', name: '用户覆盖'},
        {key: 'userDevelop', name: '用户发展'},
        {key: 'userActive', name: '用户活跃'},
        {key: 'userUse', name: '用户使用'},
      ]
    },
    {
      key: 'allbu',
      name: '全业务使用分析',
      icon: 'appstore',
      children: [
        {key: 'userCount', name: '全业务用户量'},
        {key: 'userTimeInUse', name: '全业务用户使用时长'},
        {key: 'useTimes', name: '全业务使用次数'},
        {key: 'useDays', name: '全业务使用天数'},
      ]
    },
    {
      key: 'dvb',
      name: '直播业务分析',
      icon: 'appstore',
      children: [
        {key: 'userAnalysis', name: '用户分析'},
        {key: 'businessUse', name: '业务使用分析'},
        // {key: 'userFlow', name: '用户流动分析'},
        // {key: 'channelGroup', name: '频道组分析'},
        // {key: 'channelRanking', name: '频道排名'},
        // {key: 'singleChannel', name: '单频道分析'},
        // {key: 'channelCompare', name: '频道对比分析'},
        // {key: 'showRanking', name: '节目排名'},
        // {key: 'singleShow', name: '单节目分析'},
        // {key: 'showCompare', name: '节目对比分析'}
      ]
    }, {
      key: 'replay',
      name: '回看业务分析',
      icon: 'appstore',
      children: [
        {key: 'userAnalysis', name: '用户分析'},
        {key: 'businessUse', name: '业务使用分析'},
        // {key: 'userFlow', name: '用户流动分析'},
        // {key: 'channelRanking', name: '频道排名'},
        // {key: 'singleChannel', name: '单频道分析'},
        // {key: 'channelCompare', name: '频道对比分析'},
        // {key: 'showRanking', name: '节目排名'},
        // {key: 'singleShow', name: '单节目分析'},
        // {key: 'showCompare', name: '节目对比分析'}
      ]
    }, {
      key: 'ts',
      name: '时移业务分析',
      icon: 'appstore',
      children: [
        {key: 'userAnalysis', name: '用户分析'},
        {key: 'businessUse', name: '业务使用分析'},
        // {key: 'userFlow', name: '用户流动分析'},
        // {key: 'channelRanking', name: '频道排名'},
        // {key: 'singleChannel', name: '单频道分析'},
        // {key: 'channelCompare', name: '频道对比分析'},
        // {key: 'showRanking', name: '节目排名'},
        // {key: 'singleShow', name: '单节目分析'},
        // {key: 'showCompare', name: '节目对比分析'}
      ]
    },{
      key: 'vod',
      name: 'VOD点播业务分析',
      icon: 'appstore',
      children: [
        {key: 'userAnalysis', name: '用户分析'},
        {key: 'businessUse', name: '业务使用分析'},
      ]
    },{
      key: 'ott',
      name: 'OTT点播业务分析',
      icon: 'appstore',
      children: [
        {key: 'userAnalysis', name: '用户分析'},
        {key: 'businessUse', name: '业务使用分析'},
      ]
    },{
      key: 'education',
      name: '教育',
      icon: 'appstore',
      children: [
        {key: 'userAnalysis', name: '用户分析'},
        {key: 'businessUse', name: '业务使用分析'},
      ]
    },{
      key: 'appstore',
      name: '应用商店',
      icon: 'appstore',
      children: [
        {key: 'userAnalysis', name: '用户分析'},
        {key: 'businessUse', name: '业务使用分析'},
      ]
    }
    ,{
      key: 'in_community',
      name: '智慧社区',
      icon: 'appstore',
      children: [
        {key: 'userAnalysis', name: '用户分析'},
        // {key: 'businessUse', name: '业务使用分析'},
      ]
    },{
      key: 'life_product',
      name: '生活产品',
      icon: 'appstore',
      children: [
        {key: 'K_song', name: '百灵K歌' ,children: [
          {key: 'userAnalysis', name: '用户分析'},
        ]},
        {key: 'happy_fitness_group', name: '幸福健身团' ,children: [
          {key: 'userAnalysis', name: '用户分析'},
        ]},]

    }

  ],
  os: [],
  um: [{
    key: 'user',
    name: '用户管理',
    icon: 'appstore'
  }, {
    key: 'roleAdd',
    name: '角色新增',
    icon: 'appstore'
  }, {
    key: 'role',
    name: '角色管理',
    icon: 'appstore'
  }, {
    key: 'modifypwd',
    name: '用户信息自管理',
    icon: 'appstore'
  }
  ],
  da: [],
  hc: []
}
