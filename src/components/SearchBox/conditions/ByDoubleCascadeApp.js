import React from 'react'
import { Select } from 'antd';
import ConditionBox from './ConditionBox'
import * as _ from "lodash";
import cssStyle from '../../../consts/cssStyle.js'
class ByDoubleCascade extends React.Component{//双层级联下拉框
  constructor (props) {
    super(props)
    this.state = {
      keyFirst:"app",
      valueFirst: [],
      childrenFirst: [],
      keySecond:"-2",
      valueSecond: [],
      childrenSecond: []
    }
  }

  getValue () {
    return {
      valueFirst: this.state.valueFirst,
      valueSecond: this.state.valueSecond
    }
  }

  onChangeFirst = (value) => {
    this.setState({
      valueFirst : value,
      valueSecond :[]
    })

    const childrenSecond = _.uniq(_.map(_.filter(this.props.section, {'app_type': value}),"label"));

    this.setChildrenSecond(childrenSecond,undefined,value)
  }

  onChangeSecond = (value) => {
    const {section}  = this.props
    this.setState({
      valueSecond : value
    })

    let isAll //全部是否勾选
    if (value.length > 0) {
      isAll = false
      if (value[0] == "全部") {
        //选了全部 不能选其他
        isAll = true
      }
    }
    this.setChildrenSecond(section, isAll,this.state.valueFirst)
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    const {section} = nextProps
    this.setChildrenFirst(section)
  }

  setChildrenFirst(section) {
    const Option = Select.Option;
    const {propNameFirst} = this.props
    const sectionParent = _.uniq(_.map(_.filter(section, {'app_type': propNameFirst}),"label"));//pluck取出所有属性值 uniq去重

    let children1 = [];
    children1.push(<Option key="type1" value="type1">{"一级分类"}</Option>);
    children1.push(<Option key="type2" value="type2">{"二级分类"}</Option>);
    children1.push(<Option key="app" value="app">{"应用名称"}</Option>);


    // let children2 = [];
    // for (var i = 0; i < sectionParent.length; i++) {
    //   children2.push(<Option key={sectionParent[i]}>{sectionParent[i]}</Option>);
    // }
    this.setState({
      childrenFirst : children1
      // childrenSecond: children2
    });
  }

  setChildrenSecond(section, isAll,value) {
    const Option = Select.Option;
    let children2 = [];
    let all = false
    let other = false
    if(typeof(isAll) != "undefined"){
      all = !isAll
      other = isAll
    }
    if(section.length > 0) {
      children2.push(<Option key="全部"disabled={all}>全部</Option>);
    }
    const childrenSecond = _.uniq(_.map(_.filter(this.props.section, {'app_type': value}),"label"));
    for (var i = 0; i < childrenSecond.length; i++) {
      children2.push(<Option key={childrenSecond[i]} value={childrenSecond[i]} disabled={other} >{childrenSecond[i]}</Option>);
    }
    this.setState({
      childrenSecond: children2
    });
  }

  render() {
    const {labelNameFirst, labelNameSecond}=this.props
    const modeValue= "multiple"
    const styleValue=cssStyle.getCssStyle()
    const {childrenFirst, childrenSecond} = this.state
    return(
      <ConditionBox>
        <label>{labelNameFirst}：</label>
        <Select style={{minWidth: '150px'}}
                placeholder="请选择"
                value={this.state.valueFirst}
                key={this.state.keyFirst}
                onChange={this.onChangeFirst}
                defaultValue={this.state.keyFirst}
        >
          {childrenFirst}
        </Select>
        &nbsp;&nbsp;
        <label>{labelNameSecond}：</label>
        <Select style={styleValue}
                mode={modeValue}
                placeholder="请选择"
                allowClear={true}
                value={this.state.valueSecond}
                key={this.state.keySecond}
                onChange={this.onChangeSecond}
        >
          {childrenSecond}
        </Select>
      </ConditionBox>
    )
  }
}

ByDoubleCascade.propTypes={
  propNameFirst:React.PropTypes.string.isRequired, //级联框第一个属性名
  propNameSecond:React.PropTypes.string.isRequired, //级联框第二个属性名
  labelNameFirst:React.PropTypes.string.isRequired, //级联框第一个标签名
  labelNameSecond:React.PropTypes.string.isRequired, //级联框第二个标签名
  biz: React.PropTypes.string.isRequired,
  bizSubtype:React.PropTypes.string.isRequired,
  section:React.PropTypes.array.isRequired
}
export default ByDoubleCascade
