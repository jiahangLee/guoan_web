/**
 * Created by jiahang Lee on 2017/6/23.
 */
import * as usersService from '../../services/user';
import * as service from '../../services/crud'
import REST_USER_API from '../../consts/userApi'

export default {
  namespace: 'userManage',
  state: {
    list: [],
    total: null,
    page: null,
    roleList: [],
    roleTotal: null,
    rolePage: null,
    funcTree:[],
    areaTree:[],
    funcIds:[],
    areaIds:[],
  },
  reducers: {
    save(state, { payload: { data: list, total, page } }) {
      return { ...state, list, total, page };
    },
    RoleSave(state, { payload: { data: roleList, roleTotal, rolePage } }) {
      return { ...state, roleList, roleTotal, rolePage };
    },
    fetchFuncTreeSuccess (state, {payload}) {
      return {...state, funcTree: payload}
    },
    fetchAreaTreeSuccess (state, {payload}) {
      return {...state, areaTree: payload}
    },
    fetchFuncIdsSuccess (state, {payload}) {
      return {...state, funcIds: payload}
    },
    fetchAreaIdsSuccess (state, {payload}) {
      return {...state, areaIds: payload}
    }
  },
  effects: {
    *fetch({ payload: { valuess = "",page = 1 } }, { call, put }) {
      var values = valuess;
      const { data,headers} = yield call(usersService.selectUser, {values, page });
      yield put({
        type: 'save',
        payload: {
          data:data.data,
          total:data.total,
          page: parseInt(page, 10),
        },
      });
    },
    *roleFetch({ payload: {searchValue = "", rolePage = 1 } }, { call, put }) {
      var values = searchValue;
      const { data,headers} = yield call(usersService.selectRole, {values, rolePage });
      yield put({
        type: 'RoleSave',
        payload: {
          data:data.data,
          roleTotal:data.total,
          rolePage: parseInt(rolePage, 10),
        },
      });
    },

    *userSelect({payload:{values,page = 1}}, { call, put }){
      const { data, headers } = yield call(usersService.selectUser,  {values,page});
      yield put({
        type: 'save',
        payload: {
          data:data.data,
          total:data.total,
          page: parseInt(page, 10),
        },
      });
    },
    *roleSelect({payload:{values,rolePage = 1}}, { call, put }){
      const { data, headers } = yield call(usersService.selectRole,  {values,rolePage});
      yield put({
        type: 'RoleSave',
        payload: {
          data:data.data,
          roleTotal:data.total,
          rolePage: parseInt(rolePage, 10),
        },
      });
    },

    *remove({ payload: id }, { call, put }) {
      yield call(usersService.remove, id);
      yield put({ type: 'reload' });
    },
    *patch({ payload: { id, values } }, { call, put }) {
      yield call(usersService.patch, id, values);
      yield put({ type: 'reload' });
    },
    *create({ payload: values }, { call, put }) {
      yield call(usersService.create, values);
      yield put({ type: 'reload' });
    },
    *reload(action, { put, select }) {
      const page = yield select(state => state.userManage.page);
      yield put({ type: 'fetch', payload: { page } });
    },

    *selectUser({payload:values}){
      dispatch({ type: 'fetch1', payload: values });
    },
    * fetchFuncTree ({payload}, {call, put}) {
      const {data} = yield call(service.fetch, REST_USER_API.FUNCTREE + payload)
      yield put({type: 'fetchFuncTreeSuccess', payload: data})
    },
    * fetchAreaTree ({payload}, {call, put}) {
      const {data} = yield call(service.fetch, REST_USER_API.AREATREE + payload)
      yield put({type: 'fetchAreaTreeSuccess', payload: data})
    },
    * resetPwd ({payload:operatorId},{call,put}) {
      const {data} = yield call(usersService.resetPwd,operatorId);
      yield put({type:'reload'});
    },
    * modifyPwd ({value,operatorId},{call,put}) {
      const {data} = yield call(usersService.modifyPwd,value.newPassword,operatorId);
      yield put({type:'reload'});
    },
    * fetchFuncIds ({payload}, {call, put}) {
      const {data} = yield call(service.fetch, REST_USER_API.FUNCIDS + payload)
      yield put({type: 'fetchFuncIdsSuccess', payload: data})
    },
    * fetchAreaIds ({payload}, {call, put}) {
      const {data} = yield call(service.fetch, REST_USER_API.AREAIDS + payload)
      yield put({type: 'fetchAreaIdsSuccess', payload: data})
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {

      return history.listen(({ pathname, query }) => {
        if (pathname === '/um/user') {
          dispatch({ type: 'fetch', payload: query });
        }
        if (pathname === '/um/role') {
          dispatch({ type: 'roleFetch', payload: query });
        }

      });
    },
  },
};
