import React from 'react'
import { Select } from 'antd';
import ConditionBox from './ConditionBox'
import * as _ from "lodash";
import cssStyle from '../../../consts/cssStyle.js'
class ByDoubleCascade extends React.Component{//三层级联下拉框
  constructor (props) {
    super(props)
    this.state = {
      keyFirst:"-1",
      valueFirst: [],
      childrenFirst: [],
      keySecond:"-2",
      valueSecond: [],
      childrenSecond: [],
      keyThird:"-3",
      valueThird: [],
      childrenThird: []
    }
  }

  getValue () {
    return {
      valueFirst: this.state.valueFirst,
      valueSecond: this.state.valueSecond,
      valueThird: this.state.valueThird
    }
  }

  onChangeFirst = (value) => {
    this.setState({
      valueFirst : value ,
      valueSecond : [],
      valueThird : []
    })
    let childrenSecond = []
    if(value) {
      let param = {}
      param[this.props.propNameFirst] = value
      childrenSecond = _.filter(this.props.section, param)
    }
    this.setChildrenSecond(childrenSecond)
  }

  onChangeSecond = (value) => {
    this.setState({
      valueSecond : value,
      valueThird:[]
    })
    let isAll //全部是否勾选
    // if(value.length > 0) {
    //   isAll = false
    //   if(value[0] == "全部") {
    //     //选了全部 不能选其他
    //     isAll = true
    //   }
    // }
    const {valueFirst} = this.state
    let param = {}
    param[this.props.propNameFirst] = valueFirst
    const childrenSecond = valueFirst.length == 0 ? [] : _.filter(this.props.section, param)
    this.setChildrenSecond(childrenSecond, isAll)

    let param2 = {}
    param2[this.props.propNameSecond] = value
    const childrenThird = value.length == 0 ? [] : _.filter(this.props.section, param2)
    this.setChildrenThird(childrenThird,isAll)

  }

  onChangeThird = (value) => {
    this.setState({
      valueThird : value
    })
    let isAll //全部是否勾选
    if(value.length > 0) {
      isAll = false
      if(value[0] == "全部") {
        //选了全部 不能选其他
        isAll = true
      }
    }
    const {valueSecond} = this.state
    let param = {}
    param[this.props.propNameSecond] = valueSecond
    const childrenThird = valueSecond.length == 0 ? [] : _.filter(this.props.section, param)
    this.setChildrenThird(childrenThird, isAll)
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    const {section} = nextProps
    this.setChildrenFirst(section)
  }

  setChildrenFirst(section) {
    const Option = Select.Option;
    const {propNameFirst} = this.props
    const sectionParent = _.uniq(_.map(section, propNameFirst));//pluck取出所有属性值 uniq去重
    let children1 = [];
    for (var i = 0; i < sectionParent.length; i++) {
      children1.push(<Option key={sectionParent[i]} value={sectionParent[i]}>{sectionParent[i]}</Option>);
    }
    this.setState({
      childrenFirst: children1
    });
  }

  setChildrenSecond(section, isAll) {
    const {propNameSecond} = this.props
    let all = false
    let other = false
    if(typeof(isAll) != "undefined"){
      all = !isAll
      other = isAll
    }
    const Option = Select.Option;
    let children2 = [];
    if(section.length > 0) {
      {/*children2.push(<Option key="全部"disabled={all}>全部</Option>);*/}
    }
    for (var i = 0; i < section.length; i++) {
      children2.push(<Option key={section[i][propNameSecond]} disabled={other}>{section[i][propNameSecond]}</Option>);
    }
    this.setState({
      childrenSecond: children2
    });
  }

  setChildrenThird(section, isAll) {
    const {propNameThird} = this.props
    let all = false
    let other = false
    if(typeof(isAll) != "undefined"){
      all = !isAll
      other = isAll
    }
    const Option = Select.Option;
    let children2 = [];
    if(section.length > 0) {
      children2.push(<Option key="全部"disabled={all}>全部</Option>);
    }
    for (var i = 0; i < section.length; i++) {
      children2.push(<Option key={section[i][propNameThird]} disabled={other}>{section[i][propNameThird]}</Option>);
    }
    this.setState({
      childrenThird: children2
    });
  }

  render() {
    const {labelNameFirst, labelNameSecond ,labelNameThird}=this.props
    const modeValue= "multiple"
    const styleValue=cssStyle.getCssStyle()
    const style2 = JSON.parse('{"minWidth": "150px"}')
    const {childrenFirst, childrenSecond,childrenThird} = this.state
    return(
      <ConditionBox>
        <label>{labelNameFirst}：</label>
        <Select style={style2}
                mode="default"
                placeholder="请选择"
                value={this.state.valueFirst}
                key={this.state.keyFirst}
                onChange={this.onChangeFirst}
        >
          {childrenFirst}
        </Select>
        &nbsp;&nbsp;
        <label>{labelNameSecond}：</label>
        <Select style={style2}
                mode="default"
                placeholder="请选择"
                disabled={childrenSecond.length==0}
                value={this.state.valueSecond}
                key={this.state.keySecond}
                onChange={this.onChangeSecond}
        >
          {childrenSecond}
        </Select>
        &nbsp;&nbsp;
        <label>{labelNameThird}：</label>
        <Select style={styleValue}
                mode={modeValue}
                placeholder="请选择"
                allowClear={true}
                disabled={childrenThird.length==0}
                value={this.state.valueThird}
                key={this.state.keyThird}
                onChange={this.onChangeThird}
        >
          {childrenThird}
        </Select>
      </ConditionBox>
    )
  }
}
ByDoubleCascade.propTypes={
  propNameFirst:React.PropTypes.string.isRequired, //级联框第一个属性名
  propNameSecond:React.PropTypes.string.isRequired, //级联框第二个属性名
  propNameThird:React.PropTypes.string.isRequired, //级联框第三个属性名
  labelNameFirst:React.PropTypes.string.isRequired, //级联框第一个标签名
  labelNameSecond:React.PropTypes.string.isRequired, //级联框第二个标签名
  labelNameThird:React.PropTypes.string.isRequired, //级联框第三个标签名
  biz: React.PropTypes.string.isRequired,
  bizSubtype:React.PropTypes.string.isRequired,
  section:React.PropTypes.array.isRequired
}
export default ByDoubleCascade
