/**
 * Created by sunjl on 2017/10/26.
 */
import React, {PropTypes} from 'react'
import Panel from '../Panel'
import styled from 'styled-components'
import ECharts from 're-echarts'
import { Radio, Card, Col, Row, Tooltip,Button,Modal} from 'antd'
import {getEchartTemplateOption} from './genOption'
import DivChart from "./DivChart";
import _ from 'lodash'

const RadioGroup = Radio.Group
const RadioButton = Radio.Button

const Group = styled.div`
  position: absolute;
  top: 60px;
  left: 12px;
`

const DivGroup = styled.div`
  position: absolute;
  top: 80px;
  width: 100%;
`

const GroupEDU = styled.div`
  position: absolute;
  top: 100px;
  left: 12px;
`

const DivGroupEDU = styled.div`
  position: absolute;
  top: 120px;
  width: 100%;
`

class EchartTemplate extends React.Component {
  constructor (props) {
    super(props)
    this.onClickChange = this.onClickChange.bind(this)
    this.onLegendSelectChange = this.onLegendSelectChange.bind(this)
    this.state = {
      currentGroup: props.group.length>0 ? props.currentGroup : null,
      currentGroupType: 0,
      currentLegend: "",
      visible: false,
      config:{
        event: [{ type: 'click', handler: this.onClickChange },
                 { type: 'legendselectchanged', handler: this.onLegendSelectChange }]
      },
    }
  }

  onClickChange(item) {
    this.props.onClickChange(item)
  }

  onLegendSelectChange(item) {
    this.props.onLegendSelectChange(item)
    this.setState({
      currentLegend: item.name
    })
  }

  onClickGroup(e) {
    const currentGroup = _.find(this.props.group, {en: e.target.value})
    this.setState({
      currentGroup: currentGroup
    }, ()=>{
      this.props.onClickGroup(currentGroup)
    })
  }

  onClickGroupBtn(e) {
    const currentGroup = _.find(this.props.group[this.state.currentGroupType], {en: e.target.value})
    this.setState({
      currentGroup: currentGroup
    }, ()=>{
      this.props.onClickGroup(currentGroup)
    })
  }

