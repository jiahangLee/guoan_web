import * as service from '../../services/crud'
import REST_USER_API from '../../consts/userApi'

export default {
  namespace: 'AuthTree',
  state: {
    funcTree:[],
    areaTree:[],
  },
  reducers: {
    fetchFuncTreeSuccess (state, {payload}) {
      return {...state, funcTree: payload}
    },
    fetchAreaTreeSuccess (state, {payload}) {
      return {...state, areaTree: payload}
    }
  },
  effects: {
    * fetchFuncTree ({payload}, {call, put}) {
      const {data} = yield call(service.fetch, REST_USER_API.FUNCTREE + payload)
      yield put({type: 'fetchFuncTreeSuccess', payload: data})
    },
    * fetchAreaTree ({payload}, {call, put}) {
      const {data} = yield call(service.fetch, REST_USER_API.AREATREE + payload)
      yield put({type: 'fetchAreaTreeSuccess', payload: data})
    }
  },

  subscriptions: {

  }
}
