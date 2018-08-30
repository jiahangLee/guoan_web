/**
 * Created by liekkas on 2017/3/23.
 */
import React, { PropTypes } from 'react'
import { DatePicker } from 'antd'
const RangePicker = DatePicker.RangePicker

const ByHour = ({rangeMode, start, end, onStartChange, onEndChange, format}) => {
  if (rangeMode) {
    return <div>
      <DatePicker disabledDate={(v) => v > end}
                  value={start}
                  placeholder='开始日期' format={format}
                  showTime={{hideDisabledOptions: true, format: 'HH'}}
                  onChange={(v) => onStartChange(v)}/>
      <label>&nbsp;&nbsp;~&nbsp;&nbsp;</label>
      <DatePicker disabledDate={(v) => v < start}
                  value={end}
                  showTime={{hideDisabledOptions: true, format: 'HH'}}
                  placeholder='结束日期' format={format}
                  onChange={(v) => onEndChange(v)}/>
    </div>
  } else {
    return <DatePicker value={start} format={format}
      placeholder='开始日期'
      showTime={{hideDisabledOptions: true, format: 'HH'}}
      onChange={(v) => {
        onStartChange(v)
        onEndChange(v)
      }} />
  }
}

ByHour.propTypes = {
  rangeMode: PropTypes.bool,
  start: PropTypes.object,
  end: PropTypes.object,
  format: PropTypes.string,
  onStartChange: PropTypes.func,
  onEndChange: PropTypes.func
}

export default ByHour
