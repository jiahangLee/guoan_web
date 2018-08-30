/**
 * Created by liekkas on 2017/2/9.
 */
import React from 'react'
import styled from 'styled-components'
import { connect } from 'dva'
import echarts from 'echarts'
import ECharts from 're-echarts'
import china from './china.json'
import moment from 'moment'
import KpiChart from './KpiChart'
import GeoCoordMap from './GeoCoordMap'
import _ from 'lodash'
import KPIS from "../../consts/kpis";
import getSingle from "../insightAnalysis/getSingle";


const kpiArr = [KPIS.networkUser, KPIS.open_device_user]
echarts.registerMap('china', china)

const Root = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  overflow-x:hidden;
  background: url(assets/bg.jpg);
  background-size: cover;
  background-position: 50%;
  font-weight: bold;
`

const Right = styled.div`
  width: 45%;
  height: 100%;
  padding-top: 8vh;
`
const Stats = styled.div`
  color: white;
`

const UpdateTime = styled.div`
  display: flex;
  color: #19a9ec;
`


//这个 Cont 是我定义的
const ActiveUser = styled.img`
  position: absolute;
  width:310px;
  right: 2.4%;
  top:30%;
`

const Network = styled.img`
  position: absolute;
  width:310px;
  right: 26%;
  top:30%;
`

const Active = styled.div`
  text-align:center;
  font-size:40px;
  position: absolute;
  width: 140px;
  right: 29%;
  top:29.3%;
  color: #e2c329;
  font-weight: bold;
`
const Total = styled.div`
  text-align:center;
  font-size:40px;
  position: absolute;
  width: 140px;
  right: 6%;
  top:29.3%;
  color: #19a9ec;
  font-weight: bold;
`
const ChartBox = styled.div`
  position: absolute;
  width: 47vw;
  padding: 4px;
  right:3vh;
  top: 49vh;
`
const ChartTitle = styled.div`
  background-color: rgba(200,200,200,0.3);
  //position: absolute;
  font-size: 1.5rem;
  width: 100%;
  text-align: center;
  margin: 8px;
  padding: 2px;
  color: #fff;
  
`

const KpiGroup = styled.div`
background-color: rgba(200,200,200,0.3);
  //position: absolute;
  font-size: 0.5rem;
  width: 100%;
  text-align: center;
  margin: 12px;
  padding: 4px 2px;
  display: flex;
  justify-content: space-around;
  label {
    background-color: #fff;
    padding: 0 10px;
  }
  div {
    background-color: #2cfeeb;
    padding: 0 10px;
  }
`

const Spacer = styled.div`
  background-color: rgba(200,200,200,0.3);
  width: 100%;
  height: 14px;
  margin: 12px;
`


const getCurrentDateTime = function(){
  let date = [];
  let now = new Date();
  date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-'));
  let hours = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
  let minutes = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
  let seconds = now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();
  date.push([hours, minutes, seconds].join(':'));
  return date[0]+" "+date[1]
}


class Home extends React.Component {

  fetch = (v) => {
    this.props.dispatch({
      type: 'home/fetchSingle',
      payload: getSingle(v)
    })
  }

  fetchKpiData = () => {
    this.props.dispatch({
      type: 'home/fetchKpiData'
    })
  }

  fetchCoordMapData = () => {
    this.props.dispatch({
      type: 'home/fetchCoordMapData'
    })
  }

  constructor (props) {
    super(props)
    this.state = {
      chartData: [],
      date : this.getHours()
    }
  }

  componentDidMount() { //组件渲染完成，要挂载到页面前执行的代码
    this.setState ({
      chartData: this.getKpiData(),
      date : this.getHours()
    })
    this.timer = setInterval(
      () => this.getKpiData(),
      60000
    );
  }

  componentWillUnmount() { //组件从页面卸载前执行的方法
    clearInterval(this.timer);
  }

  getKpiData = () => {
    this.fetch({fields: _.map(kpiArr, 'en')})
    this.fetchKpiData();
    this.fetchCoordMapData();
    this.setState({date : this.getHours()});
  }

  getHours = () => {
    let base = +new Date();
    let oneDay = 24 * 3600 * 1000;
    let date = [];
    let yesterday = +new Date(base -= oneDay);
    for (let i = 0; i < 24; i++) {
      let now = new Date(yesterday += 3600 * 1000);
      date.push([now.getHours(), '00'].join(':'));
    }
    return date
  }


  render () {
    const {home} = this.props
    const activeUser = home.activeUser
    const networkUser = home.networkUser
    const kpiData = home.kpiData
    const mapData = home.mapData
    const geoCoordMap = home.map
    return (
      <Root>
        <GeoCoordMap mapData={mapData} geoCoordMap={geoCoordMap} />
        <Right>
          <Stats>
            <Network src={'assets/new_net.png'}  />
            <ActiveUser src={'assets/new_acti.png'}  />
            {/*<Network1 >*/}
              {/*<img src={'assets/user.png'} width={'35%'} />*/}
              {/*<h3>在网用户</h3>*/}
            {/*</Network1>*/}
            {/*<ActiveUser1 >*/}
              {/*<img src={'assets/user.png'} width={'35%'} />*/}
              {/*<h3>活跃用户</h3>*/}
            {/*</ActiveUser1>*/}
            <Total style={{height: '30vh'}}>
              <div>{activeUser}</div>
            </Total>
            <Active style={{height: '30vh'}}>
              <div>{networkUser}</div>
            </Active>
            <img src={'assets/kpi.png'} width={'100%'} />
            <UpdateTime>
              <div>实时数据更新时间&nbsp;</div>
              <div id='timer'>{getCurrentDateTime()} </div>
            </UpdateTime>
          </Stats>

          <ChartBox>
            <KpiChart style={{height: '50vh'}} chartData={kpiData} date ={this.state.date} />
          </ChartBox>
        </Right>
      </Root>
    )
  }
}
export default connect(({home}) => ({home}))(Home)
