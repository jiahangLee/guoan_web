/**
 * Created by 王晓普 on 2017/7/17.
 */
import * as service from '../../services/crud'
import REST_API from '../../consts/api'
import REST_USER_API from '../../consts/userApi'
import {local, session} from '../../utils/storage.js'

export default {
  namespace: 'section',
  state: {
    list: [],
    distributions: [],
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
    fetchMediaSuccess (state, {payload}) {
      return {...state, ...payload}
    },
    fetchAreaSuccess (state, {payload}) {
      return {...state, area: payload}
    },
    fetchSectionSuccess (state,{payload}){
      return {...state,section:payload}
    },
    fetchProgramSuccess (state,{payload}){
      return {...state,section:payload}
    },
    fetchChannelSuccess(state,{payload}){
      return {...state,section:payload}
    },
    fetchProgramTypeNameSuccess(state,{payload}){
      return {...state,section:payload}
    }
    ,
    clear (state) {
      return {...state, list: [], distributions: []}
    }
  },
  effects: {
    * fetch ({payload}, {call, put}) {
      const operatorId = session.get("operatorId");
      const {data: {chartData, distributionData}} = yield call(service.fetch, REST_API.STATS + payload + '&userName=' + operatorId)
      yield put({type: 'fetchSuccess', payload: {list:chartData, distributions:distributionData}})
    },
    * fetchFlow ({payload}, {call, put}) {
      const operatorId = session.get("operatorId");
      const {data: {chartData, distributionData}} = yield call(service.fetch, REST_API.FLOWSTATS + payload + '&userName=' + operatorId)
      yield put({type: 'fetchSuccess', payload: {list:chartData, distributions:distributionData}})
    },
    * fetchProgramRank ({payload}, {call, put}) {
      const operatorId = session.get("operatorId");
      const {data: {chartData, distributionData}} = yield call(service.fetch, REST_API.PROGRAMRANK + payload + '&userName=' + operatorId)
      yield put({type: 'fetchProgramRankSuccess', payload: {list:chartData, distributions:distributionData}})
    },
    *fetchGameSection ({payload},{call,put}) {
        const {data} = yield call(service.fetch,REST_API.GAMEVISIT+payload)
        yield put({type:'fetchSectionSuccess',payload: data})
    },
    * fetchMedia ({payload}, {call, put}) {
      const operatorId = session.get("operatorId");
      const {data: {chartData, distributionData}} = yield call(service.fetch, REST_API.MEDIASTATISTIC + payload + '&userName=' + operatorId)
      yield put({type: 'fetchMediaSuccess', payload: {list:chartData, distributions:distributionData}})
    },
    * fetchAdBusiness ({payload}, {call, put}) {
      const operatorId = session.get("operatorId");
      const {data: {chartData, distributionData}} = yield call(service.fetch, REST_API.ADBUSINESS + payload + '&userName=' + operatorId)
      yield put({type: 'fetchSuccess', payload: {list:chartData, distributions:distributionData}})
    },
    * fetchArea ({payload}, {call, put}) {
      const operatorId = session.get("operatorId");
      const {data} = yield call(service.fetch, REST_USER_API.AREAS + '?operatorId='+operatorId)
      yield put({type: 'fetchAreaSuccess', payload: data})
    },
    *fetchSection ({payload},{call,put}) {
      const {data} = yield call(service.fetch,REST_API.SECTION+payload)
      yield put({type:'fetchSectionSuccess',payload: data})
    },
    *fetchSection2 ({payload},{call,put}) {
      const {data} = yield call(service.fetch,REST_API.SECTION2+payload)
      yield put({type:'fetchSectionSuccess',payload: data})
    },
    *fetchProgram ({payload},{call,put}) {
      const {data} = yield call(service.fetch,REST_API.PROGRAM+payload)
      yield put({type:'fetchProgramSuccess',payload: data})
    },
    *fetchChannel ({payload},{call,put}) {
      const {data} = yield call(service.fetch,REST_API.CHANNEL+payload)
      yield put({type:'fetchChannelSuccess',payload: data})
    },
    *fetchChannelOfThree ({payload},{call,put}) {
      const {data} = yield call(service.fetch,REST_API.CHANNELOFTHREE+payload)
      yield put({type:'fetchChannelSuccess',payload: data})
    },
    *fetchChannelOfProgram ({payload},{call,put}) {
      const {data} = yield call(service.fetch,REST_API.PROGRAMSOFCHANNEL+payload)
      yield put({type:'fetchChannelSuccess',payload: data})
    },
    *fetchChannelOfProgramThree ({payload},{call,put}) {
      const {data} = yield call(service.fetch,REST_API.PROGRAMSOFCHANNELOFTHREE+payload)
      yield put({type:'fetchChannelSuccess',payload: data})
    },
    *fetchProgramTypeName({payload},{call,put}) {
      const {data} = yield call(service.fetch,REST_API.MEDIASOFOTT+payload)
      // data = [{"programtype":"动漫","programtypename":"童话"},{"programtype":"动漫","programtypename":"魔法"},{"programtype":"综艺","programtypename":"选秀"},{"programtype":"动漫","programtypename":" 偶像"},{"programtype":"动漫","programtypename":" 言情"},{"programtype":"纪录片","programtypename":" 社会"},{"programtype":"综艺","programtypename":"音乐"},{"programtype":"电视剧","programtypename":" 时代"},{"programtype":"电影","programtypename":" 犯罪"},{"programtype":"动漫","programtypename":"神魔"},{"programtype":"电视剧","programtypename":" 家庭"},{"programtype":"电视剧","programtypename":" 偶像"},{"programtype":"电影","programtypename":" 惊悚"},{"programtype":"电影","programtypename":" 科幻"},{"programtype":"电影","programtypename":"剧情"},{"programtype":"电影","programtypename":" 喜剧"},{"programtype":"电影","programtypename":" 历史"},{"programtype":"综艺","programtypename":"曲艺"},{"programtype":"电影","programtypename":"喜剧"},{"programtype":"电视剧","programtypename":" 言情"},{"programtype":"电视剧","programtypename":" 青春偶像"},{"programtype":"电视剧","programtypename":"情感"},{"programtype":"动漫","programtypename":" 时装"},{"programtype":"电视剧","programtypename":"军旅"},{"programtype":"电影","programtypename":" 战争"},{"programtype":"综艺","programtypename":"真人秀"},{"programtype":"酷玩部落","programtypename":"瑜伽"},{"programtype":"综艺","programtypename":"晚会"},{"programtype":"纪录片","programtypename":"社会"},{"programtype":"电视剧","programtypename":"都市"},{"programtype":"电视剧","programtypename":"言情"},{"programtype":"电视剧","programtypename":" 情感"},{"programtype":"电视剧","programtypename":" 其他"},{"programtype":"电视剧","programtypename":"偶像"},{"programtype":"动漫","programtypename":"校园"},{"programtype":"动漫","programtypename":"经典"},{"programtype":"综艺","programtypename":"生活"},{"programtype":"动漫","programtypename":"美少女"},{"programtype":"动漫","programtypename":"热血"},{"programtype":"电影","programtypename":" 恐怖"},{"programtype":"电影","programtypename":" 爱情"},{"programtype":"电影","programtypename":"爱情"},{"programtype":"电视剧","programtypename":"家庭"},{"programtype":"动漫","programtypename":" 推理"},{"programtype":"动漫","programtypename":" 美少女"},{"programtype":"动漫","programtypename":" 热血"},{"programtype":"动漫","programtypename":"都市"},{"programtype":"纪录片","programtypename":"历史"},{"programtype":"电视剧","programtypename":" 军旅"},{"programtype":"动漫","programtypename":" 经典"},{"programtype":"动漫","programtypename":"教育"},{"programtype":"动漫","programtypename":" 亲子"},{"programtype":"动漫","programtypename":" 益智"},{"programtype":"电影","programtypename":"动画"},{"programtype":"电影","programtypename":" 动画"},{"programtype":"电视剧","programtypename":" 时装"},{"programtype":"电视剧","programtypename":"古装"},{"programtype":"电影","programtypename":"动作"},{"programtype":"综艺","programtypename":"脱口秀"},{"programtype":"动漫","programtypename":"亲子"},{"programtype":"纪录片","programtypename":"人物"},{"programtype":"电视剧","programtypename":" 优酷出品"},{"programtype":"电视剧","programtypename":"军事"},{"programtype":"纪录片","programtypename":" 人物"},{"programtype":"动漫","programtypename":"机战"},{"programtype":"纪录片","programtypename":" 文化"},{"programtype":"电视剧","programtypename":"谍战"},{"programtype":"电影","programtypename":" 冒险"},{"programtype":"电影","programtypename":" 纪录片"},{"programtype":"动漫","programtypename":"动漫"}];
      // data = [{"programtype":"动漫","programtypename":"1"},{"programtype":"动漫","programtypename":"2"},{"programtype":"动漫","programtypename":"3"},{"programtype":"综艺","programtypename":"a"},{"programtype":"综艺","programtypename":"b"},{"programtype":"综艺","programtypename":"c"},{"programtype":"综艺","programtypename":"d"}]
      yield put({type:'fetchProgramTypeNameSuccess',payload: data})
    },
    *fetchAdType({payload},{call,put}) {
      const {data} = yield call(service.fetch,REST_API.ADTYPE+payload)
      yield put({type:'fetchSectionSuccess',payload: data})
    },
    *fetchAdTypeThree({payload},{call,put}) {
      const {data} = yield call(service.fetch,REST_API.ADTYPETHREE+payload)
      yield put({type:'fetchSectionSuccess',payload: data})
    },
    *fetchAppConfig ({payload},{call,put}) {
      const {data} = yield call(service.fetch,REST_API.APPCONFIG+payload)
      yield put({type:'fetchSectionSuccess',payload: data})
    },
    *fetchEcomScan ({payload},{call,put}) {
      const {data} = yield call(service.fetch,REST_API.ECOMCONFIG+payload)
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

