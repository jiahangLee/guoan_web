/**
 * Created by liekkas on 2017/3/1.
 */
import React from 'react'
import { connect } from 'dva'
import { SearchBox} from '../../../components'
import { Spin } from 'antd'
import Panel from '../../../components/Panel'
import DivChart from "../../../components/charts/DivChart";
import KPIS from '../../../consts/kpis'
class PersonasTemplate extends React.PureComponent {

  constructor (props) {
    super(props)
    this.state = {
    }
  }
  onSearch = (v) => {
    const {region, period,cano,deviceid} = v
    const param ={
      area: region.id,
      period : period.type,
      periodValue :period.start,
      cano : cano,
      deviceid : deviceid
    }
    if((cano == null || cano ==undefined || cano == '') &&
      (deviceid == null || deviceid ==undefined || deviceid == '')){
      return;
    }
    this.fetchportraitBusinessTop(param)
    this.fetchPortraitInfo(param)
    this.fetchPortraitTagsCluster(param)
    this.fetchPortraitTagsOtt(param)
    this.fetchPortraitJudge(param)
  }

  fetchportraitBusinessTop = (v) => {
    this.props.dispatch({
      type: 'personas/fetchPortraitBusinessTop',
      payload: v
    })
  }
  fetchPortraitInfo= (v) => {
    this.props.dispatch({
      type: 'personas/fetchPortraitInfo',
      payload: v
    })
  }
  fetchPortraitTagsCluster= (v) => {
    this.props.dispatch({
      type: 'personas/fetchPortraitTagsCluster',
      payload: v
    })
  }
  fetchPortraitTagsOtt= (v) => {
    this.props.dispatch({
      type: 'personas/fetchPortraitTagsOtt',
      payload: v
    })
  }

  fetchPortraitJudge= (v) => {
    this.props.dispatch({
      type: 'personas/fetchPortraitJudge',
      payload: v
    })
  }
  render () {
    const {personas, loading,bizSubtype} = this.props
    //portraitTagsCluster接口返回数据格式处理
    let portraitTagsCluster = personas.portraitTagsCluster
    let data = [{x_axis:[],y_axis:[]},]
    if(!_.isEmpty(portraitTagsCluster)){
      data[0].x_axis =  personas.portraitTagsCluster[0].y_axis
      data[0].y_axis = personas.portraitTagsCluster[0].z_axis
    }
    return (
      <Spin spinning={loading}>
        <SearchBox bizSubtype={bizSubtype} initValue={{areas: personas.area}}
                   onSearch={(v) => this.onSearch(v)}  />
        <Panel title={'行为分析'}>
          <div style={{height:"1170px"}}>

            <DivChart chartData={personas.portraitInfo} title={`用户信息`} type={'portraitInfo'} />

            <DivChart chartData={personas.portraitJudge} title={`家庭成员判定`} type={'portraitJudge'} />

            <DivChart chartData={personas.portraitBusinessTop} title={`业务使用排行`} type={'x_bar'} x_data_name={'业务'} y_data_name={'时长'}  series_name={'时长'} />

            <DivChart chartData={data} title={`非客观标签`} type={'x_bar'} x_data_name={'标签'} y_data_name={'概率（%）'}/>

            <DivChart  chartData={personas.portraitTagsOtt} title={`客观标签`} type={'wordCloud'}/>

          </div>
        </Panel>
      </Spin>
    )
  }
}

PersonasTemplate.propTypes = {
  title: React.PropTypes.string,
  bizSubtype:React.PropTypes.string,
}

PersonasTemplate.defaultProps = {

}

export default connect(({personas, loading}) => ({personas, loading: loading.models.personas}))(PersonasTemplate)
