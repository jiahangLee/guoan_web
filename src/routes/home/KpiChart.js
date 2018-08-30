/**
 * Created by liekkas on 2017/2/17.
 */
import React from 'react'
import styled from 'styled-components'
import ECharts from 're-echarts'

const Root = styled.div`
  height: 44vh;
  width: 100%;  
`
class KpiChart extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      option: getOption(props.date,props.chartData)

    }
  }
  render () {
    return (
      <Root>
        <ECharts option={getOption(this.props.date,this.props.chartData)} />
      </Root>
    )
  }
}

const getOption  = (date,chartData) => {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      textStyle: {
        color: "#e08b23"
      },
      backgroundColor: 'rgba(200,200,200,0.3)',
      data: ['直播', '回看', '时移', 'OTT', 'VOD', '游戏', '教育', '应用商店', '智慧社区', '电商平台']
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        axisLine: {
          lineStyle: {
            color: '#a7a5a6',
          }
        },
        boundaryGap: false,
        data: date
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#a7a5a6',
          }
        },
      }
    ],
    series: [
      {
        name: '直播',
        type: 'line',
        stack: '总量',
        areaStyle: {normal: {}},
        data: chartData.dvb
      },
      {
        name: '回看',
        type: 'line',
        stack: '总量',
        areaStyle: {normal: {}},
        data: chartData.replay
      },
      {
        name: '时移',
        type: 'line',
        stack: '总量',
        areaStyle: {normal: {}},
        data: chartData.ts
      },
      {
        name: 'OTT',
        type: 'line',
        stack: '总量',
        areaStyle: {normal: {}},
        data: chartData.ott
      },
      {
        name: 'VOD',
        type: 'line',
        stack: '总量',
        areaStyle: {normal: {}},
        data: chartData.vod
      },
      {
        name: '游戏',
        type: 'line',
        stack: '总量',
        areaStyle: {normal: {}},
        data: chartData.game
      },
      {
        name: '教育',
        type: 'line',
        stack: '总量',
        areaStyle: {normal: {}},
        data: chartData.education
      }
      ,
      {
        name: '应用商店',
        type: 'line',
        stack: '总量',
        areaStyle: {normal: {}},
        data: chartData.appstore
      }
      ,
      {
        name: '智慧社区',
        type: 'line',
        stack: '总量',
        areaStyle: {normal: {}},
        data: chartData.community
      }
      ,
      {
        name: '电商平台',
        type: 'line',
        stack: '总量',
        areaStyle: {normal: {}},
        data: chartData.ecom
      }
    ]
  }
};

KpiChart.propsTypes = {
  data: React.PropTypes.array
}

export default KpiChart
