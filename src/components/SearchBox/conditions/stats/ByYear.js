/**
 * Created by liekkas on 2017/3/23.
 */
import React, { PropTypes } from 'react'
import { Select } from 'antd'
import moment from 'moment'
import _ from 'lodash'

const Option = Select.Option
const yearOptions = _.range(2010, 2100).map(v => v + '')

const ByYear = ({rangeMode, start, end, format, onStartChange, onEndChange}) => {
  if (rangeMode) {
    return <div>
      <Select value={start.format(format)} style={{width: 80}}
        onChange={(v) => onStartChange(moment(v, format))}>
        {
          yearOptions.map(v =>
            <Option key={v} value={v} disabled={v > end.format(format)}>{v}</Option>)
        }
      </Select>
      <label>&nbsp;&nbsp;~&nbsp;&nbsp;</label>
      <Select value={end.format(format)} style={{width: 80}}
        onChange={(v) => onEndChange(moment(v, format))}>
        {
          yearOptions.map(v =>
            <Option key={v} value={v} disabled={v < start.format(format)}>{v}</Option>)
        }
      </Select>
    </div>
  } else {
    return <Select value={start.format(format)} style={{width: 80}}
      onChange={(v) => {
        onStartChange(moment(v, format))
        onEndChange(moment(v, format))
      }}>
      {
        yearOptions.map(v => <Option key={v} value={v}>{v}</Option>)
      }
    </Select>
  }
}

ByYear.propTypes = {
  rangeMode: PropTypes.bool,
  start: PropTypes.object,
  end: PropTypes.object,
  format: PropTypes.string,
  onStartChange: PropTypes.func,
  onEndChange: PropTypes.func
}

export default ByYear
