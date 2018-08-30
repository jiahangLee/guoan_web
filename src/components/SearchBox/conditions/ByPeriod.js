/**
 * Created by liekkas on 16/3/24.
 * 统计粒度 - 区间模式
 */
import React, { PropTypes } from 'react'
import Condition from './Condition'
import moment from 'moment'
import ConditionBox from './ConditionBox'
import ByDay from './stats/ByDay'
import ByWeek from './stats/ByWeek'
import ByMonth from './stats/ByMonth'
import ByYear from './stats/ByYear'
import ByHour from './stats/ByHour'
import ByMinutes from './stats/ByMinutes'
import ByHalfMonth from './stats/ByHalfMonth'
import ByQuarter from './stats/ByQuarter'
import ByGoldTime from './stats/ByGoldTime'
import { getDefaultDate, DATE_FORMAT } from '../../../utils/zdate'

const DEFAULT_DATE_VALUE = getDefaultDate('day')

const SHOW_FORMAT = {
  day: 'YYYY-MM-DD',
  60: 'YYYY-MM-DD HH:00:00',
  goldTime: 'YYYY-MM-DD',
  30: 'YYYY-MM-DD HH:mm:00',
  15: 'YYYY-MM-DD HH:mm:00',
  5: 'YYYY-MM-DD HH:mm:00',
  1: 'YYYY-MM-DD HH:mm:00',
  month: 'YYYY年M月',
  halfmonth: 'YYYY年M月',
  week: 'YYYY第Wo',
  quarter: 'YYYY年',
  year: 'YYYY年'
}

const conditions = [
  {cn: '日', en: 'day'},
  {cn: '1分钟', en: '1'},
  {cn: '5分钟', en: '5'},
  {cn: '15分钟', en: '15'},
  {cn: '30分钟', en: '30'},
  {cn: '时', en: '60'},
  {cn: '周', en: 'week'},
  {cn: '半月', en: 'halfmonth'},
  {cn: '月', en: 'month'},
  {cn: '季度', en: 'quarter'},
  {cn: '年', en: 'year'},
]

function getStart(props){
  const {defaultPeriodType} = props
  if(typeof(defaultPeriodType)!="undefined") {
    return moment(getDefaultDate(defaultPeriodType).start, DATE_FORMAT[defaultPeriodType])
  }
  return props.start
}

function getEnd(props){
  const {defaultPeriodType} = props
  if(typeof(defaultPeriodType)!="undefined") {
    return moment(getDefaultDate(defaultPeriodType).end, DATE_FORMAT[defaultPeriodType])
  }
  return props.end
}

class ByPeriod extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      statType: props.defaultPeriodType,//'week',
      start: getStart(props),
      startSuffix: '0',  // 比如半月、季度等
      end: getEnd(props),
      endSuffix: '0'
    }
  }


  renderRange () {
    const {start, end, startSuffix, endSuffix, statType} = this.state
    const {rangeMode} = this.props
    const props = {start, end, startSuffix, endSuffix, rangeMode, format: SHOW_FORMAT[statType]}
    const mainChange = {
      onStartChange: start => this.setState({start}),
      onEndChange: end => this.setState({end})
    }
    const suffixChange = {
      onStartSuffixChange: startSuffix => this.setState({startSuffix}),
      onEndSuffixChange: endSuffix => this.setState({endSuffix})
    }
    switch (statType) {
      case 'day':
        return <ByDay {...props} {...mainChange} />
      case 'halfmonth':
        return <ByHalfMonth {...props} {...mainChange} {...suffixChange} />
      case 'month':
        return <ByMonth {...props} {...mainChange} />
      case 'year':
        return <ByYear {...props} {...mainChange} />
      case 'quarter':
        return <ByQuarter {...props} {...mainChange} {...suffixChange} />
      case 'week':
        return <ByWeek {...props} {...mainChange} />
      case 'goldTime':
        return <ByGoldTime {...props} {...mainChange} {...suffixChange} />
      case '60':
        return <ByHour {...props} {...mainChange} />
      case '30':
      case '15':
      case '5':
      case '1':
        return <ByMinutes {...props} {...mainChange} type={parseInt(statType)} />
      default:
        return <ByDay {...props} {...mainChange} />
    }
  }

  handleStatTypeChange (value) {
    const initValue = getDefaultDate(value)
    this.setState({
      statType: value,
      start: moment(initValue.start, DATE_FORMAT[value]),
      end: moment(initValue.end, DATE_FORMAT[value]),
      startSuffix: '0',
      endSuffix: '0'
    })
    if (this.props.onPeriodChange){
      this.props.onPeriodChange(value)
    }
  }

  getValue () {
    const {start, end, statType, startSuffix, endSuffix} = this.state
    const {rangeMode} = this.props
    //
    const startTime = start.format(DATE_FORMAT[statType])+startSuffix

    const endTime = (rangeMode ? end.format(DATE_FORMAT[statType]) : startTime)+endSuffix
    // if (startTime == endTime && startSuffix > endSuffix) {
    //  message.warning('起始时间要小于结束时间!')
    //  return null
    // }

    return {
      type: statType,
      start: startTime,
      end: endTime,
      startSuffix,
      endSuffix
    }
  }

  render () {
    const {periodTypes} = this.props
    let periodTypeArray = conditions
    if(typeof(periodTypes)!="undefined") {
      periodTypeArray = periodTypes
    }
    return (
      <ConditionBox>
        <Condition label='统计粒度' options={periodTypeArray} width={90}
          onConditionChange={v => this.handleStatTypeChange(v)} />
        &nbsp;&nbsp;
        {this.renderRange()}
      </ConditionBox>
    )
  }
}

ByPeriod.propTypes = {
  periodTypes: PropTypes.array,//统计粒度日期类型种类 第一个为默认日期
  defaultPeriodType: PropTypes.string,//默认日期类型
  start: PropTypes.object,
  end: PropTypes.object,
  rangeMode: PropTypes.bool,
  onPeriodChange:PropTypes.func
}

ByPeriod.defaultProps = {
  defaultPeriodType: 'day' ,
  start: moment(DEFAULT_DATE_VALUE.start, DATE_FORMAT.day),
  end: moment(DEFAULT_DATE_VALUE.end, DATE_FORMAT.day),
  rangeMode: true
}

export default ByPeriod
