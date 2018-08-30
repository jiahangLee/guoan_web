//搜索输入框
import { Select } from 'antd';
import React, { PropTypes } from 'react'
import ConditionBox from './ConditionBox'

class BySelectInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value:'',
    }
  }
  getValue () {
    return this.state.value
  }
  handleChange = (event)=> {
    this.setState({value: event});
  }
  render() {
    const children = [];
    const {defaultValue,option,title} = this.props
     if(!_.isEmpty(option)){
       for (let i in option ) {
         if(option[i].key&&option[i].value){
           children.push(<Select.Option key={option[i].key}>{option[i].value}</Select.Option>)
         }
       }
     }
    return (
      <ConditionBox>
        <label>{title} ：</label>
        <Select mode="combobox" defaultValue={defaultValue} onChange={this.handleChange} style={{width: '150px'}}>
            {children}
        </Select>
      </ConditionBox>
    );
  }
}

BySelectInput.propTypes={
  option:React.PropTypes.array,
  title: React.PropTypes.string,
  defaultValue:React.PropTypes.string,
}


export default BySelectInput
