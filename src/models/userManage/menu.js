import * as service from '../../services/crud'
import REST_USER_API from '../../consts/userApi'

export default {
  namespace: 'menu',
  state: {
    menus:[],
  },
  reducers: {
    fetchMenusSuccess (state, {payload}) {
      return {...state, menus: payload}
    },
    clear (state) {
      return {...state, menus: []}
    }
  },
  effects: {
    *fetchMenus ({payload}, {call, put}) {
      const {data} = yield call(service.fetch, REST_USER_API.MENUS + payload)
      yield put({type: 'fetchMenusSuccess', payload: data})
    }
  },

  subscriptions: {
    setup ({dispatch, history}) {
     // dispatch({type: 'menu/fetchMenus',payload : ''})
      // 在这里侦听，如果路由变换，则把数据清空，因为其他模块都用这个数据，不清的话会造成重影
      return history.listen(({pathname, query}) => {
        if (pathname.indexOf('um') > -1) {
          dispatch({type: 'clear'})
        }
      })
    }
  }
}
