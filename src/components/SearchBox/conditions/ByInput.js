/**
 * Created by liekkas on 16/3/24.
 * 统计粒度 - 区间模式
 */
import React, { PropTypes } from 'react'
import ConditionBox from './ConditionBox'
import { Input } from 'antd'


class ByInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value : this.props.value
    }
  }
  getValue () {
    return this.state.value
  }
  handleChange = (event)=> {
    this.setState({value: event.target.value});
  }
  render () {
    const{title,value} = this.props
    if(title != ''){
      return (
        <ConditionBox>
          <label>{title} ：</label>
          <Input  onChange = {this.handleChange}  style={{ width: '150px',overflow: 'auto'}} />
        </ConditionBox>
      )
    }else {
      return (
        <ConditionBox>
          <Input   onChange = {this.handleChange}   style={{ width: '150px',overflow: 'auto'}} />
        </ConditionBox>

      )
    }

  }
}


ByInput.propTypes = {
  title: React.PropTypes.string,
  value: React.PropTypes.string,
}
ByInput.defaultProps = {
  title:'',
  value:''
}

export default ByInput
