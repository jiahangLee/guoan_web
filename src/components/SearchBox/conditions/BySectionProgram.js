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
    const cookies = local.get("sectionProgram"+biz)
    super(props)
    this.state = {
      key:"-1",
      data: cookies==null?[]:_.filter(cookies, v=>v!=null),
      value: [],
      fetching: false,
    }

    this.lastFetchId = 0;
  }


  fetchUser = (value) => {
    if(value === null || value.trim() === '' || typeof value ==='undefined' || value.length==0) {
      const biz = this.props.biz
      const cookies = local.get("sectionProgram" + biz)
      this.setState({data: cookies == null ? [] : _.filter(cookies, v=>v!=null)});
      return
    }

    console.log('fetching program', value);
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    this.setState({ fetching: true });

    const param = `?business=${this.props.biz}&label=${value}`

    fetch(REST_API.PROGRAM+param)
      .then(response => response.json())
      .then((body) => {
        if (fetchId !== this.lastFetchId) { // for fetch callback order
          return;
        }
        const data = body.map(label => ({
          key: `${label}`,
          label: label,
        }));
        this.setState({ data ,fetching: false});
      });
  }



  getValue () {
    const {value} = this.state
    if(this.props.bizSubtype=="apk_pie"){
      return this.state.value
    }
    let values =[]
    for (var i = 0; i < value.length; i++) {
      values.push(value[i])
    }
    return values
  }

  getName(){
    let names  = [];
    if(this.props.bizSubtype=="apk_pie"){
      return this.state.value
    }
    _.forEach(this.state.value,v=>{
      names.push(v)
    })
    return names;
  }

  handleChange = (value) => {
    const biz = this.props.biz
    const cookies = local.get("sectionProgram"+biz)
    if(cookies != null){
      const values = cookies.concat(value);
      const unq = _.uniq(_.map(_.filter(values, v=>v!=null),'key'))

      const fixedColumns = unq.map(column => {
        return this.convertField(column)
      })

      local.set("sectionProgram"+biz,fixedColumns)
    }else {
      local.set("sectionProgram"+biz, value)
    }

    this.setState({
      value,
      fetching: false,
    });
  }

  convertField(field) {
    if(!field) return
    const result = {
      key: field,
      label: field,
    }
    return result
  }

  render() {
    const {biz,bizSubtype} = this.props
    let labelName="条件"
    if((bizSubtype=="program" || bizSubtype=="apk_pie")&& biz=="education"){
      labelName="产品包名称"
    }else if (bizSubtype=="section"||bizSubtype=="programRank"){
      labelName="栏目"
    }else if (bizSubtype=="program"){
      labelName="节目"
    }else if(bizSubtype == 'channelGroupRank'){
      labelName="频道组"
    }else if (bizSubtype == 'channel'){
      labelName="频道"
    }
    const modeValue=bizSubtype=="apk_pie"?"default":"multiple"
    const styleValue=bizSubtype=="programRank" || bizSubtype == 'apk_pie'?{minWidth: '150px'}:cssStyle.getCssStyle()
    const {section} = this.props
    const children = [];
    const { fetching, data, value } = this.state;

    return(
      <ConditionBox>
        <label>{labelName}：</label>
        <Select
          showSearch
          mode={modeValue}
          value={value}
          placeholder="请选择"
          notFoundContent={fetching ? <Spin size="small" /> : null}
          filterOption={false}
          onSearch={this.fetchUser}
          onChange={this.handleChange}
          style={styleValue}
        >
          {data.map(d => <Option key={d.key}>{d.label}</Option>)}
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
