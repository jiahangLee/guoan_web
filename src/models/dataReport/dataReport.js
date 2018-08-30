
import * as service from '../../services/crud'
import REST_USER_API from '../../consts/userApi'
import { session} from '../../utils/storage.js'
import REST_API from '../../consts/api'
import { PAGE_SIZE } from '../../constants';
import request from '../../utils/table';

export default {
  namespace: 'dataReport',
  state: {
    list: [],
    area: [],
    total: null,
    page: null,
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
    save(state, { payload: { data: list, total, page } }) {
      return { ...state, list, total, page };
    },
  },
  effects: {
    *fetch({ payload: { valuess = "",page = 1 } }, { call, put }) {
      var url = REST_API.dataReportLis+`?operatorId=${session.get('operatorId')}&beginRow=${(page-1)*PAGE_SIZE}&pageSize=${PAGE_SIZE}&searchType=${valuess.searchType}&search=${valuess.searchValue==undefined?"":valuess.searchValue}`;
      const { data} = yield call(service.fetch, url);
      yield put({
        type: 'save',
        payload: {
          data:data.data,
          total:data.total,
          page: parseInt(page, 10),
        },
      });
    },
    //加载地区
    * fetchArea ({payload}, {call, put}) {
      const operatorId = session.get("operatorId");
      const {data} = yield call(service.fetch, REST_USER_API.AREAS + '?operatorId=' + operatorId)
      yield put({type: 'fetchAreaSuccess', payload: data})
    },
  },

  subscriptions: {
    setup ({dispatch, history}) {
      dispatch({type: 'fetchArea'})
      // 在这里侦听，如果路由变换，则把数据清空，因为其他模块都用这个数据，不清的话会造成重影
      return history.listen(({pathname, query}) => {
        if (pathname.indexOf('report') > -1) {
          dispatch({type: 'clear'})
        }
        if (pathname.indexOf('report/dataReport') > -1) {
         dispatch({ type: 'fetch', payload: query });
        }
      })
    }
  }
}

