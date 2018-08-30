import React from 'react'
import { Router } from 'dva/router'
import App from './routes/App'
import {local, session} from './utils/storage.js'

const cached = {}
const registerModel = (app, model) => {
  if (!cached[model.namespace]) {
    app.model(model)
    cached[model.namespace] = 1
  }
}

const genRoute = (app, name, model, component) => {
  return {
    path: name,
    name,
    getComponent (nextState, cb) {
      require.ensure([], require => {
        registerModel(app, model)
        cb(null, component)
      })
    }
  }
}

export default function ({ history, app }) {
  const routes = [{
    path: '/',
    component: App,
    getIndexRoute (nextState, cb) {
      require.ensure([], require => {
        registerModel(app, require('./models/home'))
        cb(null, {component: require('./routes/home')})
      })
    },
    childRoutes: [
      genRoute(app, 'home', require('./models/home'), require('./routes/home')),

      // -----------------------------洞察分析------------------------------
      // --------电视概况
      genRoute(app, '/ia/overview/userCover', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/overview/UserCover')),
      genRoute(app, '/ia/overview/userDevelop', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/overview/UserDevelop')),
      genRoute(app, '/ia/overview/userActive', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/overview/UserActive')),
      genRoute(app, '/ia/overview/userUse', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/overview/UserUse')),
      genRoute(app, '/ia/overview/flowTrend', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/overview/FlowTrend')),
      genRoute(app, '/ia/overview/userActiveThree', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/overview/UserActiveThree')),
      genRoute(app, '/ia/overview/userRadio', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/overview/UserRadio')),


      // --------全业务
      genRoute(app, '/ia/allbu/userCount', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/allbu/UserCount')),
      genRoute(app, '/ia/allbu/useDays', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/allbu/UseDays')),
      genRoute(app, '/ia/allbu/userTimeInUse', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/allbu/UserTimeInUse')),
      genRoute(app, '/ia/allbu/useTimes', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/allbu/UseTimes')),

      genRoute(app, '/ia/allbu/userCountThree', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/allbu/UserCountThree')),

      // --------直播业务
      // 用户分析
      genRoute(app, '/ia/dvb/userAnalysis', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/dvb/UserAnalysis')),
      genRoute(app, '/ia/dvb/businessUse', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/dvb/BusinessUse')),
      genRoute(app, '/ia/dvb/channelGroupAnalysis', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/dvb/ChannelGroupAnalysis')),
      genRoute(app, '/ia/dvb/channelRanking', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/dvb/ChannelRanking')),
      genRoute(app, '/ia/dvb/channelAnalysis', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/dvb/ChannelAnalysis')),
      genRoute(app, '/ia/dvb/businessFlowTrend', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/dvb/BusinessFlowTrend')),
      genRoute(app, '/ia/dvb/programAnalysis', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/dvb/ProgramAnalysis')),

      genRoute(app, '/ia/dvb/businessUseThree', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/dvb/BusinessUseThree')),
      genRoute(app, '/ia/dvb/channelAnalysisThree', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/dvb/ChannelAnalysisThree')),
      genRoute(app, '/ia/dvb/programAnalysisThree', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/dvb/ProgramAnalysisThree')),
      genRoute(app, '/ia/dvb/userAnalysisThree', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/dvb/UserAnalysisThree')),

      genRoute(app, '/ia/dvb/userRadio', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/dvb/UserRadio')),
      genRoute(app, '/ia/dvb/channelRadio', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/dvb/ChannelRadio')),

      genRoute(app, '/ia/dvb/channelRankingThree', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/dvb/ChannelRankingThree')),

      genRoute(app, '/ia/dvb/userAnalysisThreeZJ', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/dvb/UserAnalysisThreeZJ')),
      genRoute(app, '/ia/dvb/businessUseThreeZJ', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/dvb/BusinessUseThreeZJ')),
      genRoute(app, '/ia/dvb/channelAnalysisThreeZJ', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/dvb/ChannelAnalysisThreeZJ')),



      // --------回看业务
      genRoute(app, '/ia/replay/userAnalysis', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/replay/UserAnalysis')),
      genRoute(app, '/ia/replay/businessUse', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/replay/BusinessUse')),
      genRoute(app, '/ia/replay/channelGroupAnalysis', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/replay/ChannelGroupAnalysis')),
      genRoute(app, '/ia/replay/channelRanking', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/replay/ChannelRanking')),
      genRoute(app, '/ia/replay/channelAnalysis', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/replay/ChannelAnalysis')),
      genRoute(app, '/ia/replay/businessFlowTrend', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/replay/BusinessFlowTrend')),

      genRoute(app, '/ia/replay/userAnalysisThree', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/replay/UserAnalysisThree')),
      genRoute(app, '/ia/replay/businessUseThree', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/replay/BusinessUseThree')),
      genRoute(app, '/ia/replay/channelAnalysisThree', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/replay/ChannelAnalysisThree')),

      genRoute(app, '/ia/replay/channelRankingThree', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/replay/ChannelRankingThree')),

      genRoute(app, '/ia/replay/programAnalysisThree', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/replay/ProgramAnalysisThree')),

      genRoute(app, '/ia/replay/userAnalysisThreeZJ', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/replay/UserAnalysisThreeZJ')),
      genRoute(app, '/ia/replay/businessUseThreeZJ', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/replay/BusinessUseThreeZJ')),
      genRoute(app, '/ia/replay/channelAnalysisThreeZJ', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/replay/ChannelAnalysisThreeZJ')),



      // --------时移业务
      genRoute(app, '/ia/ts/userAnalysis', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/ts/UserAnalysis')),
      genRoute(app, '/ia/ts/businessUse', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/ts/BusinessUse')),
      genRoute(app, '/ia/ts/channelGroupAnalysis', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/ts/ChannelGroupAnalysis')),
      genRoute(app, '/ia/ts/channelRanking', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/ts/ChannelRanking')),
      genRoute(app, '/ia/ts/channelAnalysis', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/ts/ChannelAnalysis')),
      genRoute(app, '/ia/ts/businessFlowTrend', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/ts/BusinessFlowTrend')),
      // --------VOD点播
      genRoute(app, '/ia/vod/userAnalysis', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/vod/UserAnalysis')),
      genRoute(app, '/ia/vod/businessUse', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/vod/BusinessUse')),
      genRoute(app, '/ia/vod/sectionAnalysis', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/vod/SectionAnalysis')),
      genRoute(app, '/ia/vod/programAnalysis', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/vod/ProgramAnalysis')),
      genRoute(app, '/ia/vod/programRank', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/vod/ProgramRank')),
      genRoute(app, '/ia/vod/businessFlowTrendProgram', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/vod/BusinessFlowTrendProgram')),
      genRoute(app, '/ia/vod/businessFlowTrendSection', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/vod/BusinessFlowTrendSection')),

      genRoute(app, '/ia/vod/userAnalysisThree', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/vod/UserAnalysisThree')),
      genRoute(app, '/ia/vod/businessUseThree', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/vod/BusinessUseThree')),
      genRoute(app, '/ia/vod/programAnalysisThree', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/vod/ProgramAnalysisThree')),

      genRoute(app, '/ia/vod/programRankThree', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/vod/ProgramRankThree')),

      genRoute(app, '/ia/vod/seriesAnalysisThree', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/vod/SeriesAnalysisThree')),
      genRoute(app, '/ia/vod/seriesRankingThree', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/vod/SeriesRankingThree')),
      genRoute(app, '/ia/vod/sectionAnalysisThree', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/vod/SectionAnalysisThree')),

      genRoute(app, '/ia/vod/userAnalysisThreeZJ', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/vod/UserAnalysisThreeZJ')),
      genRoute(app, '/ia/vod/businessUseThreeZJ', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/vod/BusinessUseThreeZJ')),
      genRoute(app, '/ia/vod/programAnalysisThreeZJ', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/vod/ProgramAnalysisThreeZJ')),
      genRoute(app, '/ia/vod/seriesAnalysisThreeZJ', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/vod/SeriesAnalysisThreeZJ')),




      // --------OTT点播
      genRoute(app, '/ia/ott/userAnalysis', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/ott/UserAnalysis')),
      genRoute(app, '/ia/ott/businessUse', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/ott/BusinessUse')),
      genRoute(app, '/ia/ott/sectionAnalysis', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/ott/SectionAnalysis')),
      genRoute(app, '/ia/ott/sectionAnalysis2', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/ott/SectionAnalysis2')),
      genRoute(app, '/ia/ott/programAnalysis', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/ott/ProgramAnalysis')),
      genRoute(app, '/ia/ott/programRank', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/ott/ProgramRank')),
      genRoute(app, '/ia/ott/businessFlowTrendProgram', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/ott/BusinessFlowTrendProgram')),
      genRoute(app, '/ia/ott/businessFlowTrendSection', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/ott/BusinessFlowTrendSection')),
      genRoute(app, '/ia/ott/userRadio', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/ott/UserRadio')),
      // --------教育
      genRoute(app, '/ia/education/userAnalysis', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/edu/UserAnalysis')),
      genRoute(app, '/ia/education/businessUse', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/edu/BusinessUse')),
      genRoute(app, '/ia/education/sectionAnalysis', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/edu/SectionAnalysis')),
      genRoute(app, '/ia/education/sectionAnalysisRank', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/edu/SectionAnalysisRank')),
      genRoute(app, '/ia/education/section2Analysis', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/edu/Section2Analysis')),
      genRoute(app, '/ia/education/programAnalysis', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/edu/ProgramAnalysis')),
      genRoute(app, '/ia/education/programRank', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/edu/ProgramRank')),
      genRoute(app, '/ia/education/businessFlowTrendProgram', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/edu/BusinessFlowTrendProgram')),
      genRoute(app, '/ia/education/businessFlowTrendSection', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/edu/BusinessFlowTrendSection')),
      genRoute(app, '/ia/education/businessFlowTrendSection2', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/edu/BusinessFlowTrendSection2')),
      genRoute(app, '/ia/education/userRetentionRateAnalysis', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/edu/UserRetentionRateAnalysis')),
      genRoute(app, '/ia/education/userRetentionRateSNAnalysis', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/edu/UserRetentionRateSNAnalysis')),
      genRoute(app, '/ia/education/userRetentionRateCLAnalysis', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/edu/UserRetentionRateCLAnalysis')),
      genRoute(app, '/ia/education/userRetentionRateAreaAnalysis', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/edu/UserRetentionRateAreaAnalysis')),
      genRoute(app, '/ia/education/userRadio', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/edu/UserRadio')),
      genRoute(app, '/ia/education/apkUserRadio', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/edu/ApkUserRadio')),
      genRoute(app, '/ia/education/areaUserRadio', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/edu/AreaUserRadio')),


      // --------应用商店
      genRoute(app, '/ia/appstore/userAnalysis', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/appstore/UserAnalysis')),
      genRoute(app, '/ia/appstore/businessUse', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/appstore/BusinessUse')),
      genRoute(app, '/ia/appstore/userRetentionRateAnalysis', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/appstore/UserRetentionRateAnalysis')),
      genRoute(app, '/ia/appstore/businessFlowTrendAPP', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/appstore/BusinessFlowTrendAPP')),
      genRoute(app, '/ia/appstore/businessFlowTrendType1', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/appstore/BusinessFlowTrendType1')),
      genRoute(app, '/ia/appstore/businessFlowTrendType2', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/appstore/BusinessFlowTrendType2')),
      genRoute(app, '/ia/appstore/businessAppUse', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/appstore/BusinessAppUse')),
      genRoute(app, '/ia/appstore/businessAppAnalysis', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/appstore/BusinessAppAnalysis')),
      genRoute(app, '/ia/appstore/businessAppType1Analysis', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/appstore/BusinessAppType1Analysis')),
      genRoute(app, '/ia/appstore/businessAppType2Analysis', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/appstore/BusinessAppType2Analysis')),
      genRoute(app, '/ia/appstore/userRadio', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/appstore/UserRadio')),
      // --------智慧社区
      genRoute(app, '/ia/in_community/userAnalysis', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/in_community/UserAnalysis')),
      genRoute(app, '/ia/in_community/businessUse', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/in_community/BusinessUse')),
      genRoute(app, '/ia/in_community/userRetentionRateAnalysis', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/in_community/UserRetentionRateAnalysis')),

      // --------游戏大厅
      genRoute(app, '/ia/game_visit/userAnalysis', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/game_visit/UserAnalysis')),
      genRoute(app, '/ia/game_visit/businessUse', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/game_visit/BusinessUse')),
      genRoute(app, '/ia/game_visit/userRadio', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/game_visit/UserRadio')),
      genRoute(app, '/ia/game_visit/singleUserRadio', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/game_visit/SingleUserRadio')),
      //
      // --------游戏
      genRoute(app, '/ia/game_visit/businessGameUseAnalysis', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/game_visit/BusinessGameUseAnalysis')),
      genRoute(app, '/ia/game_visit/businessGameAnalysis', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/game_visit/BusinessGameAnalysis')),
      genRoute(app, '/ia/game_visit/businessGameType1Analysis', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/game_visit/BusinessGameType1Analysis')),
      genRoute(app, '/ia/game_visit/businessGameType2Analysis', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/game_visit/BusinessGameType2Analysis')),
      genRoute(app, '/ia/game_visit/userRetentionRateAnalysis', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/game_visit/UserRetentionRateAnalysis')),
      genRoute(app, '/ia/game_visit/userRetentionRateSingleAnalysis', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/game_visit/UserRetentionRateSingleAnalysis')),
      genRoute(app, '/ia/game_visit/userRetentionRateType1Analysis', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/game_visit/UserRetentionRateType1Analysis')),
      genRoute(app, '/ia/game_visit/userRetentionRateType2Analysis', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/game_visit/UserRetentionRateType2Analysis')),

      //---电商平台
      genRoute(app, '/ia/ecommerce/userAnalysis', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/ecommerce/UserAnalysis')),
      genRoute(app, '/ia/ecommerce/businessEcomUse', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/ecommerce/BusinessEcomUse')),

        // --------用户画像
      genRoute(app, '/os/personas/personasIndiv', require('./models/operationSupport/personas'), require('./routes/operationSupport/personas/PersonasIndiv')),
      genRoute(app, '/os/personas/personasGroup', require('./models/operationSupport/personas'), require('./routes/operationSupport/personas/PersonasGroup')),

      // --------标签库
      genRoute(app, '/os/tagLibrary/personas', require('./models/operationSupport/personas'), require('./routes/operationSupport/tagLibrary/Personas')),
      // --------生活产品
      genRoute(app, '/ia/life_product/K_song/userAnalysis', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/life_product/UserAnalysis')),
      genRoute(app, '/ia/life_product/happy_fitness_group/userAnalysis', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/happy_fitness_group/UserAnalysis')),
      genRoute(app, '/ia/life_product/K_song/userRetentionRateAnalysis', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/life_product/UserRetentionRateAnalysis')),
      genRoute(app, '/ia/life_product/happy_fitness_group/userRetentionRateAnalysis', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/happy_fitness_group/UserRetentionRateAnalysis')),
      genRoute(app, '/ia/life_product/K_song/userUseAnalysis', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/life_product/UserUseAnalysis')),
      genRoute(app, '/ia/life_product/happy_fitness_group/userUseAnalysis', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/happy_fitness_group/UserUseAnalysis')),
      // --------媒资分析
      genRoute(app, '/ia/mediaAssets/provStockAnalysis', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/mediaAssets/ProvStockAnalysis')),
      genRoute(app, '/ia/mediaAssets/provIncrementAnalysis', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/mediaAssets/ProvIncrementAnalysis')),
      // --------广告分析
      genRoute(app, '/ia/advertisement/adBusinessAnalysis', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/advertisement/AdBusinessAnalysis')),
      genRoute(app, '/ia/advertisement/adBusinessAnalysisRanking', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/advertisement/AdBusinessAnalysisRanking')),

      genRoute(app, '/ia/advertisement/adBusinessAnalysisThree', require('./models/insightAnalysis/section'), require('./routes/insightAnalysis/advertisement/AdBusinessAnalysisThree')),

      // -----------------------------运营支撑------------------------------
      // -----------------------------用户管理------------------------------
      genRoute(app, '/um/user', require('./models/userManage/common'), require('./routes/userManage/user')),
      genRoute(app, '/um/roleAdd', require('./models/userManage/common'), require('./routes/userManage/RoleAdd')),
      genRoute(app, '/um/role', require('./models/userManage/common'), require('./routes/userManage/role')),
      genRoute(app, '/um/modifypwd', require('./models/userManage/common'), require('./routes/userManage/modifypwd')),

      // -----------------------------数据资产------------------------------
      genRoute(app, '/da/userCover', require('./models/dataAssets/dataAssets'), require('./routes/dataAssets/UserCover')),
      genRoute(app, '/da/stockData', require('./models/dataAssets/dataAssets'), require('./routes/dataAssets/StockData')),
      genRoute(app, '/da/productUse', require('./models/dataAssets/dataAssets'), require('./routes/dataAssets/ProductUse')),
      genRoute(app, '/da/userUsedLog', require('./models/dataAssets/dataAssets'), require('./routes/dataAssets/UserUsedLog')),


      // -----------------------------帮助中心------------------------------

      genRoute(app,'/hc/businessIntroduction',require('./models/helpCenter/helpCenter'), require('./routes/helpCenter/businessIntroduction')),
      genRoute(app,'/hc/helpRetrieval',require('./models/helpCenter/helpCenter'), require('./routes/helpCenter/helpRetrieval')),
      genRoute(app,'/hc/problemHanding',require('./models/helpCenter/helpCenter'), require('./routes/helpCenter/problemHanding')),
      genRoute(app,'/hc/proposal',require('./models/helpCenter/helpCenter'), require('./routes/helpCenter/proposal')),
      genRoute(app,'/hc/proposalList',require('./models/helpCenter/helpCenter'), require('./routes/helpCenter/proposalList')),
      // -----------------------------数据报告------------------------------
      genRoute(app,'/report/dataReport',require('./models/dataReport/dataReport'), require('./routes/report/DataReport')),
      genRoute(app,'/report/dataReportQuery',require('./models/dataReport/dataReport'), require('./routes/report/DataReportQuery')),



      // 404
      {
        path: '/404',
        name: 'error',
        getComponent  (nextState, cb) {
          require.ensure([], require => {
            cb(null, require('./components/wip/WIP'))
          })
        }
      }
    ]
    ,
    onEnter(nextState, replace) {
      // 可以验证是否登录
      console.info("%c nextState >>>", "color:orange", nextState)
      if (!session.get('isLogin')) {
        replace('/login')
      }
    }
  }
    ,{
      path: '/login',
      name: 'login',
      getComponent  (nextState, cb) {
        require.ensure([], require => {
          cb(null, require('./login/Login'))
        })
      }
    }
    ,
    {
      path: '*',
      name: 'error',
      onEnter(nextState, replace) {
        // 可以验证是否登录
        console.info("%c nextState >>>", "color:orange", nextState)
        if (!session.get('isLogin')) {
          replace('/login')
        }else{
          replace('/404');
        }
      }
    }]

  return <Router history={history} routes={routes} />
}






