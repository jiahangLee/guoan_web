import * as service from '../../services/crud'
import REST_USER_API from '../../consts/userApi'

export default {
  namespace: 'role',
  state: {
    roleList:[],
    roleAdd:[],
  },
  reducers: {
    fetchRoleListSuccess (state, {payload}) {
      return {...state, roleList: payload}
    },
    roleAddSuccess (state, {payload}) {
      return {...state, roleAdd: payload}
    }
  },
  effects: {
    * fetchRoleList ({payload}, {call, put}) {
      const {data} = yield call(service.fetch, REST_USER_API.ROLELIST + payload)
      yield put({type: 'fetchRoleAddSuccess', payload: data})
    },
    * fetchRoleAdd ({payload :values}, {call, put}) {
      const {data} = yield call(service.create, REST_USER_API.ROLEADD , values)
      yield put({type: 'roleAddSuccess', payload: data})
    },
  },

  subscriptions: {

  }
}
