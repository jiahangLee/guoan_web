/**
 * Created by zhangtao on 2017/10/23.
 */
import React from 'react'
import { Select } from 'antd';
import ConditionBox from './ConditionBox'
import * as _ from "lodash";
import cssStyle from '../../../consts/cssStyle.js'
class ByDvbProgram extends React.Component{
  constructor (props) {

    super(props)
    this.state = {
      key:"-1",
      value: [],
      pkey:"-2",
      pvalue: [],
      channelChildren :[],
      programChildren : []
    }
  }
  getValue () {
    return this.state.value + "dvbProgram" +this.state.pvalue
  }

  getName(){
    let names  = [];
    _.forEach(this.state.pvalue,v=>{
      names.push(_.find(this.props.section, {program_name: v}).program_name)
    })
    return _.uniq(names);
  }
  onChange = (value) => {
    const {section} = this.props
    let programData = []
    if(value ==undefined || value =="" || value.length==0){
      this.setState({value:[],programChildren:[],pvalue:[]})
    }
    else if (value) {
      // for (var i = 0; i < value.length; i++) {
        programData.push(_.uniq(_.map(_.filter(section, {'channel_label': value}),"program_name")))
      // }

      const filterArr = _.uniq(programData)
      const filterMap = []
      for (var i = 0; i < filterArr.length; i++) {
        for (var j = 0; j < filterArr[i].length; j++) {
          filterMap.push(<Option key={filterArr[i][j]} value={filterArr[i][j]}>{filterArr[i][j]}</Option>);
        }
      }

      this.setState({value,programChildren:filterMap,pvalue:[]})
    }
  }

  onChangeProgram = (pvalue) => {
    if (pvalue) {
      this.setState({pvalue})
    }
  }


  render() {
    const modeValue=this.props.bizSubtype=="programRank"?"default":"multiple"
    const styleValue=this.props.bizSubtype=="programRank"?{minWidth: '150px'}:cssStyle.getCssStyle()

    const {section} = this.props
    const Option = Select.Option;
    const channelChildren1 = [];

    const channelMap =  _.uniq(_.map(section, "channel_label"))

    for (var i = 0; i < channelMap.length; i++) {
      channelChildren1.push(<Option key={channelMap[i]} value={channelMap[i]}>{channelMap[i]}</Option>);
    }

    this.state.channelChildren = channelChildren1

    return(
      <ConditionBox>
        <label>{'频道'}：</label>
        <Select style={{minWidth: '150px'}}
                mode="combobox"
                placeholder="请选择"
                allowClear={true}
                value={this.state.value}
                key={this.state.key}
                onChange={this.onChange}
        >
          {this.state.channelChildren}
        </Select>

        <label>{'节目'}：</label>
        <Select style={styleValue}
                mode={modeValue}
                placeholder="请选择"
                allowClear={true}
                value={this.state.pvalue}
                key={this.state.pkey}
                onChange={this.onChangeProgram}

        >
          {this.state.programChildren}
        </Select>

      </ConditionBox>
    )
  }
}

ByDvbProgram.propTypes={
  biz: React.PropTypes.string.isRequired,
  bizSubtype:React.PropTypes.string.isRequired,
  section:React.PropTypes.array.isRequired
}
export default ByDvbProgram
