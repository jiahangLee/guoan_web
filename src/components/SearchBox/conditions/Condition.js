/**
 * Created by liekkas on 16/4/11.
 */
import React, { PropTypes } from 'react'
import { Select } from 'antd'
import _ from 'lodash'
const Option = Select.Option

class Condition extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      option: props.defaultOption
        ? props.defaultOption
        : typeof (props.options[0]) === 'object'
            ? props.options[0].en
            : props.options[0]
    }
  }

  handleChange (value) {
    this.setState({option: value})
    if (this.props.onConditionChange) {
      this.props.onConditionChange(value)
    }
  }

  getValue () {
    const v = _.find(this.props.options,
      item => item === this.state.option || item.en === this.state.option)
    return v
  }

  render () {
    const { label, options, width, showSearch } = this.props

    const p = {
      showSearch,
      defaultValue: this.state.option,
      style: { width },
      placeholder: '请选择',
      searchPlaceholder: '请输入关键词',
      optionFilterProp: 'children',
      notFoundContent: '无法找到'
    }

    return (
      <div>
        {
          label !== '' ? <label>{label}： </label> : null
        }
        <Select {...p} onChange={(v) => this.handleChange(v)}>
          {
            typeof (options[0]) === 'object'
              ? options.map(({cn, en}, index) =>
                <Option value={en} key={index}>{cn}</Option>
                )
              : options.map((name, index) =>
                <Option value={name} key={index}>{name}</Option>
                )
          }
        </Select>
      </div>
    )
  }
}

Condition.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  defaultOption: PropTypes.string,
  onConditionChange: PropTypes.func,
  width: PropTypes.number,
  showSearch: PropTypes.bool,
  style: PropTypes.bool
}

Condition.defaultProps = {
  label: '',
  options: [],
  defaultOption: null,
  width: 100,
  showSearch: false
}

export default Condition
