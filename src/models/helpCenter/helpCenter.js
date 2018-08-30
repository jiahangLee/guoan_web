
import * as service from '../../services/crud'
import REST_USER_API from '../../consts/userApi'
import {local, session} from '../../utils/storage.js'
import REST_API from '../../consts/api'
export default {
  namespace: 'helpCenter',
  state: {
    list: [],
  },
  reducers: {
    fetchSuccess (state, {payload}) {
      return {...state, ...payload}
    },
    clear (state) {
      return {...state, list: []}
    },
  },
  effects: {
    * fetch ({payload}, {call, put}) {
      const {data: data} = yield call(service.fetch, REST_API.adviceList )
      yield put({type: 'fetchSuccess', payload: {list:data}})
    },
    * fetchHelpRetrieval({payload=''}, {call, put}) {
      const {data: data} = yield call(service.fetch, REST_API.helpRetrieval+"?targetName="+payload )
      yield put({type: 'fetchSuccess', payload: {list:data.helpSearch}})
    },
  },

  subscriptions: {
    setup ({dispatch, history}) {
      // 在这里侦听，如果路由变换，则把数据清空，因为其他模块都用这个数据，不清的话会造成重影
      return history.listen(({pathname, query}) => {
        if (pathname.indexOf('proposalList') > -1) {
          dispatch({type: 'clear'})
          dispatch({type: 'fetch'})
        }
        if (pathname.indexOf('helpRetrieval') > -1) {
          dispatch({type: 'clear'})
          dispatch({type: 'fetchHelpRetrieval'})
        }

      })
    }
  }
}

