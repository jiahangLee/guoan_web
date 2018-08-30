/**
 * Created by zhangtao on 2017/10/30.
 */
import React from 'react'
import ConditionBox from './ConditionBox'
import * as _ from "lodash";

import { Select, Spin } from 'antd';
const Option = Select.Option;
import { connect } from 'dva'
import fetch from 'dva/fetch'
import REST_API from '../../../consts/api'
import {local, session} from '../../../utils/storage.js'
import cssStyle from '../../../consts/cssStyle.js'


class BySectionProgram extends React.Component{
  constructor (props) {
    const biz =props.biz
    super(props)
    this.state = {
      keyFirst:"use_common",
      valueFirst: [],
      childrenFirst: [],
      keySecond:"-2",
      valueSecond: [],
      childrenSecond: [],
      childrenSecondResult: []
    }

    this.lastFetchId = 0;
  }


  fetchChild = (value) => {
    if(value === null || value.trim() === '' || typeof value ==='undefined' || value.length==0) {
      return
    }

    if (value == 'use_single_game') {
      value = "single_game"
    } else {
      value = value.split("_")[1]
    }

    console.log('fetching program', value);
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    this.setState({ fetching: true });

    const param = `?business=${value}`

    fetch(REST_API.GAMEVISIT+param)
      .then(response => response.json())
      .then((body) => {
        if (fetchId !== this.lastFetchId) { // for fetch callback order
          return;
        }
        this.setState({
          keyFirst : value,
          childrenSecond : body
        })
        this.setChildrenSecond(body,value,undefined)
      });


  }


  onChangeFirst = (value) => {
    this.setState({
      valueFirst : value,
      valueSecond :[]
    })

    this.fetchChild(value)
  }

  onChangeSecond = (value) => {
    const {childrenSecond} = this.state
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

    this.setChildrenSecond(childrenSecond, this.state.keyFirst,isAll)
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    this.setChildrenFirst()
  }

  setChildrenFirst() {
    const Option = Select.Option;

    let children1 = [];
    children1.push(<Option key="use_common" value="use_common">{"全部"}</Option>);
    children1.push(<Option key="use_type1" value="use_type1">{"一级游戏分类"}</Option>);
    children1.push(<Option key="use_type2" value="use_type2">{"二级游戏分类"}</Option>);
    children1.push(<Option key="use_single_game" value="use_single_game">{"单游戏分类"}</Option>);

    this.setState({
      childrenFirst : children1
    });
  }

  setChildrenSecond(section,value,isAll) {
    const Option = Select.Option;
    let children2 = [];

    let all = false
    let other = false
    if(typeof(isAll) != "undefined"){
      all = !isAll
      other = isAll
    }

    if(value =='single_game' || value == 'type1'|| value == 'type2'){
      if(section.length > 0) {
        children2.push(<Option key="全部"disabled={all}>全部</Option>);
      }
      for (var i = 0; i < section.length; i++) {
        children2.push(<Option key={section[i]} disabled={other} >{section[i]}</Option>);
      }
    }else {
      for (var i = 0; i < section.length; i++) {
        children2.push(<Option key={section[i]}>{section[i]}</Option>);
      }
    }
    const dd = _.uniq(children2)
    this.setState({
      childrenSecondResult: children2
    });
  }


  getValue () {
    return {
      valueFirst: this.state.valueFirst,
      valueSecond: this.state.valueSecond
    }
  }


  render() {
    let labelName="条件"
    if((this.props.bizSubtype=="use_common" || this.props.bizSubtype=="use_type1")&& this.props.biz=="use_type2"){
      labelName="游戏"
    }
    const modeValue= "multiple"
    const styleValue=cssStyle.getCssStyle()
    const {childrenFirst,childrenSecondResult} = this.state

    return(
      <ConditionBox>
        <label>游戏类型：</label>
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
        <label>游戏：</label>
        <Select style={styleValue}
                mode={modeValue}
                placeholder="请选择"
                allowClear={true}
                value={this.state.valueSecond}
                disabled={childrenSecondResult.length==0}
                key={this.state.keySecond}
                onChange={this.onChangeSecond}
        >
          {childrenSecondResult}
        </Select>
      </ConditionBox>
    )
  }
}
BySectionProgram.propTypes={
  biz: React.PropTypes.string.isRequired,
  bizSubtype:React.PropTypes.string.isRequired,
  section:React.PropTypes.array.isRequired
}
export default BySectionProgram
