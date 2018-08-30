/**
 * Created by liekkas on 2017/3/1.
 */
import React from 'react'
import {connect} from 'dva'
import {SearchBox, FPTable, KpiChart, KpiCategory, StatsDistribution} from '../../../components'
import genParam from '../genParam'
import genAppParam from '../genAppParam'
import {getDefaultDate} from '../../../utils/zdate'
import COLUMNS, {convert, convertKpi, DEFAULT_KPI_LENGTH} from '../../../consts/columns'
import _ from 'lodash'
import {Spin} from 'antd'
import sectionOrProgram from '../sectionOrProgram'

// 默认统计按日
const initDate = getDefaultDate('day')

class SingleCompareTemplate extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      kpiArr: props.kpiGroup[0].value,
      sectionList: [],
      filterKpis: JSON.parse(JSON.stringify(props.kpiGroup)),
      currentLabel: props.kpiGroup[0].label
    }
  }


  componentWillMount() {
    const {biz, bizSubtype, kpiGroup} = this.props
    const startTime = "0"
    if (bizSubtype == "section" || bizSubtype == "section2" || bizSubtype == "app" || biz == "game_visit_rt") {
      this.fetch0({
        biz,
        bizSubtype,
        startTime
      })
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

  onSearch = (v) => {
    const {region, period, sectionOrProgram, sectionOrProgramName} = v
    const {biz, bizSubtype, section} = this.props
    if (bizSubtype == "section" || bizSubtype == "section2" || bizSubtype == "program" || bizSubtype == "app" || biz == "game_visit_rt") {
      this.setState({sectionList: sectionOrProgram})
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
      type: 'common/fetchRetention',
      payload: genParam(v)
    })
  }

  fetch0 = (v) => {
    let request
    if (v.bizSubtype == "section") {
      request = {
        type: 'common/fetchSection',
        payload: sectionOrProgram(v)
      }
    }else if (v.bizSubtype == "app") {
      request = {
        type: 'common/fetchAppConfig',
        payload: genAppParam(v)
      }
    }else if (v.bizSubtype == "section2") {
      request = {
        type: 'common/fetchSection2',
        payload: sectionOrProgram(v)
      }
    }else if (v.bizSubtype == "type1" || v.bizSubtype == "type2" || v.bizSubtype == "single_game") {
      request = {
        type: 'common/fetchGameSection',
        payload: genAppParam(v)
      }
    }

    this.props.dispatch(request)
  }

  render() {
    const {common, loading, labelField, title, columnArr, rowKeyField, legendField, bizSubtype,biz} = this.props
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
    const scrollX = _.sumBy(columnArr, item => item.width) + kpiArr.length * DEFAULT_KPI_LENGTH
    const chartConfig = {labelField, legendField, legends: this.state.sectionList}

    var isShowChart = true
    if((bizSubtype =='app' || biz == 'game_visit_rt' || biz =='education') && chartConfig.legends[0] =='全部'){
      isShowChart = false
    }

    return (
      <Spin spinning={loading}>
        <SearchBox initValue={{areas: common.area, section: common.section}}
                   onSearch={(v) => this.onSearch(v)} bizSubtype={this.props.bizSubtype} biz={this.props.biz}
                   onPeriodChange={v => this.onPeriodChange(v)}/>

        <KpiCategory data={this.state.filterKpis} onChange={(v) => this.onCategoryChange(v)}/>

        {common.distributions.length > 0 ? <StatsDistribution data={common.distributions}/> : null}

        { !isShowChart ? null :
        <KpiChart title={`${title}-图表`} kpis={kpiArr}
                  tableData={common.list} config={chartConfig}/>
        }

        <FPTable title={`${title}-列表`} columns={columns}
                 scrollX={scrollX}  biz={biz} bizSubtype={bizSubtype}
                 data={common.list} rowKeyField={rowKeyField}/>
      </Spin>
    )
  }
}

SingleCompareTemplate.propTypes = {
  kpiGroup: React.PropTypes.array.isRequired,
  columnArr: React.PropTypes.array.isRequired,
  title: React.PropTypes.string,
  biz: React.PropTypes.string,
  bizSubtype: React.PropTypes.string,
  rowKeyField: React.PropTypes.string,
  legendField: React.PropTypes.string.isRequired,
  labelField: React.PropTypes.string
}

SingleCompareTemplate.defaultProps = {
  columnArr: [COLUMNS.area_name, COLUMNS.statistic_time], // 默认地区和日期
  bizSubtype: 'common',
  labelField: COLUMNS.statistic_time.en
}

export default connect(({common, loading}) => ({common, loading: loading.models.common}))(SingleCompareTemplate)
