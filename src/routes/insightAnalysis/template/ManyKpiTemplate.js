/**
 * Created by liekkas on 2017/3/1.
 */
import React from 'react'
import {connect} from 'dva'
import {SearchBox, FPTable, KpiChart, KpiCategory, StatsDistribution} from '../../../components'
import genParam from '../genParam'
import sectionOrProgram from '../sectionOrProgram'
import {getDefaultDate} from '../../../utils/zdate'
import COLUMNS, {convert, convertKpi, DEFAULT_KPI_LENGTH} from '../../../consts/columns'
import KPIS from '../../../consts/kpis'
import _ from 'lodash'
import {Spin} from 'antd'

// 默认统计按日
const initDate = getDefaultDate('day')
class ManyKpiTemplate extends React.PureComponent {
  constructor(props) {
    super(props)
    const currentLabelName = props.kpiGroup[0].label
    const filterKpis = JSON.parse(JSON.stringify(props.kpiGroup))
    let temp = filterKpis
    _.forEach(temp, p => {
      p.value = _.filter(p.value, m => m.period.includes("day"))
    })

    const item = _.find(temp, {label: currentLabelName})
    this.state = {
      kpiArr: item.value,
      filterKpis: temp,
      currentLabel: currentLabelName,
      areaCode: ''
    }
  }

  onCategoryChange = (v) => {
    const item = _.find(this.state.filterKpis, {label: v})
    this.setState({kpiArr: item.value, currentLabel: v})
  }

  onPeriodChange = v => {
    if(KPIS.areaArr.includes(this.state.areaCode)){
      return
    }
    const {biz,bizSubtype} = this.props
    const filterKpis = JSON.parse(JSON.stringify(this.props.kpiGroup))
    let temp = filterKpis
    _.forEach(temp, p => {
      p.value = _.filter(p.value, m => m.period.includes(v))
    })
    const {currentLabel}=this.state
    const item= _.find(temp, {label: currentLabel})
    this.setState({kpiArr: item.value, filterKpis: temp})
  }

  componentWillMount() {
    const {biz, bizSubtype, kpiGroup} = this.props
    if (bizSubtype == "section" || bizSubtype == "program" || bizSubtype == "programRank") {
      this.fetch0({
        biz,
        bizSubtype
      })
    } else if (bizSubtype == "channelGroupRank") {
      this.fetch2(biz,
        bizSubtype);
    }else if (bizSubtype == "channel"){
      this.fetch4(biz,
        bizSubtype);
    }
    /*this.fetch({
     areaType: '',
     period: 'day',
     areaName: -1,
     startTime: initDate.start,
     endTime: initDate.end,
     biz,
     bizSubtype,
     fields: _.map(_.flatten(_.map(kpiGroup, 'value')), 'en') // 一并传入所有指标字段
     })*/

  }

  onSearch = (v) => {
    const {region, period, sectionOrProgram} = v
    const {biz, bizSubtype} = this.props
    let param = {
      areaType: region.type,
      period: period.type,
      areaName: region.id,
      startTime: period.start,
      endTime: period.end,
      biz,
      bizSubtype,
      fields: _.map(_.flatten(_.map(this.state.filterKpis, 'value')), 'en') // 一并传入所有指标字段
    }
    if (sectionOrProgram) {
      if (bizSubtype == "programRank"||bizSubtype == "channelGroupRank") {
        param = {...param, sectionName: sectionOrProgram}
      } else {
        param = {...param, bizCustom1: sectionOrProgram}
      }
    }
    if (bizSubtype == "programRank" || bizSubtype == "sectionRank") {
      this.fetch1(param)
    }else if (bizSubtype == "channelGroupRank") {
      this.fetch3(param)
    }else if (bizSubtype == "threeRank") {
      this.fetch5(param)
    } else {
      this.fetch(param)
    }


  }

