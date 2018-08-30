/**
 * Created by liekkas on 2017/3/23.
 */
import React, { PropTypes } from 'react'
import { DatePicker } from 'antd'
const RangePicker = DatePicker.RangePicker
const MonthPicker = DatePicker.MonthPicker

const ByDay = ({rangeMode, start, end, onStartChange, onEndChange, format}) => {
  if (rangeMode) {
    return <div>
      <DatePicker disabledDate={(v) => v > end}
                  value={start} style={{width: 120}}
                  placeholder='开始日期' format={format}
                  onChange={(v) => onStartChange(v)}/>
      <label>&nbsp;&nbsp;~&nbsp;&nbsp;</label>
      <DatePicker disabledDate={(v) => v < start}
                  value={end} style={{width: 120}}
                  placeholder='结束日期' format={format}
                  onChange={(v) => onEndChange(v)}/>
    </div>
  } else {
    return <DatePicker value={end} style={{width: 120}} format={format}
      placeholder='开始日期'
      onChange={(v) => {
        onStartChange(v)
        onEndChange(v)
      }} />
  }
}

ByDay.propTypes = {
  rangeMode: PropTypes.bool,
  start: PropTypes.object,
  end: PropTypes.object,
  format: PropTypes.string,
  onStartChange: PropTypes.func,
  onEndChange: PropTypes.func
}

export default ByDay
