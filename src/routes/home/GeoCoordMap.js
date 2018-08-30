/**
 * Created by liekkas on 2017/2/9.
 */
import React from 'react'
import styled from 'styled-components'
import { connect } from 'dva'
import echarts from 'echarts'
import ECharts from 're-echarts'
import china from './china.json'
import KPIS from "../../consts/kpis";


echarts.registerMap('china', china)

const Root = styled.div`
  width: 55%;
`

class GeoCoordMap extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      option: getMapOption(props.mapData,props.geoCoordMap)
    }
  }

  render () {
    return (
      <Root>
        <ECharts option={getMapOption(this.props.mapData,this.props.geoCoordMap)}  />
      </Root>
    )
  }
}

const  convertData = function (data, geoCoordMap) {
  let res = []
  for (let i = 0; i < data.length; i++) {
    let geoCoord = geoCoordMap[data[i].name]
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value/10000)
      })
    }
  }
  return res
}

const getMapOption = (data, geoCoordMap) => {
  if (data==undefined) {
    data = []
  }
  return {
    tooltip: {
      trigger: 'item',
      formatter: function (item) {
//         console.log(item)
        return item.name + ':' + item.value[2] + '万户'
      }
    },
    geo: {
      map: 'china',
      label: {
        normal: {
          show: true,
          textStyle: {
            color: '#7da5f9',
            fontSize: 9
          }
        },
        emphasis: {
          show: true,
          textStyle: {
            color: '#7da5f9',
            fontSize: 9
          }
        }
      },
      roam: false,
      itemStyle: {
        normal: {
          areaColor: '#2c6eda',
          borderColor: '#7da5f9',
//             borderColor: '#011c72',
          borderWidth: 0.5,
//             shadowColor: '#5474a6',
//             shadowBlur: 10,
//             shadowOffsetX: -1,
//             shadowOffsetY: -10,
          opacity: 0.68
        },
        emphasis: {
          areaColor: '#2c6eda',
//             borderColor: borderColor,
          borderWidth: 1
        }
      }
    },
    series: [
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        data: convertData(data, geoCoordMap),
        symbolSize: function (val) {
          return val[2] / 4
        },
        itemStyle: {
          normal: {
            color: '#e08b23',
            shadowBlur: 10,
            shadowColor: '#333'
          }
        }
      },
      {
        name: 'Top 5',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        data: convertData(data.sort(function (a, b) {
          return b.value - a.value
        }).slice(0, 5), geoCoordMap),
        symbolSize: function (val) {
          return val[2] / 1.7
        },
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke'
        },
        hoverAnimation: true,
        label: {
          normal: {
            formatter: '{b}',
            position: 'right',
            show: true,
            textStyle: {
              color: '#fff'
            }
          }
        },
        itemStyle: {
          normal: {
            color: '#e08b23',
            shadowBlur: 10,
            shadowColor: '#333'
          }
        },
        zlevel: 1
      }
    ]
  }
}

GeoCoordMap.propsTypes = {
  mapData: React.PropTypes.array
}

export default GeoCoordMap
