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
    const bizSubtype =props.bizSubtype
    const cookies = local.get("sectionProgram"+biz+bizSubtype)
    super(props)
    this.state = {
      key:"-1",
      data: cookies==null?[]:cookies,
      value: [],
      fetching: false,
    }

    this.lastFetchId = 0;
  }


  fetchUser = (value) => {
    if(value === null || value.trim() === '' || typeof value ==='undefined' || value.length==0) {
      const {biz,bizSubtype} = this.props
      const cookies = local.get("sectionProgram" + biz+bizSubtype)
      this.setState({data: cookies == null ? [] : cookies});
      return
    }

    console.log('fetching program', value);
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    this.setState({ fetching: true });

    const param = `?business=${this.props.bizSubtype}&label=${value}`

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
    let values =[]
    for (var i = 0; i < value.length; i++) {
      values.push(value[i].key)
    }
    return values
  }

  getName(){
    let names  = [];
    _.forEach(this.state.value,v=>{
      names.push(v.label)
    })
    return names;
  }

  handleChange = (value) => {
    const {biz,bizSubtype} = this.props
    const cookies = local.get("sectionProgram"+biz+bizSubtype)
    if(cookies != null){
      const values = cookies.concat(value);
      const unq = _.uniq(_.map(values,'key'))

      const fixedColumns = unq.map(column => {
        return this.convertField(column)
      })

      local.set("sectionProgram"+biz+bizSubtype,fixedColumns)
    }else {
      local.set("sectionProgram"+biz+bizSubtype, value)
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
    let labelName="条件"
    if(this.props.bizSubtype=="program_three" ){
      labelName="节目"
    }else if(this.props.bizSubtype=="series_three" ){
      labelName="剧集"
    }
    const modeValue=this.props.bizSubtype=="programRank"?"default":"multiple"
    const styleValue=this.props.bizSubtype=="programRank"?{minWidth: '150px'}:cssStyle.getCssStyle()
    const {section} = this.props
    const children = [];
    const { fetching, data, value } = this.state;

    return(
      <ConditionBox>
        <label>{labelName}：</label>
        <Select
          mode="multiple"
          labelInValue
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
