/**
 * Created by liekkas on 16/10/25.
 */
import React from 'react'
import Calendar from 'rc-calendar'
import DatePicker from 'rc-calendar/lib/Picker'
import zhCN from 'rc-calendar/lib/locale/zh_CN'
import './rc-calendar.css'
import moment from 'moment'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')
moment.updateLocale('zh-cn', {
  week: {
//     dow: 7 //set sunday as the first day of week
  }
})
// now.locale('zh-cn').utcOffset(8);

class WeekPicker extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: props.defaultValue,
      open: false
    }
  }

  onChange (value) {
    this.setState({
      value
    })
    this.props.onChange(value)
  }

  onOpenChange (open) {
    this.setState({
      open
    })
  }

  dateRender (current) {
    const selectedValue = this.state.value
    if (selectedValue && current.year() === selectedValue.year() &&
      current.week() === selectedValue.week()) {
      return (<div className='rc-calendar-selected-day'>
        <div className='rc-calendar-date'>
          {current.date()}
        </div>
      </div>)
    }
    return (
      <div className='rc-calendar-date'>
        {current.date()}
      </div>)
  }

  render () {
    const state = this.state
    const calendar = (
      <Calendar
        className='week-calendar'
        showWeekNumber
        showToday
        dateRender={(v) => this.dateRender(v)}
        locale={zhCN}
        style={{zIndex: 1000, top: '-8px', left: '-2px'}}
        dateInputPlaceholder='please input'
        showDateInput={false}
        disabledDate={(v) => this.props.disabledDate(v)}
      />)
    return (<div style={{width: 120}}>
      <div style={{
        boxSizing: 'border-box',
        position: 'relative',
        display: 'block'
      }}
      >
        <DatePicker
          onOpenChange={(v) => this.onOpenChange(v)}
          open={this.state.open}
          calendar={calendar}
          animation='slide-up'
          value={state.value}
          onChange={(v) => this.onChange(v)}
        >
          {
            ({value}) => {
              return (
                <span tabIndex='0'>
                  <input
                    readOnly
                    tabIndex='-1'
                    className='ant-calendar-picker-input ant-input'
                    value={(value && value.format(this.props.format)) || ''}
                  />
                </span>
              )
            }
          }
        </DatePicker>
      </div>
    </div>)
  }
}

WeekPicker.propTypes = {
  defaultValue: React.PropTypes.object,
  format: React.PropTypes.string,
  onChange: React.PropTypes.func,
  disabledDate: React.PropTypes.func
}
WeekPicker.defaultProps = {
  disabledDate: (v) => {}
}

export default WeekPicker
