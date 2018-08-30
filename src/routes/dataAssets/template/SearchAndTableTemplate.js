/**
 * Created by zhangtao on 2017/9/28.
 */
import React from 'react'
import {connect} from 'dva'
import {SearchBox, FPTable} from '../../../components/index'
import {getDefaultDate} from '../../../utils/zdate'
import COLUMNS, { convertFlowKpi,convertFlowKpi2,convertFlowAPPKpi, DEFAULT_KPI_LENGTH} from '../../../consts/columns'
import _ from 'lodash'
import {Spin} from 'antd'
import genParam from '../genParam'
// 默认统计按日
const initDate = getDefaultDate('day')
const map = {
  "时移业务分析": "ts" ,
  "直播业务分析": "dvb" ,
  "回看业务分析": "replay" ,
  "教育": "education" ,
  "OTT点播业务分析": "ott",
  "VOD点播业务分析": "vod" ,
  "应用商店": "appstore",
  "百灵K歌": "life_product" ,
  "幸福健身团": "happy_fitness_group" ,
  "智慧社区": "in_community",
  "游戏大厅":"game_visit",
  "广告分析":"advert",
}
const showMap = {
  "ts": "时移业务分析" ,
  "dvb": "直播业务分析" ,
  "replay": "回看业务分析" ,
  "education": "教育" ,
  "ott": "OTT点播业务分析",
  "vod": "VOD点播业务分析" ,
  "appstore": "应用商店",
  "life_product": "百灵K歌" ,
  "happy_fitness_group": "幸福健身团" ,
  "in_community": "智慧社区",
  "game_visit":"游戏大厅",
  "advert":"广告分析",
}

class SearchAndTableTemplate extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      sectionList: [],
      secondSection:[]
    }
  }

  onPeriodChange = v => {
    let temp = filterKpis
    _.forEach(temp, p => {
      p.value = _.filter(p.value, m => m.period.includes(v))
    })
  }

   convert =  (field) =>{
    const result = {
      title: field.cn + (field.unit ? `(${field.unit})` : ''),
      dataIndex: field.en,
      key: field.en,
      width: field.width,
      fixed: false,
    }
    return result
  }
  onSearch = (v) => {
    const {region, period,businessType,businessTypeChildren} = v
    const {biz, bizSubtype} = this.props
    let param = {
      areaType: region.type,
      period: period.type,
      areaName: region.id,
      startTime: period.start,
      endTime: period.end,
      biz,
      bizSubtype,
    }
    if(businessType){
      param.businessType = map[businessType]
    }
    if(businessTypeChildren){
      param.businessTypeChildren = businessTypeChildren
    }
   this.fetch(param)

  }

  fetch = (v) => {
    if(this.props.bizSubtype == "dataAssets"){
      if(this.props.biz=="userCover"){
        this.props.dispatch({
          type: 'dataAssets/fetchUserCover',
          payload: genParam(v)
        })
      }else if (this.props.biz == "stockData"){
        this.props.dispatch({
          type: 'dataAssets/fetchStockData',
          payload: genParam(v)
        })
      }else if(this.props.biz == "productUse"){
        console.log(genParam(v))
      }
    }
  }
  onSectionChange=(v)=>{
    if(this.props.biz == "productUse"){
      let meun = this.props.dataAssets.menu
      let children = _.find(meun, {key: v})
      this.setState({secondSection:children.children})
    }


  }
  render() {
    const {dataAssets, loading, labelField, title, columnArr, bizSubtype} = this.props
    let listData =dataAssets.data
    listData = dataAssets.list
    const fixedColumns = columnArr.map(column => {
      if (column.en === COLUMNS.area_name.en) { //对地区进行中文转义
        return {
          ...this.convert(column),
          render: (text) => {
            const item = _.find(dataAssets.area, {id: text})
            return item ? item.label : (text == 0 ? '全国' : text)
          }
        }
      } else {
        return this.convert(column)
      }

    })
    // 列表列设置，默认有地区和日期（固定列），后面为指标列（可滚动列）
    let columns = fixedColumns//.concat(subjectColumn)
    // table滚动条长度
    const scrollX = _.sumBy(columnArr, item => item.width)
    let obj = dataAssets.menu[0]
    return (
      <Spin spinning={loading}>
        <SearchBox initValue={{areas: dataAssets.area, section: dataAssets.menu,secondSection:this.state.secondSection}}
                   onSearch={(v) => this.onSearch(v)} bizSubtype={this.props.bizSubtype} biz={this.props.biz}
                   onPeriodChange={v => this.onPeriodChange(v)} onSectionChange={v=>this.onSectionChange(v)} />

        <FPTable title={`${title}-列表`} columns={columns}
                 scrollX={scrollX}
                 data={listData} rowKeyField={labelField}/>
      </Spin>
    )
  }
}


SearchAndTableTemplate.propTypes = {
  columnArr: React.PropTypes.array.isRequired,
  title: React.PropTypes.string,
  biz: React.PropTypes.string,
  bizSubtype: React.PropTypes.string,
  rowKeyField: React.PropTypes.string,
}

SearchAndTableTemplate.defaultProps = {
  columnArr: [COLUMNS.area_name, COLUMNS.statistic_time], // 默认地区和日期
  bizSubtype: 'section',
}

export default connect(({dataAssets, loading}) => ({dataAssets, loading:loading.models.dataAssets}))(SearchAndTableTemplate)