  onClickGroupEDU(e) {
    const currentGroupType =  e.target.value
    this.setState({
      currentGroupType: currentGroupType
    })

    const currentGroup = this.props.group[currentGroupType][0]
    this.setState({
      currentGroup: currentGroup
    }, ()=>{
      this.props.onClickGroup(currentGroup)
    })
  }

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }

  tagNameIndex = 0
  showModal = (index) => {
    this.tagNameIndex = index
    this.setState({
      visible: true,
    } ,()=>{
      this.props.onClickChange(index)
    })
  }

  render () {
    const { width_value, margin_left, height, title, group, type} = this.props
    const {config, currentGroup,currentGroupType, currentLegend} = this.state
    let params = {currentLegend: currentLegend, ...this.props}
    let option = getEchartTemplateOption(params)
    if(type == "judgeDiv") {
      const {data} = this.props
      return (
        <div  style={ {width: width_value,top: '60px',marginLeft:margin_left,float: 'left'}}>
          <Panel title={title}>
            <div style={{height:height}}>
              {
                data == null || data.length == 0
                ? <div />
                : <Row gutter={16}>
                    {data[0].y_axis.map((value,index) =>
                      <Col span={8} key={index}>
                        <Tooltip title={data[0].z_axis[index]+","+data[0].x_axis[index]+"人"} placement="topRight">
                          <Card bordered={false} style={{ height:height}}>
                            <img alt="example" width="100%" src={'assets/'+value+'.png'} />
                            <div style={{width: '100%', textAlign:'center',position:'absolute', left: '0px', bottom: '40px'}}>
                              <span style={{display:'block',width:'100%',textAlign:'center',fontFamily:"黑体",fontSize:18,color:'#D55A60'}}>
                                {data[0].z_axis[index]}
                              </span>
                            </div>
                          </Card>
                        </Tooltip>
                      </Col>
                    )}
                  </Row>
              }
            </div>
          </Panel>
        </div>
      )
    } else if(type == "businessGroup") {
      const {data} = this.props
      let tagName = _.isEmpty(data[0])?'':data[0][this.tagNameIndex].tagName
      let title = '【 '+ tagName+' 】喜好群体---详情'
      const divStyle = {width: '100%',float: 'left'}
      let height = Math.ceil(data[0].length/4)*70
      return (
        <Panel title={'概况'}>

          <RadioGroup defaultValue="0" size="large" onChange={(e) => this.onClickGroupEDU(e) }>
            <RadioButton value="0">媒&nbsp;资</RadioButton>
            <RadioButton value="1">教&nbsp;育</RadioButton>
          </RadioGroup>

          <div style={{height:height+140+'px'}} >
            <GroupEDU>
              <RadioGroup onChange={(e) => this.onClickGroupBtn(e)}
                          value={currentGroup.en}>
                {
                  group[currentGroupType].map(({en, cn}, index) =>
                    <RadioButton key={index} value={en}>{cn}</RadioButton>)
                }
              </RadioGroup>
            </GroupEDU>
            <DivGroupEDU style={{height:height+'px'}} >
              {
                data[0].map(({tagName, numbers}, index) =>
                  <div  key={index} style={{width:'22%',marginLeft:'2%',marginTop:'20px',border:'1px solid #D9D9D9',height:'50px',textAlign:'center',float:'left'}}>
                    <table style={{width:'100%',height:'100%',verticalAlign:'middle',wordBreak:'break-all'}}>
                      <tbody>
                      <tr>
                        <td><label title={tagName}><span>【 {tagName.length>4?tagName.substring(0,4)+'...':tagName} 】喜好群体</span></label></td>
                        <td rowSpan={'2'} >
                          <Button  style={{float:'right',marginRight:'5px'}} className="12" type='primary' onClick={() =>this.showModal(index)}  >详情</Button></td></tr>
                      <tr>
                        <td>
                          <label><span style={{textAlign:'center',fontFamily:"黑体",fontSize:14,color:'#D55A60'}}>群体人数：</span></label>
                          <label><span>{numbers}</span></label>
                        </td>
                        <td></td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                )
              }
              <Modal width={'300px'} bodyStyle={{padding:'4px'}}
                     visible={this.state.visible}
                     closable={false}
                     footer={ <Button type='primary'  onClick={this.handleOk} >关闭</Button>}
              >
                <DivChart  height={'170px'} divStyle={divStyle} isShow={true}
                           panelDivStyle={{border:'0',padding:'0',marginTop:'0', position:'relative'}}
                           chartData={data[1]} title={title} type={'wordCloud'}
                           rotationRange={[0,0] } rotationStep={0} sizeRange={[14,15]}
                />
              </Modal>
            </DivGroupEDU>
          </div>
        </Panel>
      )
    } else if(type == "preferenceCluster") {
      const {data} = this.props
      let height = 330
      return (
        <div style={ {'width': width_value,top: '60px',marginLeft:margin_left,float: 'left'}}>
          <Panel title={title}>
            <RadioGroup defaultValue="0" size="large" onChange={(e) => this.onClickGroupEDU(e) }>
              <RadioButton value="0">媒&nbsp;资</RadioButton>
              <RadioButton value="1">教&nbsp;育</RadioButton>
            </RadioGroup>
            <div style={{height:height}}>
              {
                data == null || data.length == 0
                  ? <div style={{height}} />
                  : <DivGroupEDU style={{height:height+'px'}} >
                      {
                        data.map(({tagName, numbers}, index) =>
                          <div  key={index} style={{width:'18%',marginLeft:'1%',marginTop:'20px',border:'1px solid #D9D9D9',height:'50px',textAlign:'center',float:'left'}}>
                            <table style={{width:'100%',height:'100%',verticalAlign:'middle',wordBreak:'break-all'}}>
                              <tbody>
                              <tr>
                                <td><label title={tagName}><span>【 {tagName.length>8?tagName.substring(0,8)+'...':tagName} 】喜好群体</span></label></td>
                              </tr>
                              <tr>
                                <td>
                                  <label><span style={{textAlign:'center',fontFamily:"黑体",fontSize:14,color:'#D55A60'}}>群体人数：</span></label>
                                  <label><span>{numbers}</span></label>
                                </td>
                              </tr>
                              </tbody>
                            </table>
                          </div>
                        )
                      }
                    </DivGroupEDU>
              }
              {
                group.length > 0
                  ?
                  <GroupEDU>
                    <RadioGroup onChange={(e) => this.onClickGroupBtn(e)}
                                value={currentGroup.en}>
                      {
                        group[currentGroupType].map(({en, cn}, index) =>
                          <RadioButton key={index} value={en}>{cn}</RadioButton>)
                      }
                    </RadioGroup>
                  </GroupEDU>
                  :
                  <div/>
              }
            </div>
          </Panel>
        </div>
      )
    }else {
      return (
        <div style={ {'width': width_value,top: '60px',marginLeft:margin_left,float: 'left'}}>
          <Panel title={title}>
            {
              type == 'viscosityOverview' && !_.isEmpty(option)
                ?
                <div style={ {width:'100%', position: 'relative'}}>
                  {
                    [0,1,2,3].map((index) =>
                      <div key={index} style={ {top: '125px', left: 17+index*20+'%', width:'6%',height:'50px',position: 'absolute'}}>
                        <img width="100%" src={'assets/personas_group_arrow.png'} />
                      </div>)
                  }
                </div>
                :
                <div/>
            }
            {
              _.isEmpty(option)
              ? <div style={{height}} />
              :   <ECharts option={option} config={config} style={{height}}     />
            }
            {
              group.length > 0
              ?
              <Group>
                <RadioGroup onChange={(e) => this.onClickGroup(e)}
                            value={currentGroup.en}>
                  {
                    group.map(({en, cn}, index) =>
                      <RadioButton key={index} value={en}>{cn}</RadioButton>)
                  }
                </RadioGroup>
              </Group>
              :
              <div/>
            }
          </Panel>
        </div>
      )
    }
  }
}

EchartTemplate.propTypes = {
  x_data_name: PropTypes.string,//Echart x轴名称
  y_data_name: PropTypes.string,//Echart y轴名称
  width_value :PropTypes.string.isRequired,//Echart表格宽度
  margin_left:PropTypes.string,//Echart表格左外边距
  color:PropTypes.string,//Echart表格颜色
  height: PropTypes.string,//Echart表格高度
  title: PropTypes.string.isRequired,//Echart表格标题
  data: PropTypes.array,//Echart数据源
  onClickGroup:PropTypes.func,//按钮点击事件
  onLegendSelectChange:PropTypes.func,//图例选中事件
  onClickChange:PropTypes.func,//Echart点击事件
  type: PropTypes.string.isRequired,//echarts类型 自定义添加
  identification: PropTypes.string,//组件标识
  group: PropTypes.array,//按钮数组
  dataDictionary: PropTypes.array//数据字典
}

EchartTemplate.defaultProps = {
  height: '300px',
  width_value :'100%',
  margin_left :'2%',
  identification: '',
  color: '#D71920',
  group: [],
  onClickGroup :p=>{},
  onLegendSelectChange :p=>{},
  onClickChange :p=>{}
}

export default EchartTemplate
