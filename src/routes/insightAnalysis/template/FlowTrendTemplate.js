/**
 * Created by zhangtao on 2017/9/28.
 */
import React from 'react'
import {connect} from 'dva'
import {SearchBox, FPTable, KpiChart, KpiCategory, StatsDistribution} from '../../../components'
import genParam from '../genParam'
import sectionOrProgram from '../sectionOrProgram'
import genAppParam from '../genAppParam'
import {getDefaultDate} from '../../../utils/zdate'
import COLUMNS, {convert, convertFlowKpi,convertFlowKpi2,convertFlowAPPKpi, DEFAULT_KPI_LENGTH} from '../../../consts/columns'
import _ from 'lodash'
import {Spin} from 'antd'

// 默认统计按日
const initDate = getDefaultDate('day')

class FlowTrendTemplate extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      kpiArr: props.kpiGroup[0].value,
      sectionList: [],
      filterKpis: JSON.parse(JSON.stringify(props.kpiGroup)),
      currentLabel: props.kpiGroup[0].label
    }
  }

  onCategoryChange = (v) => {
    const item = _.find(this.state.filterKpis, {label: v})
    this.setState({kpiArr: item.value, currentLabel: v})
  }

  onPeriodChange = v => {
    const filterKpis = JSON.parse(JSON.stringify(this.props.kpiGroup))
    let temp = filterKpis
    _.forEach(temp, p => {
      p.value = _.filter(p.value, m => m.period.includes(v))
    })
    const {currentLabel}=this.state
    const item = _.find(temp, {label: currentLabel})
    this.setState({kpiArr: item.value, filterKpis: temp})
  }

  componentWillMount() {
    const {biz, bizSubtype, kpiGroup} = this.props
    if (bizSubtype == "app" ||bizSubtype == "type1" ||bizSubtype == "type2" ||
      bizSubtype == "section" || bizSubtype == "section2" || bizSubtype == "program" || bizSubtype == "channel") {
      this.fetch0({
        biz,
        bizSubtype
      })
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
    const {region, period, sectionOrProgram,sectionOrProgramName} = v
    const {biz, bizSubtype, section} = this.props
    if (bizSubtype == "section" || bizSubtype == "section2" || bizSubtype == "program" || bizSubtype == "channel") {
      if(biz =="dvb"||biz == "ts" ||biz == "replay"){
        this.setState({sectionList: sectionOrProgramName});
      }else{
        this.setState({sectionList: sectionOrProgram})
      }
    }
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
        param = {...param, bizCustom1: sectionOrProgram}
    }

    this.fetch(param)

  }

  fetch = (v) => {
    this.props.dispatch({
      type: 'section/fetchFlow',
      payload: genParam(v)
    })
  }

  fetch0 = (v) => {
    let request
    if (v.bizSubtype == "section" || v.bizSubtype == "programRank") {
      request = {
        type: 'section/fetchSection',
        payload: sectionOrProgram(v)
      }
    } else if (v.bizSubtype == "program") {
      request = {
        type: 'section/fetchProgram',
        payload: sectionOrProgram(v)
      }
    } else if (v.bizSubtype == "channel") {
      request = {
        type: 'section/fetchChannel',
        payload: sectionOrProgram(v)
      }
    } else if (v.bizSubtype == "app" ||v.bizSubtype == "type1" ||v.bizSubtype == "type2" ) {
      request = {
        type: 'section/fetchAppConfig',
        payload: genAppParam(v)
      }
    }else if (v.bizSubtype == "section2") {
      request = {
        type: 'section/fetchSection2',
        payload: sectionOrProgram(v)
      }
    }
   this.props.dispatch(request)
  }

  render() {
    const {section, loading, labelField, title, columnArr, legendField,biz,bizSubtype} = this.props
    const {kpiArr,currentLabel} = this.state
    let listData = []
    if(section) {
      if (currentLabel == '关联流量') {
        listData = _.filter(section.list, {'flag': '3'})
      } else if (currentLabel == '流入流量') {
        listData = _.filter(section.list, {'flag': '1'})
      } else {
        listData = _.filter(section.list, {'flag': '2'})
      }
    }

    const subjectColumn = [COLUMNS.subject].map(kpi => convertFlowKpi(kpi))
    const subjectColumnApp = [COLUMNS.subject].map(kpi => convertFlowAPPKpi(kpi))
    const unfixedColumns = kpiArr.map(kpi => convertFlowKpi2(kpi))
    const fixedColumns = columnArr.map(column => {
      if (column.en === COLUMNS.area_name.en) { //对地区进行中文转义
        return {
          ...convert(column),
          render: (text) => {
            const item = _.find(section.area, {id: text})
            return item ? item.label : (text == 0 ? '全国' : text)
          }
        }
      } else {
        return convert(column)
      }

    })
    // 列表列设置，默认有地区和日期（固定列），后面为指标列（可滚动列）
    let columns = fixedColumns.concat(subjectColumnApp).concat(unfixedColumns)
    if(bizSubtype == 'app' || bizSubtype == 'type1' || bizSubtype == 'type2') {
      //columns = fixedColumns.concat(subjectColumnApp).concat(unfixedColumns)
    }

    // table滚动条长度
    const scrollX = _.sumBy(columnArr, item => item.width) + kpiArr.length * DEFAULT_KPI_LENGTH
    const chartConfig = {labelField, legendField}

    return (
      <Spin spinning={loading}>
        <SearchBox initValue={{areas: section.area, section: section.section}}
                   onSearch={(v) => this.onSearch(v)} bizSubtype={this.props.bizSubtype} biz={this.props.biz}
                   onPeriodChange={v => this.onPeriodChange(v)}/>

        <KpiCategory data={this.state.filterKpis} onChange={(v) => this.onCategoryChange(v)}/>

        {/*{section.distributions.length > 0 ? <StatsDistribution data={section.distributions}/> : null}*/}

        <FPTable title={`${title}(${currentLabel})-列表`} columns={columns}
                 scrollX={scrollX} biz={biz} bizSubtype={bizSubtype}
                 data={listData} rowKeyField={labelField}/>
      </Spin>
    )
  }
}


FlowTrendTemplate.propTypes = {
  kpiGroup: React.PropTypes.array.isRequired,
  columnArr: React.PropTypes.array.isRequired,
  title: React.PropTypes.string,
  biz: React.PropTypes.string,
  bizSubtype: React.PropTypes.string,
  rowKeyField: React.PropTypes.string,
  legendField: React.PropTypes.string.isRequired,
  labelField: React.PropTypes.string
}

FlowTrendTemplate.defaultProps = {
  columnArr: [COLUMNS.area_name, COLUMNS.statistic_time], // 默认地区和日期
  bizSubtype: 'section',
  labelField: COLUMNS.statistic_time.en
}

export default connect(({section, loading}) => ({section, loading: loading.models.section}))(FlowTrendTemplate)
