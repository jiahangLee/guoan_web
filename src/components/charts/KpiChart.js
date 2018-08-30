/**
 * Created by liekkas on 2017/3/3.
 */
import React, {PropTypes} from 'react'
import Panel from '../Panel'
import styled from 'styled-components'
import ECharts from 're-echarts'
import {getSingleOption, getMultiOption} from './genOption'
import {Checkbox, Radio} from 'antd'
import _ from 'lodash'
const RadioGroup = Radio.Group
const RadioButton = Radio.Button

const KpiGroup = styled.div`
  position: absolute;
  top: 60px;
  left: 12px;
`

const CompareBox = styled.div`
  position: absolute;
  height: 20px;
  right: 130px;
  top: 85px;
  display: flex;
  justify-content: space-between;
`

class KpiChart extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentKpi: props.kpis[0],
      useTB: false, // 同比
      useHB: false // 环比
    }
  }

  parseTableData (v, kpi, config, useHB = false, useTB = false) {
    if (_.isEmpty(v) || v.length==0) return {}
    let data, labels, hbData, tbData,title

    // multi
    if (config.legends && config.legends.length > 0) {
      const dataArr = []
      const legendField = config.legendField
      hbData = []
      tbData = []

      labels = _.uniq(_.map(v, config.labelField))

      for (let i = 0; i < config.legends.length; i++) {
        const filterArr = _.filter(v, {[legendField]: config.legends[i]})
        if (i === 0) {

        }

        const legendArr = []

        for (let j = 0; j < labels.length; j++) {
          const timeData = _.filter(filterArr, {[config.labelField]: labels[j]})
          if(timeData.length >0 ) {
            const timeMap =  _.map(timeData, kpi.en)
            legendArr.push(timeMap[0])
          }else{
            legendArr.push(0)
          }
        }

        dataArr.push(legendArr)

        if (useHB) {
          hbData.push(_.map(filterArr, kpi.en + '_mom'))
        }
        if (useTB) {
          tbData.push(_.map(filterArr, kpi.en + '_yoy'))
        }
      }
      return getMultiOption(labels, dataArr, config.legends, kpi.unit, kpi.cn, hbData, tbData)
    } else {
      data = _.map(v, kpi.en)
      hbData = useHB ? _.map(v, kpi.en + '_mom') : []
      tbData = useTB ? _.map(v, kpi.en + '_yoy') : []
      title=this.props.title
      if (_.isEmpty(data)) {
        console.log('>>> 后台数据字段和前台对不上,字段为:', kpi.en)
        return {}
      }

      labels = _.map(v, (config.labelField))
      return getSingleOption(labels, data, kpi.unit, kpi.cn, hbData, tbData,title)
    }
  }

  sort(e){
    const {tableData}=this.props
    e=e.en
    let a=tableData
    a.sort((a,b)=>parseFloat(b[e])-parseFloat(a[e]))
  }

  onKpiChange (e) {
    const kpi = _.find(this.props.kpis, {en: e.target.value})
    this.setState({
      currentKpi: kpi
    })
  }

  componentWillReceiveProps (nextProps) {
    if (!_.isEqual(nextProps.kpis, this.props.kpis)) {
      this.setState({
        currentKpi: nextProps.kpis[0]
      })
    }
  }

  render () {
    const {kpis, title, isCompare, height, tableData, config,bizSubtype} = this.props
    const {currentKpi, useHB, useTB} = this.state
    if (bizSubtype=="adBusinessRank" ||bizSubtype=="programRank" ||bizSubtype=="sectionRank" || bizSubtype=="channelGroupRank"|| bizSubtype=="threeRank"){
      this.sort(currentKpi)
    }
    const option = this.parseTableData(tableData, currentKpi, config, useHB, useTB)
    return (
      <Panel title={title}>
        {
          _.isEmpty(option)
            ? <div style={{height}} />
            : <ECharts option={option} style={{height}} notMerge config={{theme: 'infographic'}} />
        }

        <KpiGroup>
          <RadioGroup onChange={(e) => this.onKpiChange(e)}
            value={currentKpi.en}>
            {
              kpis.map(({en, cn}, index) =>
                <RadioButton key={index} value={en}>{cn}</RadioButton>)
            }
          </RadioGroup>
        </KpiGroup>

        {
          isCompare
            ? <CompareBox>
              <Checkbox onChange={(e) => this.setState({useHB: e.target.checked})}>环比</Checkbox>
              <Checkbox onChange={(e) => this.setState({useTB: e.target.checked})}>同比</Checkbox>
            </CompareBox>
            : null
        }
      </Panel>
    )
  }
}

KpiChart.propTypes = {
  kpis: PropTypes.array.isRequired,
  height: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  bizSubtype: PropTypes.string.isRequired,
  tableData: PropTypes.array,
  config: PropTypes.object,
  onCompare: PropTypes.func,
  isCompare: PropTypes.bool
}

KpiChart.defaultProps = {
  height: '300px',
  isCompare: true,
  bizSubtype:'common'
}

export default KpiChart
