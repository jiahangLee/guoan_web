/**
 * Created by sunjl on 2017/10/18.
 */
import React from 'react'
import styled from 'styled-components'
import {connect} from 'dva'
import {SearchBox} from '../../../components'
import COLUMNS from '../../../consts/columns'
import { Spin, Tabs} from 'antd'
import EchartTemplate from "../../../components/charts/EchartTemplate"
import _ from 'lodash'

const GroupArr_BusinessGroup = [
                  {en: 'programtype', cn: '媒资一级分类喜好群'},
                  {en: 'programtypenamearray', cn: '媒资二级分类喜好群'},
                  {en: 'tags_userdefine', cn: '自定义标签喜好群'},
                  {en: 'tags_category', cn: '豆瓣分类喜好群'},
                  {en: 'tags_director', cn: '导演喜好群'},
                  {en: 'tags_screenwriter', cn: '编剧喜好群'},
                  {en: 'tags_starring', cn: '明星喜好群'},
                  {en: 'tags_language', cn: '媒资语言偏好群'},
                  {en: 'tags_country', cn: '媒资地域偏好群'}
]

const GroupArr_BusinessGroup_EDU = [
  {en: 'channelname', cn: '教育频道信息'},
  {en: 'prefecturename', cn: '教育专区信息'},
  {en: 'productpackagename', cn: '教育产品包信息'},
  {en: 'videoname', cn: '教育视频信息'}
]

const TabPane = Tabs.TabPane
const GroupArr_AllBusiness = [{en: 'useTime', cn: '使用时长', unit: '天'},
                    {en: 'useCount', cn: '使用次数', unit: '次数'}]
                    // {en: 'payment', cn: '支付', unit: '元'} //暂时不使用

const GroupArr_businessArr = [{en: 'all', cn: '全业务'},
                        {en: 'dvb', cn: '直播'},
                        {en: 'ts', cn: '时移'},
                        {en: 'replay', cn: '回看'},
                        {en: 'vod', cn: 'VOD点播'},
                        {en: 'ott', cn: 'OTT点播'},
                        {en: 'game', cn: '游戏'},
                        {en: 'appstore', cn: '应用商店'},
                        {en: 'edu', cn: '教育'},
                        {en: 'in_community', cn: '智慧社区'},
                        {en: 'life_product', cn: '生活产品'},
                        {en: 'ebusiness', cn: '电商平台'}]

const Container = styled.div`
  position: relative;
  padding: 12px 12px;
  margin-bottom: 15px;
  border: solid 1px #d3d3d3;
  background-color: #fff;
  &:hover {
    box-shadow: 0 0 0.5px ${props => props.theme.primaryColor};
  }
`


