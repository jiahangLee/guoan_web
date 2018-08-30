/**
 * Created by liekkas on 2017/3/1.
 */
import React from 'react'
import { connect } from 'dva'
import { SearchBox} from '../../../components'
import { Spin } from 'antd'
import Panel from '../../../components/Panel'
import DivChart from "../../../components/charts/DivChart";
import styled from 'styled-components'
import { Button } from 'antd'
import KPIS from '../../../consts/kpis'

const divStyle = styled.div`
  position: relative;
  margin-bottom: 15px;
  border: solid 1px #d3d3d3;
  background-color: #fff;
`

const bizSubtype = 'tagerPersonas'

class PersonasTemplate extends React.PureComponent {

  constructor (props) {
    super(props)
    this.state = {
    }
  }
  onSearch = (v) => {
    const {region, period} = v
    const param ={
      period: period.type,
      periodValue: period.start,
      pageNo:1,
      pageSize:100
    }
    this.fetchTagsNonobjective(param)
    this.fetchTagsObjective(param)
  }
  fetchTagsObjective = (v) => {
    this.props.dispatch({
      type: 'personas/fetchTagsObjective',
      payload: v
    })
  }
  fetchTagsNonobjective = (v) => {
    this.props.dispatch({
      type: 'personas/fetchTagsNonobjective',
      payload: v
    })
  }

  render () {
    const {personas, loading} = this.props
    const values = personas.tagsNonobjective
    const tagsStyle = {margin:"8px 2px 8px 2px"}
    const length = personas.tagsNonobjective.length
    const height = 340*Math.ceil(length==0?1:length/4)
    let carDiv = values.map((value,index) =>
      <div  key={index} style={{backgroundColor:'#F8F8F8',height:'320px',marginTop:"16px",width:'22%',marginLeft:'2.5%',float: 'left',border:'solid 1px #EBEBEB'}}>
        <div style={{margin:"5% 5% 5% 5%",height:"90%",width:'90%'}}>
          {/*标签文字*/}
          <div ><span style={{display:'block',width:'100%',textAlign:'center',fontFamily:"黑体",fontSize:18,color:'#D55A60'}}>{value.tagsName} </span></div>
          {/*//头像*/}
          <div  style={{height:'15%',textAlign:'center',marginTop:'5%'}}>
              <img style={{height:'100%'}}  src={'assets/'+value.tagsEnName+'.png'}/>
          </div>
          {/*//介绍*/}
          <div style={{height:'25%',marginTop:'5%'}}>{value.describes}</div>
          <div>
            {/*<Button style={tagsStyle} type='white'>{value.tagsEnName}</Button>*/}
            {/*<Button style={tagsStyle} type='white'>{value.businessRule}</Button>*/}
            {/*<Button style={tagsStyle} type='white'>{value.timeRule}</Button>*/}
            {/*<Button style={tagsStyle}  type='white'>{value.targetRule}</Button>*/}
            {/*<Button style={tagsStyle} type='white'>{value.threshold}</Button>*/}
            {/*<Button style={tagsStyle} type='white'>{value.tagsType}</Button>*/}
            {/*<Button style={tagsStyle} type='white'>{value.isPublish}</Button>*/}
          </div>
        </div>
      </div>
    )


    const grid = {
        left: '1%',
        right: '1%',
        bottom: '2%',
    }


    return (
      <Spin spinning={loading}>
        <SearchBox bizSubtype={bizSubtype} initValue={{areas: personas.area}}
                   onSearch={(v) => this.onSearch(v)}  />
        <div style={{height:'1090px',float:'left',width:'100%'}}>
          <DivChart grid={grid} chartData={personas.tagsObjective} height={'1000px'} width_value={'100%'} margin_left={'0%'} title={'标签云'} type={'wordCloud' }></DivChart>
        </div>
        <div style={{float:'left',width:'100%'}}>
          <Panel title={'非客观标签'}>
            <div style={{height:height}} >
              <divStyle>
                {
                  carDiv
                }
              </divStyle>
            </div>
          </Panel>
        </div>
      </Spin>
    )
  }
}
export default connect(({personas, loading}) => ({personas, loading: loading.models.personas}))(PersonasTemplate)

