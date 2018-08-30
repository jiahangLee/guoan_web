/**
 * Created by liekkas on 2017/3/1.
 */
import React from 'react'
import {connect} from 'dva'
import {SearchBox, FPTable, KpiChart, KpiCategory, StatsDistribution} from '../../../components'
import genParam from '../genParam'
import sectionOrProgram from '../sectionOrProgram'
import genAppParam from '../genAppParam'
import {getDefaultDate} from '../../../utils/zdate'
import COLUMNS, {convert, convertKpi, DEFAULT_KPI_LENGTH} from '../../../consts/columns'
import KPIS from '../../../consts/kpis'
import _ from 'lodash'
import {Spin} from 'antd'

// 默认统计按日
const initDate = getDefaultDate('day')

class ManyCompareTemplate extends React.PureComponent {
  constructor(props) {
    const currentLabelName = props.kpiGroup[0].label
    const filterKpis = JSON.parse(JSON.stringify(props.kpiGroup))
    let temp = filterKpis
    _.forEach(temp, p => {
      p.value = _.filter(p.value, m => m.period.includes("day"))
    })
    const item = _.find(temp, {label: currentLabelName})

    super(props)
    this.state = {
      kpiArr: item.value,
      sectionList: [],
      isSecond : false,
      filterKpis: temp,
      currentLabel: currentLabelName,
      startDate_three:"-1",
      regionCode_three:"-1",
      valueFirstName:"",
      areaCode: ''
    }
  }

  onCategoryChange = (v) => {
    const item = _.find(this.state.filterKpis, {label: v})
    this.setState({kpiArr: item.value, currentLabel: v})
  }

