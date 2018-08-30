/**
 * Created by liekkas on 2017/3/23.
 */
import React, { PropTypes } from 'react'
import { DatePicker } from 'antd'
import _ from 'lodash'

const disabledTime = (type) => {
  const minutes = _.range(1, 60)
  return {
      disabledMinutes: () => _.filter(minutes, v => v % type !== 0)
}
}

const ByMinutes = ({rangeMode, type, start, end, onStartChange, onEndChange, format}) => {
  if (rangeMode) {
    return <div>
    <DatePicker value={start} format={format}
    placeholder='开始日期'
    showTime={{hideDisabledOptions: true, format: 'HH:mm'}}
    disabledTime={() => disabledTime(type)}
    onChange={(v) => {
      onStartChange(v)
    }} />
  <label>&nbsp;&nbsp;~&nbsp;&nbsp;</label>
    <DatePicker value={end} format={format}
    placeholder='结束日期'
    showTime={{hideDisabledOptions: true, format: 'HH:mm'}}
    disabledTime={() => disabledTime(type)}
    onChange={(v) => {
      onEndChange(v)
    }} />
  </div>
  } else {
    return <DatePicker value={start} format={format}
    placeholder='开始日期'
    showTime={{hideDisabledOptions: true, format: 'HH:mm'}}
    disabledTime={() => disabledTime(type)}
    onChange={(v) => {
      onStartChange(v)
      onEndChange(v)
    }} />
  }
}

ByMinutes.propTypes = {
  rangeMode: PropTypes.bool,
  type: PropTypes.number,
  start: PropTypes.object,
  end: PropTypes.object,
  format: PropTypes.string,
  onStartChange: PropTypes.func,
  onEndChange: PropTypes.func
}

export default ByMinutes