class PersonasGroupTemplate extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      valueLevel: '0',//十个等级: 0 1 2 3 4 5 6 7 8 9 默认1级
      viscosityLevel: '0',//五个等级: 0 1 2 3 4 默认1级
      valueGroup: GroupArr_AllBusiness[0],// 使用时长:useTime 使用次数:useCount 支付:payment
      viscosityGroup: GroupArr_AllBusiness[0],// 使用时长:useTime 使用次数:useCount 支付:payment
      viscosityBusiness: GroupArr_businessArr[0], //全业务 直播 时移 回看 VOD点播 OTT点播 游戏 APP 应用商店 教育 智慧社区 生活产品 电商平台
      businessGroup:GroupArr_BusinessGroup[0],
      valueBusinessGroup:GroupArr_BusinessGroup[0],
      viscosityBusinessGroup:GroupArr_BusinessGroup[0]
    }
  }

  onPeriodChange = v => {

  }

  onSearch = (v) => {
    const {region, period} = v
    this.state.area = region.id
    this.state.period = period.type //week    month   quarter   year
    this.state.periodValue = period.start //2017380 2017080 20170     2017
    this.onFetch(true, true,true)
  }
  onFetch(value, viscosity,bussinessGroup){
    const {valueLevel, viscosityLevel, valueGroup, valueBusinessGroup, viscosityGroup, viscosityBusinessGroup, viscosityBusiness,businessGroup, area, period, periodValue} = this.state
    //群体画像-价值类
    if(value) {
      const payloadValue1 = {area, period, periodValue}
      const payloadValue2 = {area, period, periodValue, level:valueLevel}
      const payloadValue3 = {area, period, periodValue, level:valueLevel, kpi:valueGroup.en}
      const payloadValue4 = {area, period, periodValue, level:valueLevel, preferenceType: valueBusinessGroup.en, pageSize: "20"}
      this.props.dispatch({type: 'personas/fetchValueLevel', payload: payloadValue1})
      this.props.dispatch({type: 'personas/fetchValueAllBusinessSort', payload: payloadValue3})
      // this.props.dispatch({type: 'personas/fetchValueChildBusinessSort', payload: payloadValue2}) //暂时不用
      this.props.dispatch({type: 'personas/fetchValueArea', payload: payloadValue2})
      this.props.dispatch({type: 'personas/fetchValueTrend', payload: payloadValue2})
      // this.props.dispatch({type: 'personas/fetchValueBusinessPreference', payload: payloadValue2}) //暂时不用
      this.props.dispatch({type: 'personas/fetchValueJudge', payload: payloadValue2})
      this.props.dispatch({type: 'personas/fetchValuePreferenceCluster', payload: payloadValue4})
      this.props.dispatch({type: 'personas/fetchValueTagsCluster', payload: payloadValue2})
    }
    // //群体画像-粘性类
    if(viscosity){
      const payloadViscosity1 = {area, period, periodValue, business:viscosityBusiness.en}
      const payloadViscosity2 = {area, period, periodValue, level:viscosityLevel, business:viscosityBusiness.en}
      const payloadViscosity3 = {area, period, periodValue, level:viscosityLevel, kpi:viscosityGroup.en}
      const payloadViscosity4 = {area, period, periodValue, level:viscosityLevel, business:viscosityBusiness.en}
      const payloadValue5 = {area, period, periodValue, level:viscosityLevel, business:viscosityBusiness.en, preferenceType: viscosityBusinessGroup.en, pageSize: "20"}
      this.props.dispatch({type: 'personas/fetchViscosityOverview', payload: payloadViscosity1})
      this.props.dispatch({type: 'personas/fetchViscosityOverviewLoss', payload: payloadViscosity1})
      this.props.dispatch({type: 'personas/fetchViscosityAllBusinessSort', payload: payloadViscosity3})
      // this.props.dispatch({type: 'personas/fetchViscosityChildBusinessSort', payload: payloadViscosity2}) //暂时不用
      // this.props.dispatch({type: 'personas/fetchViscosityArea', payload: payloadViscosity2})//TODO
      this.props.dispatch({type: 'personas/fetchViscosityArea', payload: payloadViscosity4})//TODO 暂时展示用
      this.props.dispatch({type: 'personas/fetchViscosityTrend', payload: payloadViscosity2})
      this.props.dispatch({type: 'personas/fetchViscosityJudge', payload: payloadViscosity2})
      this.props.dispatch({type: 'personas/fetchViscosityPreferenceCluster', payload: payloadValue5})
      this.props.dispatch({type: 'personas/fetchViscosityTagsCluster', payload: payloadViscosity2})

    }
    if(bussinessGroup){
      const payloadBussinessGroup = {area, period, periodValue, preferenceType:businessGroup.en,pageSize:40}
      this.props.dispatch({type: 'personas/fetchPreferenceCluster', payload: payloadBussinessGroup})
    }
  }
  onClickGroupBusinessGroup (currentBusinessGroup) {
    this.setState({
      businessGroup:currentBusinessGroup
    },()=>{
      this.onFetch(false, false,true)
    })
  }
  onClickGroupValueBusinessGroup (currentValueBusinessGroup) {
    this.setState({
      valueBusinessGroup:currentValueBusinessGroup
    },()=>{
      const {valueLevel, valueBusinessGroup, area, period, periodValue} = this.state
      const payloadValue4 = {area, period, periodValue, level:valueLevel, preferenceType: valueBusinessGroup.en, pageSize: "20"}
      this.props.dispatch({type: 'personas/fetchValuePreferenceCluster', payload: payloadValue4})
    })
  }
  onClickGroupViscosityBusinessGroup (currentViscosityBusinessGroup) {
    this.setState({
      viscosityBusinessGroup:currentViscosityBusinessGroup
    },()=>{
      const {viscosityLevel, viscosityBusinessGroup, viscosityBusiness, area, period, periodValue} = this.state
      const payloadValue5 = {area, period, periodValue, level:viscosityLevel, business:viscosityBusiness.en, preferenceType: viscosityBusinessGroup.en, pageSize: "20"}
      this.props.dispatch({type: 'personas/fetchViscosityPreferenceCluster', payload: payloadValue5})
    })
  }
  onClickChangeValueLevel(item) {
    let valueLevel = parseInt(item.name.substring(4))-1 //Lev.1 Lev.2 >>> 0 1
    this.setState({
      valueLevel: valueLevel.toString()
    }, ()=>{
      this.onFetch(true, false)
    })
  }

  onClickChangeViscosityOverview(item) {
    let viscosityLevel = parseInt(item.seriesIndex)
    this.setState({
      viscosityLevel: viscosityLevel.toString()
    }, ()=>{
      this.onFetch(false, true)
    })
  }

  onClickGroupViscosityOverview(currentBusiness) {
    this.setState({
      viscosityBusiness: currentBusiness
    }, ()=>{
      this.onFetch(false, true)
    })
  }

  onClickGroupValueAllBusinessSort(currentGroup) {
    this.setState({
      valueGroup: currentGroup
    }, ()=>{
      const {valueLevel, valueGroup, area, period, periodValue} = this.state
      const payloadValue3 = {area, period, periodValue, level:valueLevel, kpi:valueGroup.en}
      this.props.dispatch({type: 'personas/fetchValueAllBusinessSort', payload: payloadValue3})
    })
  }

  onClickGroupViscosityAllBusinessSort(currentGroup) {
    this.setState({
      viscosityGroup: currentGroup
    }, ()=>{
      const {viscosityLevel, viscosityGroup, viscosityBusiness, area, period, periodValue} = this.state
      const payloadViscosity3 = {area, period, periodValue, level:viscosityLevel, kpi:viscosityGroup.en, business:viscosityBusiness.en}
      this.props.dispatch({type: 'personas/fetchViscosityAllBusinessSort', payload: payloadViscosity3})
    })
  }

  onClickShowModal(index) {
    const {area, period, periodValue, businessGroup} = this.state
    const param = {area, period, periodValue,tagCategory:businessGroup.en,tagName: this.props.personas.preferenceCluster[index].tagName}
    this.props.dispatch({type: 'personas/fetchObjectiveMarkerTagsOtt', payload: param})

  }

  convertUseCount(data){
    const axisData = data.x_axis
    var arr = new Array()
    for (var i =0;i<axisData.length;i++){
      arr.push(Math.round(axisData[i]))
    }
    const result =  JSON.parse(JSON.stringify(arr))
   return result
  }

  render() {
    const {personas, bizSubtype, loading, categoryArr} = this.props
    const {valueGroup, valueBusinessGroup, viscosityGroup, viscosityBusinessGroup, businessGroup, viscosityBusiness, valueLevel, viscosityLevel} = this.state
    const allValueContent = personas.contentValueAllBusinessSort
    const allViscosityContent = personas.contentViscosityAllBusinessSort
    if(allValueContent[0]){
      const data = allValueContent[0]
      if (data.kpi == 'useCount'){
        allValueContent[0].x_axis = this.convertUseCount(data)
      }
    }
    if(allViscosityContent[0]){
      const data = allViscosityContent[0]
      if (data.kpi == 'useCount'){
        allViscosityContent[0].x_axis = this.convertUseCount(data)
      }
    }
    if(personas.contentValueLevel != null && personas.contentValueLevel.length > 0) {
      personas.contentValueLevel[0].valueLevel = valueLevel;//加粗标红色 显示价值类-当前等级
    }
    if(personas.contentViscosityOverview != null && personas.contentViscosityOverview.length > 0) {
      personas.contentViscosityOverview[0].viscosityLevel = viscosityLevel;//加粗标红色 显示粘性类-当前等级
      const lossUser = personas.contentViscosityOverviewLoss
      if(lossUser.length >0) {
        personas.contentViscosityOverview[0].lossUserCount =lossUser[0].userCount
      }

    }
    return (
      <Spin spinning={loading}>
        <SearchBox bizSubtype={bizSubtype} initValue={{areas: personas.area}}
                   onSearch={(v) => this.onSearch(v)}  onPeriodChange={v=>this.onPeriodChange(v)}/>
        <Tabs defaultActiveKey={categoryArr[0].en} >
          <TabPane tab={categoryArr[0].cn} key={categoryArr[0].en}>
           <Container style={{height:'2000px'}}>
              <EchartTemplate title={`等级`} width_value="96%" onClickChange={(v) => this.onClickChangeValueLevel(v)}
                              identification="valueLevel" data={personas.contentValueLevel} type={'valueLevel'}/>
              <EchartTemplate title={`总业务排行`} width_value="47%" //#FAE4DC
                            x_data_name={valueGroup.unit} y_data_name="业务" group={GroupArr_AllBusiness}
                            currentGroup={valueGroup} onClickGroup={(v) => this.onClickGroupValueAllBusinessSort(v)}
                            identification="valueAllBusinessSort" data={personas.contentValueAllBusinessSort}
                            type={'horizontalBarGraph'}/>
              <EchartTemplate title={`区域分布`} width_value="47%" y_data_name="户"
                            identification="valueArea" data={personas.contentValueArea} type={'verticalBarGraph'}/>
              <EchartTemplate title={`用户趋势`} width_value="47%" y_data_name="用户"
                            identification="valueTrend" data={personas.contentValueTrend} type={'lineChart'}/>
              <EchartTemplate title={`人员判定`} width_value="47%" identification="valueJudge"
                            data={personas.contentValueJudge} type={'judgeDiv'}/>
              <EchartTemplate title={`价值偏好`} width_value="96%" group={[GroupArr_BusinessGroup,GroupArr_BusinessGroup_EDU]}
                           currentGroup={valueBusinessGroup} onClickGroup={(v) => this.onClickGroupValueBusinessGroup(v)}
                           identification="valuePreferenceCluster" data={personas.contentValuePreferenceCluster}
                           type={'preferenceCluster'}/>
              <EchartTemplate title={`人员分群`} width_value="47%" y_data_name="人"
                            identification="valueTagsCluster" data={personas.contentValueTagsCluster}
                            type={'verticalBarGraph'}/>
          </Container>
          </TabPane>
          <TabPane tab={categoryArr[1].cn} key={categoryArr[1].en}>
            <Container style={{height:'2000px'}}>
            <EchartTemplate title={`概况`} width_value="96%" dataDictionary={GroupArr_businessArr} group={GroupArr_businessArr}
                            onClickChange={(v) => this.onClickChangeViscosityOverview(v)} currentGroup={viscosityBusiness}
                            onClickGroup={(v) => this.onClickGroupViscosityOverview(v)} identification="viscosityOverview"
                            data={personas.contentViscosityOverview} type={'viscosityOverview'}/>
            <EchartTemplate title={`总业务排行`} width_value="47%"
                            x_data_name={viscosityGroup.unit} y_data_name="业务" group={GroupArr_AllBusiness}
                            currentGroup={viscosityGroup} onClickGroup={(v) => this.onClickGroupViscosityAllBusinessSort(v)}
                            identification="viscosityAllBusinessSort" data={personas.contentViscosityAllBusinessSort}
                            type={'horizontalBarGraph'}/>
            <EchartTemplate title={`区域分布`} width_value="47%" y_data_name="户"
                            identification="viscosityArea" data={personas.contentViscosityArea} type={'verticalBarGraph'}/>
            <EchartTemplate title={`用户趋势`} width_value="47%"
                            y_data_name="用户"
                            identification="viscosityTrend" data={personas.contentViscosityTrend} type={'lineChart'}/>
            <EchartTemplate title={`人员判定`} width_value="47%"
                            identification="viscosityJudge" data={personas.contentViscosityJudge} type={'judgeDiv'}/>
            <EchartTemplate title={`价值偏好`} width_value="96%" group={[GroupArr_BusinessGroup,GroupArr_BusinessGroup_EDU]}
                            currentGroup={viscosityBusinessGroup} onClickGroup={(v) => this.onClickGroupViscosityBusinessGroup(v)}
                            identification="viscosityPreferenceCluster" data={personas.contentViscosityPreferenceCluster}
                            type={'preferenceCluster'}/>
            <EchartTemplate title={`人员分群`} width_value="47%" y_data_name="人" identification="viscosityTagsCluster"
                            data={personas.contentViscosityTagsCluster} type={'verticalBarGraph'}/>
          </Container>
          </TabPane>
          <TabPane tab={categoryArr[2].cn} key={categoryArr[2].en}>
            <Container style={{height:Math.ceil(personas.preferenceCluster.length/4)*70+290+'px'}}>
              <EchartTemplate title={`概况`} width_value="96%" identification="businessGroup" currentGroup={businessGroup}
                              group={[GroupArr_BusinessGroup,GroupArr_BusinessGroup_EDU]} onClickChange={(v) => this.onClickShowModal(v)}
                              onClickGroup={(v) => this.onClickGroupBusinessGroup(v)}
                              data={[personas.preferenceCluster, personas.objectiveMarkerTagsOtt]} type={'businessGroup'}/>
            </Container>
          </TabPane>
        </Tabs>
      </Spin>
    )
  }
}

PersonasGroupTemplate.propTypes = {
  categoryArr: React.PropTypes.array.isRequired,
  title: React.PropTypes.string,
  biz: React.PropTypes.string,
  bizSubtype: React.PropTypes.string,
  labelField: React.PropTypes.string,
}

PersonasGroupTemplate.defaultProps = {
  bizSubtype: 'personas',
  labelField: COLUMNS.statistic_time.en
}
export default connect(({personas, loading}) => ({personas, loading: loading.models.personas}))(PersonasGroupTemplate)

