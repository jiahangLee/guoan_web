/**
 * Created by liekkas on 2017/3/23.
 */
import React, { PropTypes } from 'react'
import { DatePicker } from 'antd'
const MonthPicker = DatePicker.MonthPicker

const ByMonth = ({rangeMode, start, end, format, onStartChange, onEndChange}) => {
  if (rangeMode) {
    return <div>
      <MonthPicker disabledDate={(v) => v > end}
        value={start} style={{width: 120}}
        placeholder='开始日期' format={format}
        onChange={(v) => onStartChange(v)} />
      <label>&nbsp;&nbsp;~&nbsp;&nbsp;</label>
      <MonthPicker disabledDate={(v) => v < start}
        value={end} style={{width: 120}}
        placeholder='结束日期' format={format}
        onChange={(v) => onEndChange(v)} />
    </div>
  } else {
    return <MonthPicker value={end} style={{width: 120}}
      placeholder='开始日期' format={format}
      onChange={(v) => {
        onStartChange(v)
        onEndChange(v)
      }} />
  }
}

ByMonth.propTypes = {
  rangeMode: PropTypes.bool,
  start: PropTypes.object,
  end: PropTypes.object,
  format: PropTypes.string,
  onStartChange: PropTypes.func,
  onEndChange: PropTypes.func
}

export default ByMonth
