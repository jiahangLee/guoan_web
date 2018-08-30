import * as service from '../../services/crud'
import REST_API from '../../consts/api'
import REST_USER_API from '../../consts/userApi'
import {local, session} from '../../utils/storage.js'

export default {
  namespace: 'common',
  state: {
    list: [],
    flowTrendData :[],
    distributions: [{value:335, name:'直接访问'},
      {value:310, name:'邮件营销'},
      {value:234, name:'联盟广告'},
      {value:135, name:'视频广告'},
      {value:1548, name:'搜索引擎'}],
    area: [],
    section:[]
  },
  reducers: {
    fetchSuccess (state, {payload}) {
      return {...state, ...payload}
    },
    fetchProgramRankSuccess (state, {payload}) {
      return {...state, ...payload}
    },
    fetchAreaSuccess (state, {payload}) {
      return {...state, area: payload}
    },
    fetchSectionSuccess (state, {payload}){
      return {...state, section: payload}
    },
    fetchProgramSuccess (state, {payload}){
      return {...state, section: payload}
    },
    fetchChannelGroupSuccess(state, {payload}){
      return {...state, section: payload}
    },
    fetchChannelGroupRendSuccess(state, {payload}){
      return {...state, ...payload}
    },
    clear (state) {
      return {...state, list: [], distributions: []}
    },
    clear1 (state) {
      return {...state,area: []}
    }
  },
  effects: {
    * fetchFlowTrend ({payload}, {call, put}) {
      const operatorId = session.get("operatorId");
      const {data: {chartData, distributionData}} = yield call(service.fetch, REST_API.FLOWTREND + payload + '&userName=' + operatorId)
      yield put({type: 'fetchSuccess', payload: {flowTrendData: chartData, distributions: distributionData}})
    },
    * flowTrendMinute ({payload}, {call, put}) {
      const {data: {chartData, distributionData}} = yield call(service.fetch, REST_API.FLOWTRENDMINUTE + payload)
      yield put({type: 'fetchSuccess', payload: {flowTrendData: chartData, distributions: distributionData}})
    },
    * fetch ({payload}, {call, put}) {
      const operatorId = session.get("operatorId");
      const {data: {chartData, distributionData}} = yield call(service.fetch, REST_API.STATS + payload + '&userName=' + operatorId)
      yield put({type: 'fetchSuccess', payload: {list: chartData, distributions: distributionData}})
    },
    * fetchUserRadio ({payload}, {call, put}) {
      const operatorId = session.get("operatorId");
      const {data: {chartData, distributionData}} = yield call(service.fetch, REST_API.USERRADIO + payload + '&userName=' + operatorId)
      yield put({type: 'fetchSuccess', payload: {list: chartData, distributions: distributionData}})
    },
    * fetchProgramRank ({payload}, {call, put}) {
      const operatorId = session.get("operatorId");
      const {data: {chartData, distributionData}} = yield call(service.fetch, REST_API.PROGRAMRANK + payload + '&userName=' + operatorId)
      yield put({type: 'fetchProgramRankSuccess', payload: {list: chartData, distributions: distributionData}})

    },
    * fetchThreeRank ({payload}, {call, put}) {
      const operatorId = session.get("operatorId");
      const {data: {chartData, distributionData}} = yield call(service.fetch, REST_API.THREERANK + payload + '&userName=' + operatorId)
      yield put({type: 'fetchSuccess', payload: {list: chartData, distributions: distributionData}})

    },
    * fetchChannelGroup ({payload}, {call, put}) {
      const {data} = yield call(service.fetch, REST_API.CHANNELGROUP)
      yield put({type: 'fetchChannelGroupSuccess', payload: data})
    },
    *fetchChannelGroupRend({payload}, {call, put}) {
      const {data:{chartData}} = yield call(service.fetch, REST_API.CHANNELGROUPRANK + payload)
      yield put({type: 'fetchChannelGroupRendSuccess', payload: {list: chartData}})
    },
    * fetchArea ({payload}, {call, put}) {
      const operatorId = session.get("operatorId");
      const {data} = yield call(service.fetch, REST_USER_API.AREAS + '?operatorId=' + operatorId)
      //const datas = JSON.parse('[{"id":"0","label":"全国","name":"china","parent_id":"-1","type":"china"},{"id":"0101","label":"长沙国安","name":"cs_ga","parent_id":"100","type":"project"},{"id":"0301","label":"孝感国安","name":"xg_ga","parent_id":"300","type":"project"},{"id":"0302","label":"黄冈国安","name":"hg_ga","parent_id":"310","type":"project"},{"id":"0303","label":"恩施国安","name":"es_ga","parent_id":"320","type":"project"},{"id":"0304","label":"黄石国安","name":"hs_ga","parent_id":"330","type":"project"},{"id":"0305","label":"咸宁国安","name":"xn_ga","parent_id":"340","type":"project"},{"id":"100","label":"长沙","name":"changsha","parent_id":"1010","type":"region"},{"id":"1010","label":"湖南","name":"hunan","parent_id":"0","type":"province"},{"id":"1030","label":"湖北","name":"hubei","parent_id":"0","type":"province"},{"id":"300","label":"孝感","name":"xiaogan","parent_id":"1030","type":"region"},{"id":"310","label":"黄冈","name":"huanggang","parent_id":"1030","type":"region"},{"id":"320","label":"恩施","name":"enshi","parent_id":"1030","type":"region"},{"id":"330","label":"黄石","name":"huangshi","parent_id":"1030","type":"region"},{"id":"340","label":"咸宁","name":"xianning","parent_id":"1030","type":"region"}]');
      yield put({type: 'fetchAreaSuccess', payload: data})
    },
    *fetchSection ({payload}, {call, put}) {
      const {data} = yield call(service.fetch, REST_API.SECTION + payload)
      yield put({type: 'fetchSectionSuccess', payload: data})
    },
    *fetchSection2 ({payload},{call,put}) {
      const {data} = yield call(service.fetch,REST_API.SECTION2+payload)
      yield put({type:'fetchSectionSuccess',payload: data})
    },
    *fetchGameSection ({payload},{call,put}) {
        const {data} = yield call(service.fetch,REST_API.GAMEVISIT+payload)
        yield put({type:'fetchSectionSuccess',payload: data})
    },
    *fetchProgram ({payload}, {call, put}) {
      const {data} = yield call(service.fetch, REST_API.PROGRAM + payload)
      yield put({type: 'fetchProgramSuccess', payload: data})
    },
    * fetchRetention ({payload}, {call, put}) {
      const operatorId = session.get("operatorId");
      const {data: {chartData, distributionData}} = yield call(service.fetch, REST_API.RETENTION + payload+ '&userName=' + operatorId)
      yield put({type: 'fetchSuccess', payload: {list: chartData, distributions: distributionData}})
    },
    *fetchAppConfig ({payload},{call,put}) {
      const {data} = yield call(service.fetch,REST_API.APPCONFIG+payload)
      yield put({type:'fetchSectionSuccess',payload: data})
    },
    *fetchChannel ({payload},{call,put}) {
      const {data} = yield call(service.fetch,REST_API.CHANNEL+payload)
      yield put({type:'fetchSectionSuccess',payload: data})
    },
    *fetchSingle ({payload},{call,put}) {
      const {data} = yield call(service.fetch,REST_API.GAMEVISIT+payload)
      yield put({type:'fetchSectionSuccess',payload: data})
    },

  },

  subscriptions: {
    setup ({dispatch, history}) {
      dispatch({type: 'fetchArea'})


      // 在这里侦听，如果路由变换，则把数据清空，因为其他模块都用这个数据，不清的话会造成重影
      return history.listen(({pathname, query}) => {
        if (pathname.indexOf('ia') > -1) {
          dispatch({type: 'clear'})
        }
        if (pathname.indexOf('ia') > -1) {
          dispatch({type: 'fetchArea'})
        }
      })
    }
  }
}
