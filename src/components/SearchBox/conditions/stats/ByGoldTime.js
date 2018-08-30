/**
 * Created by liekkas on 2017/3/23.
 */
import React, { PropTypes } from 'react'
import { DatePicker, Select } from 'antd'
const RangePicker = DatePicker.RangePicker
const Option = Select.Option

const goldTimeOptions = [
  {cn: '11-13时', en: '0'},
  {cn: '19-22时', en: '1'},
  {cn: '22-24时', en: '2'}
]

const ByGoldTime = ({
                      rangeMode, start, end, startSuffix, format,
                      onStartChange, onEndChange, onStartSuffixChange, onEndSuffixChange
                     }) => {
  if (rangeMode) {
    return <div>
      <RangePicker value={[start, end]} format={format}
        placeholder={['开始时间', '结束时间']} style={{width: 200}}
        onChange={(v) => {
          onStartChange(v[0])
          onEndChange(v[1])
        }} />
      <label>&nbsp;&nbsp;</label>
      <Select value={startSuffix} style={{width: 80}}
        onChange={(v) => {
          onStartSuffixChange(v)
          onEndSuffixChange(v)
        }}>
        {
          goldTimeOptions.map(v => <Option key={v.en} value={v.en}>{v.cn}</Option>)
        }
      </Select>
    </div>
  } else {
    return <div>
      <DatePicker value={start} style={{width: 120}}
        placeholder='开始日期' format={format}
        onChange={(v) => {
          onStartChange(v)
          onEndChange(v)
        }} />
      <label>&nbsp;&nbsp;</label>
      <Select value={startSuffix} style={{width: 80}}
        onChange={(v) => {
          onStartSuffixChange(v)
          onEndSuffixChange(v)
        }}>
        {
          goldTimeOptions.map(v => <Option key={v.en} value={v.en}>{v.cn}</Option>)
        }
      </Select>
    </div>
  }
}

ByGoldTime.propTypes = {
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

export default ByGoldTime
