/**
 * Created by 王晓普 on 2017/7/18.
 */
import React from 'react'
import { Select } from 'antd';
import ConditionBox from './ConditionBox'
import * as _ from "lodash";
import cssStyle from '../../../consts/cssStyle.js'
class BySection extends React.Component{
  constructor (props) {
    super(props)
    this.state = {
      key:"-1",
      value: [],
      isAll:undefined,
      children: []
    }
  }
  getValue () {
    return this.state.value
  }
  getName(){
    let names  = [];
    if(this.props.bizSubtype =='channel_pie' || this.props.bizSubtype =='area_pie' || this.props.bizSubtype == 'single_pie'){
      return this.state.value
    }
    _.forEach(this.state.value,v=>{
      names.push(_.find(this.props.section, {id: v}).label)
    })
    return names;
  }
  onChange = (value) => {
    const {section,bizSubtype,biz} = this.props
    let values =[]
    for (var i = 0; i < section.length; i++) {
      values.push(section[i].id)
    }
    if (value) {
      for (var i = 0; i < value.length; i++) {
        if(value[i] == 'all'){
          if(values.length == value.length-1){
            value = []
          }else {
            value = values
          }
          break
        }
      }
      this.setState({value})
    }
    this.props.selectChange(value)

    if(biz =='app' || biz == 'game_visit'|| biz == 'game_visit_rt' || (biz=='education' && bizSubtype=='section')) {
      let isAll //全部是否勾选
      if (value.length > 0) {
        isAll = false
        if (value[0] == "全部") {
          //选了全部 不能选其他
          isAll = true
        }
      }
      this.setState({isAll})
      this.setChildrenSecond(section, isAll)
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    const {section,biz} = nextProps
    this.setChildrenSecond(section,this.state.isAll)
  }

  setChildrenSecond(section, isAll) {
    let all = false
    let other = false
    if(typeof(isAll) != "undefined"){
      all = !isAll
      other = isAll
    }

    const {biz,bizSubtype} = this.props
    const Option = Select.Option;
    let children = [];
    let value = this.state.value;
    if (bizSubtype=="channel_pie"||bizSubtype == 'channelGroupRank'||bizSubtype == 'channel'||bizSubtype == 'channel_three') {
      for (var i = 0; i < section.length; i++) {
        if (bizSubtype == 'channelGroupRank'){
          children.push(<Option key='全部频道组' value='all'>{'全部频道组'}</Option>);
        }
        children.push(<Option key={section[i].label} value={section[i].id}>{section[i].label}</Option>);
      }
    } else if(bizSubtype == 'dataAssets'){
      for (var i = 0; i < section.length; i++) {
        children.push(<Option value={section[i].key} key={section[i].key}>{section[i].key}</Option>);
        if(value.length>0){
          if(_.find(section, {key: this.state.value})){
          }else{
            value = []
          }
        }
      }
    }else if(biz =='app' || biz == 'game_visit'|| biz == 'game_visit_rt' || (biz=='education' && bizSubtype=='section')){
      if(section.length > 0 && bizSubtype != 'single_pie') {
        children.push(<Option key="全部"disabled={all}>全部</Option>);
      }
      for (var i = 0; i < section.length; i++) {
        children.push(<Option value={section[i]}  disabled={other} key={section[i]}>{section[i]}</Option>);
      }
    }else{
      for (var i = 0; i < section.length; i++) {
        children.push(<Option value={section[i]} key={section[i]}>{section[i]}</Option>);
      }
    }
    this.setState({
      children :children
    });
  }

  render() {
    const {bizSubtype,biz} = this.props
    let labelName = this.props.labelName
    if ((bizSubtype == "section" || bizSubtype=="programRank"||bizSubtype=="area_pie")&& biz == "education") {
      labelName = "专区名称"
    }else if ((bizSubtype=="program"||bizSubtype=="apk_pie") && biz=="education"){
      labelName="产品包名称"
    }else if (bizSubtype=="section"||bizSubtype=="programRank"){
      labelName="栏目"
    }else if (bizSubtype=="section2" && biz=="ott"){
      labelName="二级栏目"
    }else if (bizSubtype=="program"){
      labelName="节目"
    }else if(bizSubtype == 'channelGroupRank'){
      labelName="频道组"
    }else if (bizSubtype=="channel_pie"||bizSubtype == 'channel' || bizSubtype == 'channel_three'){
      labelName="频道"
    }else if (bizSubtype == 'app' || bizSubtype == 'appname'){
      labelName="应用"
    }else if (biz == 'app' && bizSubtype == 'type1'){
      labelName="一级应用"
    }else if (biz == 'app' && bizSubtype == 'type2'){
      labelName="二级应用"
    }else if ( bizSubtype == 'single_game'){
      labelName="游戏"
    }else if (bizSubtype == 'type1'){
      labelName="一级游戏"
    }else if (bizSubtype == 'type2'){
      labelName="二级游戏"
    }else if (bizSubtype=="section2"){
      labelName="频道名称"
    }else if (bizSubtype=="single_pie"){
      labelName="游戏名称"
    }
    const modeValue=bizSubtype=="channel_pie"||bizSubtype=="programRank"||bizSubtype=="dataAssets"||bizSubtype=="apk_pie"||bizSubtype=="area_pie"||bizSubtype=="single_pie"?"default":"multiple"
    const styleValue=bizSubtype=="channel_pie"||bizSubtype=="programRank"||bizSubtype=="apk_pie"||bizSubtype=="area_pie"||bizSubtype=="single_pie"||bizSubtype=="dataAssets"?{minWidth: '150px'}:cssStyle.getCssStyle()


    return(
      <ConditionBox>
        <label>{labelName}：</label>
        <Select style={styleValue}
                mode={modeValue}
                placeholder="请选择"
                showSearch={true}
                allowClear={true}
                value={this.state.value}
                key={this.state.key}
                onChange={this.onChange}
        >
          {this.state.children}
        </Select>
      </ConditionBox>
    )
  }
}
BySection.propTypes={
  labelName:  React.PropTypes.string,
  biz: React.PropTypes.string.isRequired,
  bizSubtype:React.PropTypes.string.isRequired,
  section:React.PropTypes.array.isRequired,
  selectChange:React.PropTypes.func,
}
BySection.defaultProps={
  labelName:"条件",
  selectChange:v=>{},
}
export default BySection
