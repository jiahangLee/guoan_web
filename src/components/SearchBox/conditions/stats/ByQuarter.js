/**
 * Created by liekkas on 2017/3/23.
 */
import React, { PropTypes } from 'react'
import { Select } from 'antd'
import _ from 'lodash'
import moment from 'moment'

const Option = Select.Option

const yearOptions = _.range(2010, 2100).map(v => v + '')

const quarterOptions = [
  {cn: '一季度', en: '0'},
  {cn: '二季度', en: '1'},
  {cn: '三季度', en: '2'},
  {cn: '四季度', en: '3'}
]

const ByQuarter = ({
                     rangeMode, start, end, startSuffix, endSuffix, format,
                     onStartChange, onEndChange, onStartSuffixChange, onEndSuffixChange
                   }) => {
  const isSameYear = start.format(format) === end.format(format)

  if (rangeMode) {
    return <div>
      <Select value={start.format(format)} style={{width: 80}}
        onChange={(v) => onStartChange(moment(v, format))}>
        {
          yearOptions.map(v =>
            <Option key={v} value={v} disabled={v > end.format(format)}>{v}</Option>)
        }
      </Select>
      &nbsp;&nbsp;
      <Select value={startSuffix} style={{width: 80}}
        onChange={(v) => onStartSuffixChange(v)}>
        {
          quarterOptions.map(v =>
            <Option key={v.en} value={v.en} disabled={isSameYear && v.en > endSuffix}>{v.cn}</Option>)
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
      &nbsp;&nbsp;
      <Select value={endSuffix} style={{width: 80}}
        onChange={(v) => onEndSuffixChange(v)}>
        {
          quarterOptions.map(v =>
            <Option key={v.en} value={v.en} disabled={isSameYear && v.en < startSuffix}>{v.cn}</Option>)
        }
      </Select>
    </div>
  } else {
    return <div>
      <Select value={start.format(format)} style={{width: 80}}
        onChange={(v) => {
          onStartChange(moment(v, format))
          onEndChange(moment(v, format))
        }}>
        {
          yearOptions.map(v => <Option key={v} value={v}>{v}</Option>)
        }
      </Select>
      &nbsp;&nbsp;
      <Select value={startSuffix} style={{width: 80}}
        onChange={(v) => {
          onStartSuffixChange(v)
          onEndSuffixChange(v)
        }}>
        {
          quarterOptions.map(v =>
            <Option key={v.en} value={v.en}>{v.cn}</Option>)
        }
      </Select>
    </div>
  }
}

ByQuarter.propTypes = {
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

export default ByQuarter
