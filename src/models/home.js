import * as service from "../services/crud";
import REST_API from "../consts/api";
var data = [
  {name: '承德', value: 43},
  {name: '唐山', value: 61},
  {name: '沧州', value: 45},
  {name: '秦皇岛', value: 34},
  {name: '威海', value: 52},
  {name: '郑州', value: 92},
  {name: '洛阳', value: 31},
  {name: '常德', value: 18},
  {name: '湘潭', value: 20},
  {name: '岳阳', value: 21},
  {name: '长沙', value: 95},
  {name: '合肥', value: 45},
  {name: '武汉', value: 72},
  {name: '宜昌', value: 42},
  {name: '南京', value: 67},
  {name: '安阳', value: 42},
  {name: '开封', value: 40},
  {name: '济南', value: 80},
  {name: '邵阳', value: 42}
]
var geoCoordMap = {
  '承德': [117.93, 40.97],
  '唐山': [118.02, 39.63],
  '沧州': [116.83, 38.33],
  '秦皇岛': [119.57, 39.95],
  '河北': [114.57, 38.05],
  '威海': [122.1, 37.5],
  '郑州': [113.65, 34.76],
  '洛阳': [112.44, 34.7],
  '常德': [111.69, 29.05],
  '湘潭': [112.91, 27.87],
  '岳阳': [113.09, 29.37],
  '湖南': [112, 27.21],
  '邵阳': [111.4678, 27.2389],
  '合肥': [117.27, 31.86],
  '武汉': [114.31, 30.52],
  '湖北': [111.8, 31.2],
  '南京': [118.78, 32.04],
  '安阳': [114.35, 36.1],
  '开封': [114.35, 34.79],
  '广东': [113.35, 22.79],
  '济南': [117, 36.65]
}

export default {
  namespace: 'home',
  state: {
    kpiData: [],
    mapData : [],
    map: geoCoordMap,
    networkUser: '',
    activeUser: ''
  },
  reducers: {
    fetchSuccess (state, {payload}) {
      return {...state, ...payload}
    },
    fetchKpiDataSuccess (state, {payload}) {
      return {...state, ...payload}
    },
    fetchCoordMapDataSuccess (state, {payload}) {
      return {...state, ...payload}
    },
    clear (state) {
      return {...state, list: [], distributions: []}
    }
  },
  effects: {
    * fetchSingle({payload},{call , put}){
      const {data: data} = yield call(service.fetch, REST_API.SINGLE + payload)
      yield put({type: 'fetchSuccess', payload: {
        networkUser:data.networkUser,
        activeUser :data.activeUser
      }})
    },
    * fetchKpiData({payload}, {call, put}){
      const {data: data} = yield call(service.fetch, REST_API.KPILIST)
      yield put({type: 'fetchKpiDataSuccess', payload: {
        kpiData:data.result
      }})
    },
    * fetchCoordMapData({payload}, {call, put}){
      const {data: data} = yield call(service.fetch, REST_API.COORDMAPLIST)
      yield put({type: 'fetchCoordMapDataSuccess', payload: {
        mapData:data.coordMapData
      }})
    },
  },
  subscriptions: {
    setup ({dispatch, history}) {
    }
  }
}
