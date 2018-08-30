import * as service from '../../services/crud'
import REST_API from '../../consts/api'
import REST_USER_API from '../../consts/userApi'
import {local, session} from '../../utils/storage.js'

export default {
  namespace: 'personas',
  state: {
    contentValueLevel: [],//群体画像-价值类-等级
    contentValueAllBusinessSort: [],//群体画像-价值类-总业务付费产品排行
    // contentValueChildBusinessSort: [],//群体画像-价值类-分业务付费产品排行
    contentValueLevelValueArea: [],//群体画像-价值类-区域分布
    contentValueTrend: [],//群体画像-价值类-付费用户趋势
    contentValueBusinessPreference: [],//群体画像-价值类-业务偏好
    contentValueJudge: [],//群体画像-价值类-人员判定
    contentValueTagsCluster: [],//群体画像-价值类-用户标签分群
    contentValuePreferenceCluster: [],//群体画像-价值类-价值偏好
    contentViscosityOverview: [],//群体画像-粘性类-概况
    contentViscosityOverviewLoss: [],//群体画像-粘性类-概况-流失
    contentViscosityAllBusinessSort: [],//群体画像-粘性类-总业务排行
    // contentViscosityChildBusinessSort: [],//群体画像-粘性类-分业务排行
    contentViscosityArea: [],//群体画像-粘性类-区域分布
    contentViscosityTrend: [],//群体画像-粘性类-用户趋势
    contentViscosityJudge: [],//群体画像-粘性类-人员判定
    contentViscosityTagsCluster: [],//群体画像-粘性类-标签分群
    contentViscosityPreferenceCluster: [],//群体画像-粘性类-价值偏好
    preferenceCluster:[],
    objectiveMarkerTagsOtt:[],
    area: [],
    portraitBusinessTop:[],//个人画像: 业务使用排行
    portraitInfo:[],//个人画像: 用户信息
    portraitTagsCluster:[],//个人画像: 用户非客观标签,用户偏好
    portraitTagsOtt:[],//个人画像：点播收藏
    portraitJudge:[],//个人画像：家庭成员判断
    tagsNonobjective :[], //标签类: 非客观标签
    tagsObjective:[] //标签类: 客观标签
  },
  reducers: {
    fetchSuccess (state, {payload}) {
      return {...state, ...payload}
    },
    fetchAreaSuccess (state, {payload}) {
      return {...state, area: payload}
    },
  },
  effects: {
    //群体画像-价值类-等级
    * fetchValueLevel ({payload }, {call, put}) {
      const {data} = yield call(service.create, {api: REST_API.ValueLevel, values: payload})
      yield put({
        type: 'fetchSuccess',
        payload: {
          contentValueLevel: data.result == null ? [] : data.result.content
        }
      })
    },
    //群体画像-价值类-总业务付费产品排行
    * fetchValueAllBusinessSort ({payload }, {call, put}) {
      const {data} = yield call(service.create, {api: REST_API.ValueAllBusinessSort, values: payload})
      yield put({
        type: 'fetchSuccess',
        payload: {
          contentValueAllBusinessSort: data.result == null ? [] : data.result.content
        }
      })
    },
    // //群体画像-价值类-分业务付费产品排行
    // * fetchValueChildBusinessSort ({payload }, {call, put}) {
    //   const {data} = yield call(service.create, {api: REST_API.ValueChildBusinessSort, values: payload})
    //   yield put({
    //     type: 'fetchSuccess',
    //     payload: {
    //       contentValueChildBusinessSort: data.result == null ? [] : data.result.content
    //     }
    //   })
    // },
    //群体画像-价值类-区域分布
    * fetchValueArea ({payload }, {call, put}) {
      const {data} = yield call(service.create, {api: REST_API.ValueLevelValueArea, values: payload})
      yield put({
        type: 'fetchSuccess',
        payload: {
          contentValueArea: data.result == null ? [] : data.result.content,
        }
      })
    },
    //群体画像-价值类-付费用户趋势
    * fetchValueTrend ({payload }, {call, put}) {
      const {data} = yield call(service.create, {api: REST_API.ValueTrend, values: payload})
      yield put({
        type: 'fetchSuccess',
        payload: {
          contentValueTrend: data.result == null ? [] : data.result.content,
        }
      })
    },
    //群体画像-价值类-业务偏好
    * fetchValueBusinessPreference ({payload }, {call, put}) {
      const {data} = yield call(service.create, {api: REST_API.ValueBusinessPreference, values: payload})
      yield put({
        type: 'fetchSuccess',
        payload: {
          contentValueBusinessPreference: data.result == null ? [] : data.result.content,
        }
      })
    },
    //群体画像-价值类-人员判定
    * fetchValueJudge ({payload }, {call, put}) {
      const {data} = yield call(service.create, {api: REST_API.ValueJudge, values: payload})
      yield put({
        type: 'fetchSuccess',
        payload: {
          contentValueJudge: data.result == null ? [] : data.result.content,
        }
      })
    },
    //群体画像-价值类-用户标签分群
    * fetchValueTagsCluster ({payload }, {call, put}) {
      const {data} = yield call(service.create, {api: REST_API.ValueTagsCluster, values: payload})
      yield put({
        type: 'fetchSuccess',
        payload: {
          contentValueTagsCluster: data.result == null ? [] : data.result.content,
        }
      })
    },
    //群体画像-价值类-价值偏好
    * fetchValuePreferenceCluster ({payload }, {call, put}) {
      const {data} = yield call(service.create, {api: REST_API.ValuePreferenceCluster, values: payload})
      yield put({
        type: 'fetchSuccess',
        payload: {
          contentValuePreferenceCluster: data.result == null ? [] : data.result.content,
        }
      })
    },
    //群体画像-粘性类-概况
    * fetchViscosityOverview ({payload }, {call, put}) {
      const {data} = yield call(service.create, {api: REST_API.ViscosityOverview, values: payload})
      yield put({
        type: 'fetchSuccess',
        payload: {
          contentViscosityOverview: data.result == null ? [] : data.result.content,
        }
      })
    },
    //群体画像-粘性类-概况
    * fetchViscosityOverviewLoss ({payload }, {call, put}) {
      const {data} = yield call(service.create, {api: REST_API.ViscosityOverviewLoss, values: payload})
      yield put({
        type: 'fetchSuccess',
        payload: {
          contentViscosityOverviewLoss: data.result == null ? [] : data.result.content,
        }
      })
    },
    //群体画像-粘性类-总业务排行
    * fetchViscosityAllBusinessSort ({payload }, {call, put}) {
      const {data} = yield call(service.create, {api: REST_API.ViscosityAllBusinessSort, values: payload})
      yield put({
        type: 'fetchSuccess',
        payload: {
          contentViscosityAllBusinessSort: data.result == null ? [] : data.result.content,
        }
      })
    },
    // //群体画像-粘性类-分业务排行
    // * fetchViscosityChildBusinessSort ({payload }, {call, put}) {
    //   const {data} = yield call(service.create, {api: REST_API.ViscosityChildBusinessSort, values: payload})
    //   yield put({
    //     type: 'fetchSuccess',
    //     payload: {
    //       contentViscosityChildBusinessSort: data.result == null ? [] : data.result.content,
    //     }
    //   })
    // },
    //群体画像-粘性类-区域分布
    * fetchViscosityArea ({payload }, {call, put}) {
      const {data} = yield call(service.create, {api: REST_API.ViscosityArea, values: payload})
      yield put({
        type: 'fetchSuccess',
        payload: {
          contentViscosityArea: data.result == null ? [] : data.result.content,
        }
      })
    },
    //群体画像-粘性类-用户趋势
    * fetchViscosityTrend ({payload }, {call, put}) {
      const {data} = yield call(service.create, {api: REST_API.ViscosityTrend, values: payload})
      yield put({
        type: 'fetchSuccess',
        payload: {
          contentViscosityTrend: data.result == null ? [] : data.result.content,
        }
      })
    },
    //群体画像-粘性类-人员判定
    * fetchViscosityJudge ({payload }, {call, put}) {
      const {data} = yield call(service.create, {api: REST_API.ViscosityJudge, values: payload})
      yield put({
        type: 'fetchSuccess',
        payload: {
          contentViscosityJudge: data.result == null ? [] : data.result.content,
        }
      })
    },
    //群体画像-粘性类-标签分群
    * fetchViscosityTagsCluster ({payload }, {call, put}) {
      const {data} = yield call(service.create, {api: REST_API.ViscosityTagsCluster, values: payload})
      yield put({
        type: 'fetchSuccess',
        payload: {
          contentViscosityTagsCluster: data.result == null ? [] : data.result.content,
        }
      })
    },
    //群体画像-粘性类-价值偏好
    * fetchViscosityPreferenceCluster ({payload }, {call, put}) {
      const {data} = yield call(service.create, {api: REST_API.ViscosityPreferenceCluster, values: payload})
      yield put({
        type: 'fetchSuccess',
        payload: {
          contentViscosityPreferenceCluster: data.result == null ? [] : data.result.content,
        }
      })
    },
    //群体画像 -- 业务群体
    * fetchPreferenceCluster ({payload }, {call, put}) {
      const {data} = yield call(service.create, {api: REST_API.PreferenceCluster, values: payload})
      yield put({
        type: 'fetchSuccess',
        payload: {
          preferenceCluster: data.result == null ? [] : data.result.content,
        }
      })
    },
    //群体画像 -- 业务群体 详情
    * fetchObjectiveMarkerTagsOtt ({payload }, {call, put}) {
      const {data} = yield call(service.create, {api: REST_API.ObjectiveMarkerTagsOtt, values: payload})
      yield put({
        type: 'fetchSuccess',
        payload: {
          objectiveMarkerTagsOtt: data.result == null ? [] : data.result.content,
        }
      })
    },
    //个人画像: 业务使用排行
    * fetchPortraitBusinessTop ({payload }, {call, put}) {
      const {data} = yield call(service.create, {api: REST_API.portraitBusinessTop,values: payload})
      yield put({type: 'fetchSuccess', payload: {portraitBusinessTop: data.result == null ? [] : data.result.content}})
    },
    //个人画像: 用户信息
    * fetchPortraitInfo ({payload }, {call, put}) {
      const {data} = yield call(service.create, { api:REST_API.portraitInfo, values: payload})
      yield put({type: 'fetchSuccess', payload: {portraitInfo: data.result == null ? [] : data.result.content}})
    },
    //个人画像: 用户非客观标签,用户偏好
    * fetchPortraitTagsCluster ({payload }, {call, put}) {
      var api = 'http://10.10.100.37:8080/portrait/portraitTagsCluster';
      const {data} = yield call(service.create, { api:REST_API.portraitTagsCluster, values: payload})
      yield put({type: 'fetchSuccess', payload: {portraitTagsCluster: data.result == null ? [] : data.result.content}})
    },
    //个人画像 点播收藏
    *fetchPortraitTagsOtt({payload }, {call, put}) {
      var api = 'http://10.10.100.37:8080/portrait/portraitTagsOtt';
      const {data} = yield call(service.create, { api:REST_API.portraitTagsOtt, values: payload})
      yield put({type: 'fetchSuccess', payload: {portraitTagsOtt: data.result == null ? [] : data.result.content}})
    },
    //个人画像 家庭成员判断
    *fetchPortraitJudge({payload }, {call, put}) {
      var api = 'http://10.10.100.37:8080/portrait/portraitJudge';
      const {data} = yield call(service.create, { api:REST_API.portraitJudge, values: payload})
      yield put({type: 'fetchSuccess', payload: {portraitJudge: data.result == null ? [] : data.result.content}})
    },
    //标签类: 非客观标签
    * fetchTagsNonobjective ({payload}, {call, put}) {
      const {data} = yield call(service.create, { api:REST_API.tagsNonobjective, values: payload})
      yield put({type: 'fetchSuccess', payload: {tagsNonobjective: data.result == null ? [] : data.result.content}})
    },
    //标签类: 客观标签
    * fetchTagsObjective ({payload}, {call, put}) {
      const {data} = yield call(service.create, { api:REST_API.tagsObjective, values: payload})
      yield put({type: 'fetchSuccess', payload: {tagsObjective: data.result == null ? [] : data.result.content}})
    },

    //加载地区
    * fetchArea ({payload}, {call, put}) {
      const operatorId = session.get("operatorId");
      const {data} = yield call(service.fetch, REST_USER_API.AREAS + '?operatorId=' + operatorId)
      yield put({type: 'fetchAreaSuccess', payload: data})
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({type: 'fetchArea'})

      return history.listen(({ pathname, query }) => {


      });
    },
  },
}
