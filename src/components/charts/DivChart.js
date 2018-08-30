/**
 * Created by wanggy on 2017/10/17
 */
import React, {PropTypes} from 'react'
import Panel from '../Panel'
import styled from 'styled-components'
import ECharts from 're-echarts'
import {getTypeOption} from './genOption'
import _ from 'lodash';
import { Radio, Card, Col, Row, Tooltip} from 'antd'
require('echarts-wordcloud');
const RadioGroup = Radio.Group
const RadioButton = Radio.Button



class DivChart extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
    }
  }
  handleWordCloudData = (v)=>{
    const data = []
    for(const i in v) {
      const o = {
        name: _.isEmpty(v[i].key)?v[i]:v[i].key,
        value:_.isEmpty( v[i].count)? Math.round(Math.random() * 160):v[i].count,
        textStyle:{
          normal: {
            color: 'rgb(' + [
              Math.round(Math.random() * 255),
              Math.round(Math.random() * 255),
              Math.round(Math.random() * 255),
            ].join(',') + ')',
          },
        }
      }
      data.push(o)
    }
    return data
  }



  render () {

    var {type,chartData,title, height,width_value,margin_left,divStyle,panelDivStyle} = this.props
    const defaultDivStyle = {width: width_value,top: '60px',marginLeft:margin_left,float: 'left'}
    const data = {...this.props}
    var option = {}
    if(divStyle==undefined){
      divStyle = defaultDivStyle
    }
    //封装 {data}条件
    if (!_.isEmpty(chartData)) {
      if (type == 'x_bar'&&!_.isEmpty(chartData[0].x_axis)) {
        if (chartData[0].x_axis && chartData[0].y_axis) {
          data.x_data = chartData[0].x_axis
          data.y_data = chartData[0].y_axis
          option = getTypeOption(data)
        }
      }else if (type == 'wordCloud') {
          data.y_data =this.handleWordCloudData(chartData)
          option = getTypeOption(data)
      }
    }
    if(type == '0'){
      //默认为空 输出空白div
      return (
        <div style={ divStyle}>
          <Panel title={title}>
        <div  style={{height}} ></div>
          </Panel>
        </div>
      )
    }else if (type == 'portraitInfo'&&!_.isEmpty(chartData)){
      return (
        <div style={ divStyle}>
          <Panel title={title}>
            <div style={{height}} >
              <div style={{width:'80%',float:'left',height:'80%',marginLeft:'10%',marginTop:'5%'}}>
                <div style={{width:'40%',float:'left',height:'100%'}}>
                  <table style={{width:'100%',height:'100%',verticalAlign:'middle'}}>
                    <tbody>
                    <tr>
                      <td>
                        <img src={'assets/people.png'} style={{width:'100%'}} />
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <div style={{width:'10%',float:'left',height:'100%'}}></div>
                <div style={{width:'50%',float:'left',height:'100%'}}>
                  <table style={{width:'100%',height:'100%'}}>
                    <tbody>
                    <tr>
                      <td style={{position:'absolute'}}>机顶盒id :<label>{chartData[0].deviceid}</label></td>
                    </tr>
                    <tr>
                      <td style={{position:'absolute'}}>使用次数 ：<label>{Math.round(chartData[0].useCount)}</label></td>
                    </tr>
                    <tr>
                      <td style={{position:'absolute'}}>使用时长 : <label>{chartData[0].useTime}(秒)</label></td>
                    </tr>
                    <tr>
                      <td style={{position:'absolute'}}>价值等级 : Lev.<label>{chartData[0].value_cluster}</label></td>
                    </tr>
                    <tr>
                      <td style={{position:'absolute'}}>粘性等级 : <label>{chartData[0].viscosity_cluster}</label></td>
                    </tr>
                    <tr>
                      <td style={{position:'absolute'}}>cano :<label>{chartData[0].cano}</label></td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Panel>
        </div>
      )
    }else if(type == 'portraitJudge'&&!_.isEmpty(chartData)){
    /*  chartData[0] = {x_axis:['judge_children','judge_oldman','judge_student'],y_axis:['家有小孩','家有老人','家有学生'],z_axis:['80%','70%','20%']}
*/
      let tagsEnName = chartData[0].x_axis
      let names = chartData[0].y_axis
      let probabilitys = chartData[0].z_axis
      let spanStyle ={display:'block',width:'100%',textAlign:'center',fontFamily:"黑体",fontSize:18,color:'#D55A60'}
      return (
        <div  style={ divStyle}>
          <Panel title={title}>
            <div style={{height:height}}>
              <Row gutter={16} align={'middle'}>
              {tagsEnName.map((value,index) =>
                <Col key={index} span={8}>
                  <Tooltip title={'概率:'+probabilitys[index]} placement="topRight">
                    <Card bordered={false} style={{ height:height}}>
                      <table style={{width:'100%',height:'100%',position:'absolute',top:'0',left:'0'}} >
                        <tbody><tr><td><img alt="example" width="100%"  src={'assets/'+value+'.png'} /></td></tr></tbody>
                      </table>
                      <div style={{width: '100%', textAlign:'center',position:'absolute', left: '0px', bottom: '5%'}}>
                        <label><span style={spanStyle}>{names[index]}</span></label>
                      </div>
                    </Card>
                  </Tooltip>
                </Col>
              )}
            </Row>
            </div>
          </Panel>
        </div>
      )
    }else{
      return (
        <div  style={ divStyle}>
          <Panel title={title} divStyle={panelDivStyle}>
            {
              _.isEmpty(option)
                ? <div style={{height}}/>
                : <ECharts option={option} style={{height}}/>
            }
          </Panel>
        </div>
      )
    }
  }
}

DivChart.propTypes = {
  width_value :PropTypes.string,
  margin_left:PropTypes.string,
  x_data_name:PropTypes.string,
  y_data_name:PropTypes.string,
  color:PropTypes.array,
  height: PropTypes.string,
  title: PropTypes.string.isRequired,
  chartData: PropTypes.array,
  type: PropTypes.string,
  divStyle:PropTypes.object,
  grid:PropTypes.object,//echart grid属性
  axisLabel:PropTypes.object,//图标x轴显示样式
  gridSize:PropTypes.number,//字符云 显示文字之间差距
  series_name:PropTypes.string,
  sizeRange:PropTypes.array,
  rotationRange:PropTypes.array,
  rotationStep:PropTypes.number,
  panelDivStyle:PropTypes.object,
  isShow :PropTypes.bool,
}

DivChart.defaultProps = {
  height: '300px',
  type:'0',
  width_value :'47%',
  margin_left :'2%',
  grid : {
    left: '3%',
    right: '10%',
    bottom: '3%',
    containLabel: true //grid 区域是否包含坐标轴的刻度标签。
}
}

export default DivChart
