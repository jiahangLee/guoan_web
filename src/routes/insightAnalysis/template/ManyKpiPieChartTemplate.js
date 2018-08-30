/**
 * Created by liekkas on 2017/3/1.
 */
import React from 'react'
import {connect} from 'dva'
import {SearchBox, FPTable, KpiChart, KpiCategory, StatsDistribution} from '../../../components'
import genParam from '../genParam'
import sectionOrProgram from '../sectionOrProgram'
import {getDefaultDate} from '../../../utils/zdate'
import COLUMNS, {convert, convertFlowKpi2, DEFAULT_KPI_LENGTH} from '../../../consts/columns'
import _ from 'lodash'
import {Spin} from 'antd'
import pie from "../pie";

// 默认统计按日
const initDate = getDefaultDate('day')

class ManyKpiPieChartTemplate extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      kpiArr: props.kpiGroup[0].value,
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
    // let temp = filterKpis
    let temp = _.filter(filterKpis,p=>p.period.includes(v))
   /* _.forEach(temp, p => {
      p.value = _.filter(p.value, m => m.period.includes(v))
    })*/
    const {currentLabel}=this.state
    let item = _.find(temp, {label: currentLabel})
    if(typeof item =='undefined'){
      item=temp[0]
    }
    this.setState({kpiArr: item.value, filterKpis: temp})
  }

  componentWillMount() {
    this.onPeriodChange('day');
    const {biz, bizSubtype, kpiGroup} = this.props
    if (bizSubtype == "section" || bizSubtype == "program" || bizSubtype == "programRank") {
      this.fetch0({
        biz,
        bizSubtype
      })
    } else if (bizSubtype == "channelGroupRank") {
      this.fetch2(biz,
        bizSubtype);
    }else if (bizSubtype == "channel_pie"){
      this.fetch4(biz,
        bizSubtype);
    } else if (bizSubtype == "apk_pie"){
      this.fetch5(biz,
        bizSubtype);
    } else if (bizSubtype == "area_pie"){
      this.fetch6({biz,bizSubtype});
    }else if (bizSubtype == "single_pie"){
      this.fetch7({biz,
        bizSubtype});
    }

  }

  onSearch = (v) => {
    const {region, period, sectionOrProgram,sectionOrProgramName} = v
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
    if (bizSubtype == "programRank") {
      this.fetch1(param)
    } else {
      this.fetch(param)
    }


  }

  fetch = (v) => {
    this.props.dispatch({
      type: 'common/fetchUserRadio',
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
      type: 'common/fetchProgram',
      payload: sectionOrProgram(v)
    })
  }
  fetch6 = (v) => {
    this.props.dispatch({
      type: 'common/fetchSection',
      payload: pie(v)
    })
  }
  fetch7 = (v) => {
    v.biz = 'single_game'
    this.props.dispatch({
      type: 'common/fetchSingle',
      payload: sectionOrProgram(v)
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

  getTableData(common) {
    const {currentLabel} = this.state
    let levelType = ''
    if(currentLabel == '时长'){
      levelType = 'use_time'
    }else if(currentLabel == '次数'){
      levelType = 'use_count'
    }else if(currentLabel == '天数'){
      levelType = 'use_day'
    }
    const dataArr = _.filter(common.list, {"level_type": levelType})

    return dataArr
  }

  getDistributions(common) {
    const {currentLabel} = this.state
    let levelType = ''
    if(currentLabel == '时长'){
      levelType = '使用时长档位'
    }else if(currentLabel == '次数'){
      levelType = '使用次数档位'
    }else if(currentLabel == '天数'){
      levelType = '使用天数档位'
    }
    const dataArr = _.filter(common.distributions, {"name": levelType})

    return dataArr
  }

  render() {
    const {common, loading, labelField, title, columnArr, legendField,biz,bizSubtype} = this.props
    const {kpiArr} = this.state
    const unfixedColumns = kpiArr.map(kpi => convertFlowKpi2(kpi))
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

    let tableData = common.list
    let distributionData = ''
    if(bizSubtype == "common_pie" || bizSubtype == "channel_pie" || bizSubtype == "apk_pie" || bizSubtype == "area_pie" || bizSubtype == "single_pie") {
      tableData = this.getTableData(common)
      distributionData = this.getDistributions(common)
    }

    return (
      <Spin spinning={loading}>
        <SearchBox initValue={{areas: common.area, section: common.section}}
                   onSearch={(v) => this.onSearch(v)} bizSubtype={bizSubtype} biz={this.props.biz}
                   onPeriodChange={v => this.onPeriodChange(v)}/>

        <KpiCategory data={this.state.filterKpis} onChange={(v) => this.onCategoryChange(v)}/>

        {(common.distributions.length > 0 && tableData.length>0)  ? <StatsDistribution data={distributionData}/> : null}

        <FPTable title={`${title}-列表`} columns={columns}
                 scrollX={scrollX} biz={biz} bizSubtype={bizSubtype}
                 data={tableData} rowKeyField={labelField}/>
      </Spin>
    )
  }
}

ManyKpiPieChartTemplate.propTypes = {
  kpiGroup: React.PropTypes.array.isRequired,
  columnArr: React.PropTypes.array.isRequired,
  title: React.PropTypes.string,
  biz: React.PropTypes.string,
  bizSubtype: React.PropTypes.string,
  rowKeyField: React.PropTypes.string,
  legendField: React.PropTypes.string,
  labelField: React.PropTypes.string
}

ManyKpiPieChartTemplate.defaultProps = {
  columnArr: [COLUMNS.area_name, COLUMNS.statistic_time], // 默认地区和日期
  bizSubtype: 'common',
  labelField: 'row_num'
}

export default connect(({common, loading}) => ({common, loading: loading.models.common}))(ManyKpiPieChartTemplate)
