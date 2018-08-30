
import * as service from '../../services/crud'
import REST_USER_API from '../../consts/userApi'
import {local, session} from '../../utils/storage.js'
import REST_API from '../../consts/api'
export default {
  namespace: 'dataAssets',
  state: {
    list: [],
    area: [],
    section:[],
    menu:[]
  },
  reducers: {
    fetchSuccess (state, {payload}) {
      return {...state, ...payload}
    },
    clear (state) {
      return {...state, list: []}
    },
    fetchAreaSuccess (state, {payload}) {
      return {...state, area: payload}
    },
    fetchMenuDataSuccess (state, {payload}) {
      let meun = []
      if(payload){
        let ia = payload.ia
        for(let x in ia){
          let obj = {}
          if(ia[x].name == "生活产品"){
            let firstMenu = ia[x]
            for(let y in firstMenu.children) {
              let obj2 = {}
              let children = new Array()
              for (let z in firstMenu.children[y].children) {
                children.push({'key': firstMenu.children[y].children[z].name})
              }
              obj2.key = firstMenu.children[y].name
              obj2.children = children
              meun.push(obj2)
            }
          }else if(ia[x].name == "全业务使用分析"||ia[x].name == "媒资分析"||ia[x].name == "电视概况"){
          //什么都不干
          }else{
            let children = new Array()
            for(let y in ia[x].children){
              children.push({'key':ia[x].children[y].name})
            }
            obj.key = ia[x].name
            obj.children =children
            meun.push(obj)
          }
        }
      }
      return {...state, menu: meun}
    },
  },
  effects: {
    * fetchUserCover ({payload}, {call, put}) {
      const {data: data} = yield call(service.fetch, REST_API.UserCover + payload)
      yield put({type: 'fetchSuccess', payload: {list:data.coverUserData}})
    },
    * fetchStockData ({payload}, {call, put}) {
      const {data: data} = yield call(service.fetch,REST_API.StockData+ payload)
      yield put({type: 'fetchSuccess', payload: {list:data.stockData}})
    },
    //加载地区
    * fetchArea ({payload}, {call, put}) {
      const operatorId = session.get("operatorId");
      const {data} = yield call(service.fetch, REST_USER_API.AREAS + '?operatorId=' + operatorId)
      yield put({type: 'fetchAreaSuccess', payload: data})
    },
    *fetchMenuData ({payload}, {call, put}) {
      const operatorId = session.get("operatorId");
      const {data}=  yield call(service.fetch, REST_USER_API.MENUS + '?operatorId=' + operatorId)
      yield put({type: 'fetchMenuDataSuccess', payload: data})
    }
  },

  subscriptions: {
    setup ({dispatch, history}) {
      dispatch({type: 'fetchArea'})
      dispatch({type: 'fetchMenuData'})
      // 在这里侦听，如果路由变换，则把数据清空，因为其他模块都用这个数据，不清的话会造成重影
      return history.listen(({pathname, query}) => {
        if (pathname.indexOf('da') > -1) {
          dispatch({type: 'clear'})
        }
        if (pathname.indexOf('da') > -1) {
          dispatch({type: 'fetchArea'})
        }
      })
    }
  }
}