  onRegionChange = v => {
    const filterKpis = JSON.parse(JSON.stringify(this.props.kpiGroup))
    let temp = filterKpis
    const {biz, bizSubtype, kpiGroup} = this.props
    if (bizSubtype == 'threeRank' && biz == 'dvb') {
      _.forEach(temp, p => {
        if (p.label == '使用时长类') {
          p.value = _.filter(p.value, m => m.areaRP.includes(v))
        }
      })
    } else {
      _.forEach(temp, p => {
        if (this.props.biz == 'replay_three') {
          p.value = _.filter(p.value, m => m.areaRP.includes(v))
        } else {
          p.value = _.filter(p.value, m => m.area.includes(v))
        }
      })
    }
    const {currentLabel}=this.state
    const item = _.find(temp, {label: currentLabel})
    this.setState({kpiArr: item.value, filterKpis: temp,areaCode: v})
  }


  fetch = (v) => {
    this.props.dispatch({
      type: 'common/fetch',
      payload: genParam(v)
    })
  }
  fetch1 = (v) => {
    this.props.dispatch({
      type: 'common/fetchProgramRank',
      payload: genParam(v)
    })
  }

  fetch2 = (v) => {
    this.props.dispatch({
      type: 'common/fetchChannelGroup',
      payload: sectionOrProgram(v)
    })
  }
  fetch3 = (v) => {
    this.props.dispatch({
      type: 'common/fetchChannelGroupRend',
      payload: genParam(v)
    })
  }
  fetch4 = (v) => {
    this.props.dispatch({
      type: 'common/fetchChannel',
      payload: sectionOrProgram(v)
    })
  }
  fetch5 = (v) => {
    this.props.dispatch({
      type: 'common/fetchThreeRank',
      payload: genParam(v)
    })
  }
  fetch0 = (v) => {
    let request
    if (v.bizSubtype == "section" || v.bizSubtype == "programRank") {
      request = {
        type: 'common/fetchSection',
        payload: sectionOrProgram(v)
      }
    } else if (v.bizSubtype == "program") {
      request = {
        type: 'common/fetchProgram',
        payload: sectionOrProgram(v)
      }
    }
    this.props.dispatch(request)
  }

  render() {
    const {common, loading, labelField, title, columnArr, legendField, bizSubtype,biz} = this.props
    const {kpiArr} = this.state
    const unfixedColumns = kpiArr.map(kpi => convertKpi(kpi))
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
    const scrollX = _.sumBy(columnArr, item => item.width) + kpiArr.length * DEFAULT_KPI_LENGTH +1600
    const chartConfig = {labelField, legendField}

    var exportSize = 0
    if(common) exportSize = common.list.length
    if(bizSubtype == 'channelGroupRank' && biz == 'dvb'){
      exportSize = 500
    }

    return (
      <Spin spinning={loading}>
        <SearchBox initValue={{areas: common.area, section: common.section}}
                   onSearch={(v) => this.onSearch(v)} bizSubtype={bizSubtype} biz={this.props.biz}
                   onPeriodChange={v => this.onPeriodChange(v)} onRegionChange={v => this.onRegionChange(v)} />

        <KpiCategory data={this.state.filterKpis} onChange={(v) => this.onCategoryChange(v)}/>

        {common.distributions.length > 0 ? <StatsDistribution data={common.distributions}/> : null}

        <KpiChart title={`${title}-图表`} kpis={kpiArr}
                  tableData={common.list} config={chartConfig} bizSubtype={bizSubtype}/>

        <FPTable title={`${title}-列表`} columns={columns}  biz={biz} bizSubtype={bizSubtype}
                 scrollX={scrollX} defaultExportSize = {exportSize}
                 data={common.list} rowKeyField={labelField}/>
      </Spin>
    )
  }
}

ManyKpiTemplate.propTypes = {
  kpiGroup: React.PropTypes.array.isRequired,
  columnArr: React.PropTypes.array.isRequired,
  title: React.PropTypes.string,
  biz: React.PropTypes.string,
  bizSubtype: React.PropTypes.string,
  rowKeyField: React.PropTypes.string,
  legendField: React.PropTypes.string,
  labelField: React.PropTypes.string
}

ManyKpiTemplate.defaultProps = {
  columnArr: [COLUMNS.area_name, COLUMNS.statistic_time], // 默认地区和日期
  bizSubtype: 'common',
  labelField: COLUMNS.statistic_time.en
}

export default connect(({common, loading}) => ({common, loading: loading.models.common}))(ManyKpiTemplate)
