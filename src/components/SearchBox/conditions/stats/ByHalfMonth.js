/**
 * Created by liekkas on 2017/3/23.
 */
import React, { PropTypes } from 'react'
import { DatePicker, Select } from 'antd'
const MonthPicker = DatePicker.MonthPicker
const Option = Select.Option

const halfMonthOptions = [
  {cn: '上半月', en: '0'},
  {cn: '下半月', en: '1'}
]

const ByHalfMonth = ({
                       rangeMode, start, end, startSuffix, endSuffix, format,
                       onStartChange, onEndChange, onStartSuffixChange, onEndSuffixChange
                     }) => {
  const isSameMonth = start.format(format) === end.format(format)
  if (rangeMode) {
    return <div>
      <MonthPicker disabledDate={(v) => v > end}
        value={start} style={{width: 120}}
        placeholder='开始日期' format={format}
        onChange={(v) => onStartChange(v)} />
      <label>&nbsp;&nbsp;</label>
      <Select value={startSuffix} onChange={(v) => onStartSuffixChange(v)}>
        {
          halfMonthOptions.map(v =>
            <Option key={v.en} value={v.en} disabled={isSameMonth && v.en > endSuffix}>{v.cn}</Option>)
        }
      </Select>
      <label>&nbsp;&nbsp;~&nbsp;&nbsp;</label>
      <MonthPicker disabledDate={(v) => v < start}
        value={end} style={{width: 120}}
        placeholder='结束日期' format={format}
        onChange={(v) => onEndChange(v)} />
      <label>&nbsp;&nbsp;</label>
      <Select value={endSuffix} onChange={(v) => onEndSuffixChange(v)}>
        {
          halfMonthOptions.map(v =>
            <Option key={v.en} value={v.en} disabled={isSameMonth && v.en < startSuffix}>{v.cn}</Option>)
        }
      </Select>
    </div>
  } else {
    return <div>
      <MonthPicker value={end} style={{width: 120}}
        placeholder='开始日期' format={format}
        onChange={(v) => {
          onStartChange(v)
          onEndChange(v)
        }} />
      <label>&nbsp;&nbsp;</label>
      <Select value={startSuffix} onChange={(v) => {
        onStartSuffixChange(v)
        onEndSuffixChange(v)
      }}>
        {
          halfMonthOptions.map(v => <Option key={v.en} value={v.en}>{v.cn}</Option>)
        }
      </Select>
    </div>
  }
}

ByHalfMonth.propTypes = {
  rangeMode: PropTypes.bool,
  start: PropTypes.object,
  startSuffix: PropTypes.string,
  end: PropTypes.object,
  endSuffix: PropTypes.string,
  format: PropTypes.string,
  onStartChange: PropTypes.func,
  onStartSuffixChange: PropTypes.func,
  onEndChange: PropTypes.func,
  onEndSuffixChange: PropTypes.func
}

export default ByHalfMonth