  componentWillMount() {
    const {biz, bizSubtype, kpiGroup} = this.props
    const startTime = "0"
    if (bizSubtype == "scan" ||bizSubtype == "dvbProgram" || bizSubtype == "section" || bizSubtype == "program1" || bizSubtype == "programRank"
      || bizSubtype == "channel" || bizSubtype == "programTypeName" || bizSubtype == "adBusiness"|| bizSubtype == "appname"
      || bizSubtype == "app" ||bizSubtype == "type1" ||bizSubtype == "type2" || bizSubtype == "section2"|| bizSubtype == "single_game") {
      this.fetch0({
        biz,
        bizSubtype,
        startTime
      })
    }

    if(bizSubtype == "dvbProgram_three" || bizSubtype == "replayProgram_three" || bizSubtype =="channel_three" || biz =="advert_three"){
      this.fetch0({
        biz,
        bizSubtype,
        startTime,
        regionCode:'-1'
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

  convertUrlASCII(v){
    var arr = new Array()
    if(!Array.isArray(v))return v
    for (var j = 0; j < v.length; j++) {
      var data = v[j].split("+")
      var str = data[0]
      for (var i = 1; i < data.length; i++) {
        str = str + '%2B' + data[i]
      }
      arr.push(str)
    }
    return arr
  }

  onSearch = (v) => {
    const {region, period, sectionOrProgram, sectionOrProgramName, valueFirst, valueSecond,valueThird} = v
    const {biz, bizSubtype, section, title} = this.props
    if (bizSubtype == "dvbProgram" ||bizSubtype == "section" ||bizSubtype == "section2" || bizSubtype == "program"
      || bizSubtype == "channel" || bizSubtype == "appname" || bizSubtype == "channel_three" || bizSubtype == "program_three"
      || bizSubtype == "app" ||bizSubtype == "type1" ||bizSubtype == "type2"||bizSubtype == "replayProgram_three"||bizSubtype == "dvbProgram_three"
      || bizSubtype == "series_three" || bizSubtype == "single_game") {
      if(biz =="dvb"||biz == "ts" ||biz == "replay"){
        this.setState({sectionList: sectionOrProgramName});
      }else{
        this.setState({sectionList: sectionOrProgram})
      }
    }
    if(biz == 'advert_three'){
      this.setState({sectionList: sectionOrProgram ,valueFirstName:valueFirst})
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
      if (bizSubtype == "programRank") {
        param = {...param, sectionName: sectionOrProgram}
      } else {
        param = {...param, bizCustom1: this.convertUrlASCII(sectionOrProgram)}
      }
    }
    if (bizSubtype == "programRank") {
      this.fetch1(param)
    } else if (bizSubtype == "programTypeName") {
      this.setState({
        sectionList: valueFirst.length>1 ? valueFirst : valueSecond,//媒资echarts图例展示,
        isSecond: valueFirst.length>1 ? false : true
      })
      const status = title== '省平台存量分析' ? 1 : 2 //存量是1 增量是2
      const bizCustom2 = valueFirst.length>1 ? ['全部'] : valueSecond
      param = {...param, bizCustom1: valueFirst, bizCustom2: bizCustom2, bizCustom3: status}
      this.fetch2(param)
    } else if (bizSubtype == "adBusiness") {
      if(valueFirst.length>1){
        this.setState({sectionList: valueFirst,
          isSecond:  true
        });
      }else if (valueFirst.length ==1){
        this.setState({sectionList: valueSecond,isSecond:  false});
      }
      var bizCustom2 = valueFirst.length>1 ? ['全部'] : valueSecond
      if(valueFirst == '开机') {
        bizCustom2 =  ['全部']
      }

      param = {...param, bizCustom1: valueFirst, bizCustom2: bizCustom2}
      this.fetch3(param)
    } else if (bizSubtype == "adBusinessRank") {
      param = {...param}
      this.fetch3(param)
    }else if (biz == "game_room") {
      param.bizSubtype = valueFirst
      this.setState({sectionList: valueSecond,isSecond:  false});
      param = {...param, bizCustom1: valueSecond}
      this.fetch(param)
    }else if (bizSubtype == "appname" && biz =="appstore" ) {
      this.setState({
        sectionList: valueSecond
      })
      param = {...param, bizCustom1: valueSecond,bizCustom2:valueFirst}
      this.fetchApp(param)
    } else if(bizSubtype == "appname") {
      this.fetchApp(param)
    }else if (bizSubtype == "scan" && biz =="ecom" ) {
      this.setState({
        sectionList: valueThird
      })
      param = {...param, bizCustom1: valueFirst,bizCustom2:valueSecond,bizCustom3:valueThird}
      this.fetch(param)
    }else{
      this.fetch(param)
    }

  }

  onPeriodChange = v => {
    if(KPIS.areaArr.includes(this.state.areaCode)){
      return
    }
    const filterKpis = JSON.parse(JSON.stringify(this.props.kpiGroup))
    let temp = filterKpis
    _.forEach(temp, p => {
      p.value = _.filter(p.value, m => m.period.includes(v))
    })
    const {currentLabel}=this.state
    const item = _.find(temp, {label: currentLabel})
    this.setState({kpiArr: item.value, filterKpis: temp})

    const {biz, bizSubtype, section} = this.props

  }

  onStartTimeChange = v => {
    const {biz, bizSubtype, section} = this.props
    const {regionCode_three} = this.state
    const startTime = v
    if (bizSubtype == "dvbProgram") {
      this.fetch0({
        biz,
        bizSubtype,
        startTime
      })
    }
    if (bizSubtype == "dvbProgram_three") {
      this.fetch0({
        biz,
        bizSubtype,
        startTime,
        regionCode :regionCode_three
      })
    }
    this.setState({startDate_three: startTime})
  }

  onRegionChange = v => {
    const {biz, bizSubtype, section} = this.props
    const {startDate_three} = this.state
    const regionCode = v
    if (bizSubtype == "channel_three") {
      this.fetch0({
        biz,
        bizSubtype,
        regionCode
      })
    }
    if (bizSubtype == "dvbProgram_three" || bizSubtype == "replayProgram_three") {
      this.fetch0({
        biz,
        bizSubtype,
        startTime : startDate_three,
        regionCode
      })
    }
    if (biz == "advert_three") {
      this.fetch0({
        biz,
        bizSubtype,
        regionCode
      })
    }
    this.setState({regionCode_three: regionCode})

    const filterKpis = JSON.parse(JSON.stringify(this.props.kpiGroup))
    let temp = filterKpis
    if(bizSubtype == 'channel_three' && biz =='dvb'){
      _.forEach(temp, p => {
        if(p.label =='使用时长类'){
          p.value = _.filter(p.value, m => m.areaRP.includes(v))
        }
      })
    }else {
      _.forEach(temp, p => {
        p.value = _.filter(p.value, m => m.area.includes(v))
      })
    }

    const {currentLabel}=this.state
    const item = _.find(temp, {label: currentLabel})
    this.setState({kpiArr: item.value, filterKpis: temp,areaCode:v})

  }

  fetchApp = (v) => {
    this.props.dispatch({
      type: 'section/fetchFlow',
      payload: genParam(v)
    })
  }

  fetch = (v) => {
    this.props.dispatch({
      type: 'section/fetch',
      payload: genParam(v)
    })
  }
  fetch1 = (v) => {
    this.props.dispatch({
      type: 'section/fetchProgramRank',
      payload: genParam(v)
    })
  }
  fetch2 = (v) => {
    this.props.dispatch({
      type: 'section/fetchMedia',
      payload: genParam(v)
    })
  }
  fetch3 = (v) => {
    this.props.dispatch({
      type: 'section/fetchAdBusiness',
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
    }else if (v.biz == "game_visit" && (v.bizSubtype == "type1" || v.bizSubtype == "type2" || v.bizSubtype == "single_game")) {
      request = {
          type: 'section/fetchGameSection',
          payload: genAppParam(v)
      }
    } else if (v.bizSubtype == "program1") {
      request = {
        type: 'section/fetchProgram',
        payload: sectionOrProgram(v)
      }
    } else if (v.bizSubtype == "channel") {
      request = {
        type: 'section/fetchChannel',
        payload: sectionOrProgram(v)
      }
    }else if (v.bizSubtype == "dvbProgram") {
      request = {
        type: 'section/fetchChannelOfProgram',
        payload: sectionOrProgram(v)
      }
    }else if (v.bizSubtype == "programTypeName") {
      request = {
        type: 'section/fetchProgramTypeName',
        payload: sectionOrProgram(v)
      }
    }else if (v.bizSubtype == "adBusiness" && v.biz == "advert") {
      request = {
        type: 'section/fetchAdType',
        payload: sectionOrProgram(v)
      }
    }else if (v.bizSubtype == "appname" || v.bizSubtype == "app" ||v.bizSubtype == "type1" ||v.bizSubtype == "type2") {
      request = {
        type: 'section/fetchAppConfig',
        payload: genAppParam(v)
      }
    }else if (v.bizSubtype == "section2") {
      request = {
        type: 'section/fetchSection2',
        payload: sectionOrProgram(v)
      }
    }else if (v.bizSubtype == "channel_three") {
      request = {
        type: 'section/fetchChannelOfThree',
        payload: sectionOrProgram(v)
      }
    }else if (v.bizSubtype == "dvbProgram_three" || v.bizSubtype == "replayProgram_three") {
      request = {
        type: 'section/fetchChannelOfProgramThree',
        payload: sectionOrProgram(v)
      }
    }else if ( v.biz == "advert_three") {
      request = {
        type: 'section/fetchAdTypeThree',
        payload: sectionOrProgram(v)
      }
    }else if ( v.bizSubtype == "scan") {
      request = {
        type: 'section/fetchEcomScan',
        payload: sectionOrProgram(v)
      }
    }
    this.props.dispatch(request)
  }

  getProgramTypeNameDataTable(section, chartConfig, currentLabel) {
    const {isSecond} = this.state
    const programtype = _.uniq(_.map(section.list, 'programtype'))
    const programtypename = _.uniq(_.map(section.list, 'programtypename'))
    if(programtype.length > 1 || !isSecond) {
      chartConfig.legendField = 'programtype'
    }
    const dataArr = _.filter(section.list, {"programstatus": currentLabel})
    let tableData = []
    _.forEach(dataArr, function(value, index) {
      var newValue = {
        statistic_time: value.statistic_time,//日期
        programtype: value.programtype,//栏目
        programtypename: value.programtypename//类目
      }
      if(currentLabel=="已发布") {
        newValue.operated_total_time = (value.usetime / 3600).toFixed(2)
        newValue.operated_total_episode = value.program
        newValue.operated_total_nums = value.drama

        newValue.operated_total_time2 = (value.usetime / 3600).toFixed(2)
        newValue.operated_total_episode2 = value.program
        newValue.operated_total_nums2 = value.drama
        // newValue.publish_total_time = value.usetime
        // newValue.publish_total_episode = value.program
        // newValue.publish_total_nums = value.drama
      }else if(currentLabel=="未发布") {
        newValue.operated_offline_time = (value.usetime / 3600).toFixed(2)
        newValue.operated_offline_episode = value.program
        newValue.operated_offline_nums = value.drama
      } else {
        newValue.can_operate_total_time = (value.usetime / 3600).toFixed(2)
        newValue.can_operate_total_episode = value.program
        newValue.can_operate_total_nums = value.drama

        newValue.can_operate_total_time2 = (value.usetime / 3600).toFixed(2)
        newValue.can_operate_total_episode2 = value.program
        newValue.can_operate_total_nums2 = value.drama

        newValue.gravity_online = value.rate
      }
      tableData.push(newValue)
    });
    return tableData
  }

  render() {
    const {section, loading, labelField, title, columnArr, rowKeyField, legendField, bizSubtype,biz} = this.props
    const {kpiArr, currentLabel,valueFirstName} = this.state
    const unfixedColumns = kpiArr.map(kpi => convertKpi(kpi))
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
    const columns = fixedColumns.concat(unfixedColumns)

    // table滚动条长度
    const scrollX = _.sumBy(columnArr, item => item.width) + kpiArr.length * DEFAULT_KPI_LENGTH
    let chartConfig = {labelField, legendField, legends: this.state.sectionList}

    let tableData = section.list
    if(bizSubtype == "programTypeName") {
      tableData = this.getProgramTypeNameDataTable(section, chartConfig, currentLabel)
    }else if(bizSubtype == "adBusiness"&&_.uniq(_.map(section.list, 'adplacename')).length>=1){
      const {isSecond} = this.state
      if(isSecond) {
        chartConfig.legendField = "adplacename"
      }
    }else if(bizSubtype == "adBusinessRank"){
        chartConfig.labelField = "adplacename"
        tableData = _.filter(tableData, function(o) { return o.adplacename !='全部'; });

    }
    var isShowChart = true
    if((biz =='app' || biz =='appstore' || biz == 'game_visit'
      || biz =='game_room' || biz =='education' || biz =='ecom') && chartConfig.legends[0] =='全部'){
      isShowChart = false
    }
    if(biz == 'advert_three' && (valueFirstName =='pf广告' || valueFirstName =='频道列表')
      && chartConfig.legends[0] =='全部'){
      isShowChart = false
    }
    return (
      <Spin spinning={loading}>
        <SearchBox initValue={{areas: section.area, section: section.section}}
                   onSearch={(v) => this.onSearch(v)} bizSubtype={this.props.bizSubtype} biz={this.props.biz}
                   onPeriodChange={v => this.onPeriodChange(v)}
                   onStartTimeChange={v => this.onStartTimeChange(v)}
                   onRegionChange={v => this.onRegionChange(v)}/>
        {
          this.state.filterKpis.length > 1
          ?
          <KpiCategory data={this.state.filterKpis} onChange={(v) => this.onCategoryChange(v)}/>
          :
          <div/>
        }

        {section.distributions.length > 0 ? <StatsDistribution data={section.distributions}/> : null}

        { !isShowChart ? null :
          <KpiChart title={`${title}-图表`} kpis={kpiArr}
                    tableData={tableData} config={chartConfig} bizSubtype={bizSubtype}/>
        }
        <FPTable title={`${title}-列表`} columns={columns}
                 scrollX={scrollX} biz={biz} bizSubtype={bizSubtype}
                 data={tableData} rowKeyField={rowKeyField}/>
      </Spin>
    )
  }
}

ManyCompareTemplate.propTypes = {
  kpiGroup: React.PropTypes.array.isRequired,
  columnArr: React.PropTypes.array.isRequired,
  title: React.PropTypes.string,
  biz: React.PropTypes.string,
  bizSubtype: React.PropTypes.string,
  rowKeyField: React.PropTypes.string,
  legendField: React.PropTypes.string.isRequired,
  labelField: React.PropTypes.string
}

ManyCompareTemplate.defaultProps = {
  columnArr: [COLUMNS.area_name, COLUMNS.statistic_time], // 默认地区和日期
  bizSubtype: 'section',
  labelField: COLUMNS.statistic_time.en
}

export default connect(({section, loading}) => ({section, loading: loading.models.section}))(ManyCompareTemplate)
