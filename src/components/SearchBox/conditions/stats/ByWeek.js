/**
 * Created by liekkas on 2017/3/23.
 */
import React, { PropTypes } from 'react'
import WeekPicker from './WeekPicker'

const ByWeek = ({rangeMode, start, end, format, onStartChange, onEndChange}) => {
  if (rangeMode) {
    return <div style={{display: 'flex', alignItems: 'center'}}>
      <WeekPicker disabledDate={(v) => v > end}
        defaultValue={start} format={format}
        onChange={(v) => onStartChange(v)} />
      <label>&nbsp;&nbsp;至&nbsp;&nbsp;</label>
      <WeekPicker disabledDate={(v) => v < start}
        defaultValue={end} format={format}
        onChange={(v) => onEndChange(v)} />
    </div>
  } else {
    return <WeekPicker defaultValue={end} format={format}
      onChange={(v) => {
        onStartChange(v)
        onEndChange(v)
      }} />
  }
}

ByWeek.propTypes = {
  rangeMode: PropTypes.bool,
  start: PropTypes.object,
  end: PropTypes.object,
  format: PropTypes.string,
  onStartChange: PropTypes.func,
  onEndChange: PropTypes.func
}

export default ByWeek
