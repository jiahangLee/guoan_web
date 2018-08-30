/**
 * Created by liekkas on 2017/3/1.
 */
import React from 'react'
import { connect } from 'dva'
import { SearchBox,  StatsDistribution } from '../../../components'
import  RelationChart  from '../../../components/charts/RelationChart'
import  SankeyChart from '../../../components/charts/SankeyChart'

import genParam from '../genParam'
import { getDefaultDate } from '../../../utils/zdate'
import COLUMNS, { convert, convertKpi, DEFAULT_KPI_LENGTH } from '../../../consts/columns'
import _ from 'lodash'
import { Spin } from 'antd'

// 默认统计按日
const initDate = getDefaultDate('day')

class FlowChartTemplate extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      filterKpiArr: JSON.parse(JSON.stringify(props.kpiArr)),
      periodType : '',
      areaName : ''
    }
  }

  /*componentWillMount () {
    const {kpiArr, biz, bizSubtype} = this.props
    this.fetch({
      areaType: '',
      period: 'day',
      areaName: -1,
      startTime: initDate.start,
      endTime: initDate.end,
      biz,
      bizSubtype,
      fields: _.map(kpiArr, 'en')
    })
  }*/

  onPeriodChange=v=>{
    const filterKpiArr=JSON.parse(JSON.stringify(this.props.kpiArr))
    let temp=filterKpiArr
    temp=_.filter(temp,m=>m.period.includes(v))
    this.setState({filterKpiArr:temp})
  }

  onSearch = (v) => {
    const {region, period} = v
    const {biz, bizSubtype} = this.props
    this.state.periodType = period.type
    this.fetch({
      areaType: region.type,
      period: period.type,
      areaName: region.id,
      startTime: period.start,
      endTime: period.end,
      biz,
      bizSubtype,
      fields: _.map(this.state.filterKpiArr, 'en')
    })
    this.setState({areaName:region.id})
  }

  fetch = (v) => {
    // if(v.period =='30'){
    //   this.props.dispatch({
    //     type: 'common/flowTrendMinute',
    //     payload: genParam(v)
    //   })
    // }else {
    //   this.props.dispatch({
    //     type: 'common/fetchFlowTrend',
    //     payload: genParam(v)
    //   })
    // }

    this.props.dispatch({
      type: 'common/fetchFlowTrend',
      payload: genParam(v)
    })
  }

  render () {
    const {common, loading, labelField, title,columnArr} = this.props
    const {filterKpiArr}=this.state
    const unfixedColumns = filterKpiArr.map(kpi => convertKpi(kpi))
    const fixedColumns = columnArr.map(column => {
      if (column.en === COLUMNS.area_name.en) { //对地区进行中文转义
        return {
          ...convert(column),
          render: (text) => {
            const item = _.find(common.area, {id: text})
            return item ? item.label : (text == 0 ? '全国' : text)
          }
        }
      } else {
        return convert(column)
      }

    })
    // 列表列设置，默认有地区和日期（固定列），后面为指标列（可滚动列）
    const columns = fixedColumns.concat(unfixedColumns)

    // table滚动条长度
    const scrollX = _.sumBy(columnArr, item => item.width) + filterKpiArr.length * DEFAULT_KPI_LENGTH
    const chartConfig = {labelField}

    return (
      <Spin spinning={loading}>
        <SearchBox initValue={{areas: common.area}}
          onSearch={(v) => this.onSearch(v)} bizSubtype="flowTrend"  onPeriodChange={v=>this.onPeriodChange(v)}/>

        <SankeyChart areaName={this.state.areaName} title={title} periodType={this.state.periodType} config={chartConfig} kpis={filterKpiArr} tableData={common.flowTrendData} />

      </Spin>
    )
  }
}

FlowChartTemplate.propTypes = {
  kpiArr: React.PropTypes.array.isRequired,
  columnArr: React.PropTypes.array.isRequired,
  title: React.PropTypes.string,
  biz: React.PropTypes.string,
  bizSubtype: React.PropTypes.string,
  labelField: React.PropTypes.string,
}

FlowChartTemplate.defaultProps = {
  columnArr: [COLUMNS.area_name, COLUMNS.statistic_time], // 默认地区和日期
  bizSubtype: 'common',
  labelField: COLUMNS.statistic_time.en,
  periodType:React.PropTypes.string
}

export default connect(({common, loading}) => ({common, loading: loading.models.common}))(FlowChartTemplate)
