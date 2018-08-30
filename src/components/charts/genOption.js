/**
 * Created by liekkas on 16/3/3.
 */
import _ from 'lodash'
import echarts from 'echarts'

// 222,177,103

const primaryColor = 'rgba(34,34,34,0.8)'
const dashedLineColor = 'rgba(34,34,34,0.2)'

// 橙色
// const areaColor = 'rgba(255,100,40,0.5)'
// const areaColorOffset = 'rgba(255,100,40, 0.1)'
// const colors = ['#428bca', '#fcc837', '#33cc22','#f0ad4e', '#5bc0de']
const colors = ['#ef652f', '#fcc837', '#33cc22', '#f0ad4e', '#5bc0de']

const colors2 = colors

const baseBarSerie = {
//   areaStyle: {
//     normal: {
//       color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
//         offset: 0,
//         color: areaColor
//       }, {
//         offset: 0.9,
//         color: areaColorOffset
//       }])
//     }
//   },
  barMaxWidth: 16,
  animation: true
//   animationDuration: 1000,
//   animationEasing: 'quadraticInOut',
//   lineStyle: {
//     normal: {
//       color: '#1f90e6',
//     }
//   },
}

export function getSingleOption(labels, datas, unit, kpi, hbData, tbData, business) {
  let series = [
    {
      name: kpi,
      type: 'bar',
      ...baseBarSerie,
      data: datas
    }
  ]

  let useHB = hbData.length > 0
  let useTB = tbData.length > 0
  let legendData = []

  if (useHB) {
    series.push({
      name: kpi + '环比增长',
      type: 'line',
      ...baseBarSerie,
      data: hbData,
      yAxisIndex: 1,
      lineStyle: {
        normal: {
          color: '#FCCE10',
        }
      },
    })
    legendData.push(kpi + '环比增长')
  }

  if (useTB) {
    series.push({
      name: kpi + '同比增长',
      type: 'line',
      ...baseBarSerie,
      data: tbData,
      yAxisIndex: 1,
      lineStyle: {
        normal: {
          color: '#27727B',
        }
      },
    })
    legendData.push(kpi + '同比增长')
  }

  return {
//    backgroundColor: 'rgba(0,57,100,0.6)',
//     color: colors,
    title: {
      show: false,
      x: 'right',
      text: kpi,
      subtext: unit
    },
    legend: {
      selectedMode: false,
      left: 'center',
      bottom: 8,
      textStyle: {
        color: primaryColor,
        fontFamily: '黑体',
        fontSize: 12
      },
      data: legendData
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          color: primaryColor
        }
      },
      // formatter: '{b}' + '<br />' + '{a}:{c}' + unit,
      // formatter: function (item) {
      //   console.log('bbq',item)
      //   return item
      // },
      formatter: function (item) {
        if (item.length >= 2) {
          const v1 = item[0]
          const v2 = item[1]
          const v3 = item[2]
          let r = v1.name + '<br />' +
            v1.seriesName + ':  ' + v1.value + unit + '<br />' +
            v2.seriesName + ':  ' + v2.value + '%' + '<br />'
          if (v3) r += v3.seriesName + ':  ' + v3.value + '%' + '<br />'
          return r
        } else if (item.length === 1) {
          const v1 = item[0]
          return v1.name + '<br />' +
            v1.seriesName + ':  ' + v1.value + unit
        }

        return ''
      }
    },
    grid: {
      top: 80,
      bottom: 60,
      borderColor: '#fff',
      borderWidth: 5
//      right: 100,
//      left: 100,
    },
    toolbox: {
      show: true,
      top: 18,
      right: 25,
      feature: {
        mark: {show: false},
        dataView: {show: false, readOnly: false},
        magicType: {show: true, type: ['line', 'bar']},
        restore: {show: false},
        saveAsImage: {show: true, name: business + '_' + kpi}
      }
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: true,
        data: labels,
        axisLine: {
          lineStyle: {
            color: primaryColor
          }
        },
        axisTick: {
          lineStyle: {
            color: primaryColor
          }
        },
        axisLabel: {
          textStyle: {
            color: primaryColor
          }
        },
        splitLine: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        name: `单位：(${unit})`,
        boundaryGap: false,
        type: 'value',
//        max: 500,
        axisLine: {
          lineStyle: {
            color: primaryColor
          }
        },
        axisTick: {
          show: false,
          lineStyle: {
            color: primaryColor
          }
        },
        axisLabel: {
          textStyle: {
            color: primaryColor,
            fontFamily: '黑体',
            fontSize: 13
          }
        },
        splitLine: {
          lineStyle: {
            color: dashedLineColor,
            type: 'dashed'
          }
        }
      },
      {
        name: '增长率(%)',
        show: useHB || useTB,
        type: 'value',
//        max: 500,
        axisLine: {
          lineStyle: {
            color: primaryColor
          }
        },
        axisTick: {
          show: false,
          lineStyle: {
            color: primaryColor
          }
        },
        axisLabel: {
          textStyle: {
            color: primaryColor,
            fontFamily: '黑体',
            fontSize: 13
          }
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: dashedLineColor,
            type: 'dashed'
          }
        }
      }
    ],
    series: series
  }
}

export function getMultiOption(labels, datas, legends, unit, kpi, hbData, tbData) {
  let useHB = hbData.length > 0
  let useTB = tbData.length > 0
  let legendData = []

  let series = []
  for (let i = 0; i < legends.length; i++) {
    kpi === '节目比重'
      ? series.push({
        name: legends[i],
        type: 'bar',
        stack: '总量',
        data: datas[i]
      })
      : series.push({
        name: legends[i],
        type: 'bar',
        data: datas[i]
      })

    legendData.push(legends[i])
    if (useHB) {
      series.push({
        name: legends[i] + '环比增长',
        type: 'line',
        ...baseBarSerie,
        data: hbData[i],
        yAxisIndex: 1
      })
      legendData.push(legends[i] + '环比增长')
    }

    if (useTB) {
      series.push({
        name: legends[i] + '同比增长',
        type: 'line',
        ...baseBarSerie,
        data: tbData[i],
        yAxisIndex: 1
      })
      legendData.push(legends[i] + '同比增长')
    }
  }

  return {
//    backgroundColor: 'rgba(0,57,100,0.6)',
//     color: ['#c94638','#396cbd'],
//     color: colors,
    title: {
      show: false,
      x: 'right',
      text: kpi,
      subtext: unit
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
//        lineStyle: {
//          color: primaryColor
//        }
      }
//      formatter: '{b}' + '<br />' + '{a}:{c}' + unit + '<br />' + '{a1}:{c1}' + unit,
//       formatter: function (item) {
//         if (item.length === 2) {
//           const v1 = item[0]
//           const v2 = item[1]
//           return v1.name + '<br />'
//             + v1.seriesName + ':  ' + v1.value + unit + '<br />'
//             + v2.seriesName + ':  ' + v2.value + unit + '<br />'
//         } else if (item.length === 1) {
//           const v1 = item[0]
//           return v1.name + '<br />'
//             + v1.seriesName + ':  ' + v1.value + unit
//         }
//
//         return ''
//       },
    },
    grid: {
      top: 100,
      bottom: 55
    },
    legend: {
      left: 'center',
      top: 50,
      textStyle: {
        color: primaryColor,
        fontFamily: '黑体',
        fontSize: 14
      },
//       data: legends
      data: legendData
    },
    toolbox: {
      show: true,
      top: 18,
      right: 25,
      feature: {
        mark: {show: false},
        dataView: {show: false, readOnly: false},
        magicType: {show: true, type: ['line', 'bar']},
        restore: {show: false},
        saveAsImage: {show: true}
      }
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: true,
        data: labels,
        axisLine: {
          lineStyle: {
            color: primaryColor
          }
        },
        axisTick: {
          lineStyle: {
            color: primaryColor
          }
        },
        axisLabel: {
          textStyle: {
            color: primaryColor
          }
        },
        splitLine: {
          lineStyle: {
            color: primaryColor
          }
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
//        max: 500,
        axisLine: {
          lineStyle: {
            color: primaryColor
          }
        },
        axisTick: {
          show: false,
          lineStyle: {
            color: primaryColor
          }
        },
        axisLabel: {
          textStyle: {
            color: primaryColor,
            fontFamily: '黑体',
            fontSize: 13
          },
          formatter: function (value, index) {
            switch (kpi) {
              case '使用时长':
              case '点播时长':
                return value * 10000 / 100000000 + '万' + unit
              default:
                return value + unit
            }
          }
        },
        splitLine: {
          lineStyle: {
            color: dashedLineColor,
            type: 'dashed'
          }
        }
      },
      {
        name: '增长率(%)',
          show: useHB || useTB,
          type: 'value',
//        max: 500,
          axisLine: {
            lineStyle: {
              color: primaryColor
            }
        },
        axisTick: {
          show: false,
          lineStyle: {
            color: primaryColor
          }
        },
        axisLabel: {
          textStyle: {
            color: primaryColor,
            fontFamily: '黑体',
            fontSize: 13
          }
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: dashedLineColor,
            type: 'dashed'
          }
        }
      }
    ],
    series
  }
}

export function getDoubleAxisOption(labels, datas, legends, unit, kpi) {
  let series = []
  for (let i = 0; i < legends.length; i++) {
    kpi === '户均使用时长'
      ? series.push({
        name: legends[i],
        type: 'bar',
        data: datas[i]
      })
      : series.push({
        name: legends[i],
        type: 'bar',
        yAxisIndex: i,
        data: datas[i]
      })
  }

  return {
//    backgroundColor: 'rgba(0,57,100,0.6)',
    color: colors2,
    title: {
      show: false,
      x: 'right',
      text: kpi,
      subtext: unit
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
//        lineStyle: {
//          color: primaryColor
//        }
      },
//      formatter: '{b}' + '<br />' + '{a}:{c}' + unit + '<br />' + '{a1}:{c1}' + unit,
      formatter: function (item) {
        if (item.length === 2) {
          const v1 = item[0]
          const v2 = item[1]
          return v1.name + '<br />' +
            v1.seriesName + ':  ' + v1.value + unit + '<br />' +
            v2.seriesName + ':  ' + v2.value + unit + '<br />'
        } else if (item.length === 1) {
          const v1 = item[0]
          return v1.name + '<br />' +
            v1.seriesName + ':  ' + v1.value + unit
        }

        return ''
      }
    },
    grid: {
      top: 70,
      bottom: 55
    },
    legend: {
      selectedMode: false,
      left: 'center',
      top: 20,
      textStyle: {
        color: primaryColor,
        fontFamily: '黑体',
        fontSize: 14
      },
      data: legends
    },
    toolbox: {
      show: false,
      feature: {
        mark: {show: false},
        dataView: {show: false, readOnly: false},
        magicType: {show: false, type: ['line', 'bar']},
        restore: {show: false},
        saveAsImage: {show: true}
      },
      iconStyle: {
        normal: {
//          color: '#ffffff',
//          borderColor: primaryColor,
        },
        emphasis: {
//          borderColor: '#FFAA00',
        }
      }
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: true,
        data: labels,
        axisLine: {
          lineStyle: {
            color: primaryColor
          }
        },
        axisTick: {
          lineStyle: {
            color: primaryColor
          }
        },
        axisLabel: {
          textStyle: {
            color: primaryColor
          }
        },
        splitLine: {
          lineStyle: {
            color: primaryColor
          }
        }
      }
    ],
    yAxis: [
      {
//         name: '直播',
        type: 'value',
//        max: 500,
        axisLine: {
          lineStyle: {
            color: primaryColor
          }
        },
        axisTick: {
          show: false,
          lineStyle: {
            color: primaryColor
          }
        },
        axisLabel: {
          textStyle: {
            color: primaryColor,
            fontFamily: '黑体',
            fontSize: 13
          },
          formatter: function (value, index) {
            switch (kpi) {
              case '使用时长':
              case '点播时长':
                return value * 10000 / 100000000 + '万' + unit
              default:
                return value + unit
            }
          }
        },
        splitLine: {
          lineStyle: {
            color: dashedLineColor,
            type: 'dashed'
          }
        }
      }, {
//         name: '点播',
        type: 'value',
//        max: 20000,
        axisLine: {
          show: false,
          lineStyle: {
            color: primaryColor
          }
        },
        axisTick: {
          show: false,
          lineStyle: {
            color: primaryColor
          }
        },
        axisLabel: {
          show: false,
          textStyle: {
            color: primaryColor,
            fontFamily: '黑体',
            fontSize: 13
          },
          formatter: function (value, index) {
            switch (kpi) {
              case '使用时长':
              case '点播时长':
                return value * 1000 / 10000000 + '万' + unit
              default:
                return value + unit
            }
          }
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: primaryColor
          }
        }

      }
    ],
    series
  }
}

export function getOrderOption(labels, datas, unit, kpi) {
  const end = datas.length > 100 ? 10 : datas.length

  return {
//    backgroundColor: 'rgba(0,57,100,0.6)',
    title: {
      show: false,
      x: 'right',
      text: kpi,
      subtext: unit
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        lineStyle: {
          color: primaryColor
        }
      },
//      formatter: '{b}' + '<br />' + '{a}:{c}' + unit,
      formatter: function (item) {
        const d = item[0]
        return d.name + '<br />' +
          d.seriesName + ':  ' + d.data.value + unit + '<br />' +
          '排名:  ' + d.data.rank
      }
    },
    grid: {
      top: 70,
      bottom: 76
    },
    toolbox: {
      show: false,
      feature: {
        mark: {show: false},
        dataView: {show: false, readOnly: false},
        magicType: {show: false, type: ['line', 'bar']},
        restore: {show: false},
        saveAsImage: {show: true}
      },
      iconStyle: {
        normal: {
//          color: '#ffffff',
//          borderColor: primaryColor,
        },
        emphasis: {
//          borderColor: '#FFAA00',
        }
      }
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: true,
        data: labels,
        axisLine: {
          lineStyle: {
            color: primaryColor
//            color: 'rgba(255,255,255,0.8)',
          }
        },
        axisTick: {
          lineStyle: {
//            color: 'rgba(255,255,255,0.8)',
          }
        },
        axisLabel: {
          formatter: function (item) {
            return item.length > 10 ? item.substring(0, 10) + '...' : item
          },
          textStyle: {
            color: primaryColor
          }
        },
        splitLine: {
          lineStyle: {
            color: primaryColor
          }
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
//        max: 500,
        axisLine: {
          lineStyle: {
            color: primaryColor
//            color: 'rgba(255,255,255,0.8)',
          }
        },
        axisTick: {
          show: false,
          lineStyle: {
//            color: 'rgba(255,255,255,0.8)',
          }
        },
        axisLabel: {
          textStyle: {
            color: primaryColor,
            fontFamily: '黑体',
            fontSize: 13
          },
//          formatter: getFormat(kpi) + unit
          formatter: function (value, index) {
            switch (kpi) {
              case '使用时长':
              case '点播时长':
                return value * 10000 / 100000000 + '万' + unit
              default:
                return value + unit
            }
          }
        },
        splitLine: {
          lineStyle: {
            color: dashedLineColor,
            type: 'dashed'
          }
        }
      }
    ],
    dataZoom: {
      type: 'slider',
      dataBackgroundColor: primaryColor,
      fillerColor: 'rgba(255,0,0,0.2)',
      handleColor: 'rgba(194,53,49,0.8)',
      bottom: 12,
      start: 0,
      end,
      textStyle: {
//        color: primaryColor,
        color: '#fff'
      }
    },
//    dataZoom: {
//      type: 'inside',
//      start: 60,
//      end: 80
//    },
    series: [
      {
        name: kpi,
        type: 'bar',
        data: datas,
        itemStyle: {normal: {label: {show: false, position: 'insideRight'}}}
      }
    ]
  }
}

var lineStyle = {
  normal: {
    width: 1,
    opacity: 0.5
  }
}

export function getRadarOption(labels, datas) {
  let inds = []
  const max = _.maxBy(datas, function (o) {
    return Number(o)
  })
  for (let i = 0; i < labels.length; i++) {
    inds.push({
      name: labels[i],
      max
    })
  }

  const toolLabels = ['TOP1-10', 'TOP11-20', 'TOP21-30', 'TOP31-40', 'TOP41-50', 'TOP51-100', '其它']

  return {
//    backgroundColor: '#161627',
    title: {
      text: '市占率',
//      x: 'center',
      right: 20,
      top: 10,
      textStyle: {
        color: '#E2E3E4',
        fontWeight: 'normal',
        fontSize: 16
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: function (item) {
        const data = item.value
        let tip = item.seriesName + '<br />'
        if (data && data.length > 0) {
          data.forEach((v, i) => {
            tip += toolLabels[i] + ' : ' + v + '%<br />'
          })
        }
        return tip
      }
    },
    radius: '70%',

    radar: {
      indicator: inds,
      shape: 'circle',
      splitNumber: 5,
      name: {
        textStyle: {
          color: 'rgb(238, 197, 102)'
        }
      },
      splitLine: {
        lineStyle: {
          color: [
            'rgba(238, 197, 102, 0.1)', 'rgba(238, 197, 102, 0.2)',
            'rgba(238, 197, 102, 0.4)', 'rgba(238, 197, 102, 0.6)',
            'rgba(238, 197, 102, 0.8)', 'rgba(238, 197, 102, 1)'
          ].reverse()
        }
      },
      splitArea: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(238, 197, 102, 0.5)'
        }
      }
    },
    series: [
      {
        name: '市占率',
        type: 'radar',
        lineStyle: lineStyle,
        data: [datas],
        symbol: 'none',
        itemStyle: {
          normal: {
            color: '#F9713C'
          }
        },
        areaStyle: {
          normal: {
            opacity: 0.7
          }
        }
      }
    ]
  }
}
var defaultGrid = {
  left: '3%',
  right: '10%',
  bottom: '3%',
  containLabel: true ,//grid 区域是否包含坐标轴的刻度标签。
  borderColor: '#fff',
}
var defalutColor = ['#C1232B']
var defaultGridSize = 10
var defaultMax = 5
export function getPieOption(labels, datas) {
  let values = []
  for (let i = 0; i < labels.length; i++) {
    values.push({
      name: labels[i],
      value: datas[i]
    })
  }

  return {
    color: ['#993333', '#396cbd', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#CD7F32'],

//    color: ['rgba(238, 197, 102, 0.6)','#759aa0','#e69d87','#8dc1a9','#ea7e53','#eedd78','#73a373','#73b9bc','#7289ab', '#91ca8c','#f49f42'],
    title: {
      text: '点播时长',
//      x: 'center',
      left: 20,
      top: 10,
      textStyle: {
        color: '#E2E3E4',
        fontWeight: 'normal',
        fontSize: 16
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c}分钟 ({d}%)'
    },
    legend: {
//      orient: 'vertical',
//      x: 'right',
//      right: 20,
//      top: 20,
      show: false,
      textStyle: {
        color: primaryColor
      },
      data: labels
    },
    series: [
      {
        name: '点播时长',
        type: 'pie',
//        radius: ['50%', '70%'],
        hoverAnimation: true,
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: true
          },
          emphasis: {
            show: true
//             textStyle: {
// //               fontSize: '30',
//               fontWeight: 'bold'
//             }
          }
        },
        labelLine: {
          normal: {
            show: true
          }
        },
        data: values
      }
    ]
  }
}
/*
* 图表echart生成option统一方法
* type：
*   x_line 水平方向折线图
*   y_line 竖直方向折线图
*   x_bar 水平方向柱形图
*   y_bar 竖直方向柱形图
*   wordCloud 字符云
* color: 图表颜色
* x_data_name:x坐标名称
* y_data_name:y坐标名称
* x_data x轴数据
* y_data y轴数据
* */
export function getTypeOption(data) {
    const {type,x_data_name,y_data_name,x_data,y_data,title,legendData,series_name} =data //常量
    let {grid,color,gridSize,sizeRange,rotationRange,rotationStep,isShow} = data //样式
    if(type == 'x_bar'){
      //水平方向 柱形
        return {
            color:color == undefined?defalutColor:color,
            tooltip : {
              axisPointer: {
                type: 'shadow',
                lineStyle: {
                  color: primaryColor
                }
              },
              trigger: 'axis', // [ default: 'item' ]   触发类型。坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
               /* axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }*/
            },
            grid: grid,
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                lineStyle: {
                  color: primaryColor
                }
              },
            },
            legend: {
              left: 'center',
              top: 50,
              textStyle: {
                color: primaryColor,
                fontFamily: '黑体',
                fontSize: 14
              },
              data: legendData
            },
            toolbox: {
              show: true,
              top: 18,
              right: 25,
              feature: {
                mark: {show: false},
                dataView: {show: false, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: false},
                saveAsImage: {show: true, name: title}
              }
            },
            xAxis : [
              {
                name:x_data_name,
                boundaryGap: true,
              /*  max:x_data.length<5?defaultMax:x_data.length,*/
                type : 'category',
                data : x_data,//data 格式  ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisLine: {
                  lineStyle: {
                    color: primaryColor
                  }
                },
                axisTick: {
                  lineStyle: {
                    color: primaryColor
                  }
                },
                axisLabel: {
                  textStyle: {
                    color: primaryColor
                  }
                },
                splitLine: {
                  show: false
                },
              }
            ],
              yAxis : [
              {
                name:y_data_name,
                type : 'value',
                axisLine: {
                  lineStyle: {
                    color: primaryColor
                  }
                },
                axisTick: {
                  show: false,
                  lineStyle: {
                    color: primaryColor
                  }
                },
                axisLabel: {
                  textStyle: {
                    color: primaryColor,
                    fontFamily: '黑体',
                    fontSize: 13
                  }
                },
                splitLine: {
                  lineStyle: {
                    color: dashedLineColor,
                    type: 'dashed'
                  }
                }
              }
            ],
              series : [
              {
                name:series_name,
                type:'bar',
                ...baseBarSerie,
                data:y_data //data 格式 [10, 52, 200, 334, 390, 330, 220]
              }
            ]
      }
    }else if( type == 'wordCloud'){
      return {
        tooltip: {
          show: isShow == undefined?false:isShow
        },
        series: [{
          left: 'center',
          top: 'center',
          width: '100%',
          height: '100%',
          right: null,
          bottom: null,
          shape: 'apple',
          type :'wordCloud',
          sizeRange: sizeRange==undefined? [12, 14]:sizeRange,
          rotationRange:rotationRange==undefined? [-90, 90]:rotationRange,
          rotationStep:rotationStep==undefined? 45:rotationStep,
          gridSize: gridSize == undefined?defaultGridSize:gridSize,
          drawOutOfBound: false,
          data:y_data
         /*   data 格式：
          [{
            name: 'Farrah Abraham',
            value: 366,
            // Style of single text
            textStyle: {
              normal: {},
              emphasis: {}
            }
          }]*/
        }]
      }
    }
}
export function getEchartTemplateOption(param) {
  const {type, data, color, identification} = param;
  if(data == null || data.length == 0) {
    return null
  }
  if(type=='horizontalBarGraph'){//水平柱状图
    const {x_data_name, y_data_name} = param;
    const {x_axis, z_axis}=data[0];
    let x_data = x_axis;
    let y_data = z_axis;
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line'
        },
        formatter: function (params) {
          return params[0].name + '<br/>' + params[0].value;
        }
      },
      grid: {
        x: '3%',
        y: 60,
        x2: 80,
        y2: 20,
        containLabel: true
      },
      xAxis: {
        name: x_data_name,
        type: 'value',
        axisTick:{
          show: false
        }
        // ,
        // boundaryGap: [0, 0.01]
      },
      yAxis: {
        name: y_data_name,
        type: 'category',
        axisTick:{
          show: false
        },
        data: y_data
      },
      series: [
        {
          type: 'bar',
          ...baseBarSerie,
          data: x_data,
          itemStyle: {
            normal: {
              color: color,
            }
          }
        }
      ]
    };
  }else if(type=='verticalBarGraph') {//竖直柱状图
    const {x_data_name, y_data_name} = param;
    const {x_axis, y_axis}=data[0];
    let x_data = y_axis;
    let y_data = x_axis;
    if(identification == "valueTagsCluster" || identification == "viscosityTagsCluster") {//标签分群
      const {z_axis}=data[0];
      x_data = z_axis
      y_data = x_axis;
    }
    return {//竖柱状图
      tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: function (params) {
          return params[0].name + '<br/>' + params[0].value;
        }
      },
      grid: {
        x: '3%',
        y: 60,
        x2: 80,
        y2: 20,
        containLabel: true
      },
      xAxis : [
        {
          name: x_data_name,
          type : 'category',
          data : x_data,
          axisTick:{
            show: false
          },
          axisLabel:{
            // interval: 0,
            // rotate: -45,
            textStyle:{
              fontSize: 10
            }
          }
        }
      ],
      yAxis : [
        {
          name: y_data_name,
          type : 'value',
          axisTick:{
            show: false
          },
        }
      ],
      series : [
        {
          type:'bar',
          ...baseBarSerie,
          data: y_data,
          itemStyle: {
            normal: {
              color: color,
            }
          }
        }
      ]
    };
  } else if(type=='verticalBarGraphLegend') {//带图例的竖直柱状图
    const {x_data_name, y_data_name, currentLegend, dataDictionary} = param;
    const {x_axis, y_axis}=data[0];
    const y_axis_Cn = changeEnToCn(y_axis, dataDictionary);//英文简称转换为中文简称
    const legendSelectedIndex = currentLegend == "" ? 0 : y_axis_Cn.indexOf(currentLegend);
    let x_data = x_axis[legendSelectedIndex].length==0 ? []:x_axis[legendSelectedIndex][0];
    let y_data = y_axis_Cn;
    return {
      tooltip : {
        trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: function (params) {
          return params[0].name + '<br/>' + params[0].value;
        }
      },
      legend: {
        type: 'scroll',
        selectedMode: 'single',
        width: '80%',
        data: y_data
      },
      grid: {
        x: '3%',
        y: 60,
        x2: 80,
        y2: 20,
        containLabel: true
      },
      xAxis : [
        {
          name: x_data_name,
          type : 'category',
          data : x_data,
          axisTick:{
            show: false
          },
          axisLabel:{
            interval: 0,
            textStyle:{
              fontSize: 10
            }
          }
        }
      ],
        yAxis : [
        {
          name: y_data_name,
          type : 'value',
          axisTick:{
            show: false
          },
        }
      ],
        series : getLegendSeries(x_axis, y_data, color)
    };
  } else if(type=='lineChart') {//简单折线图
    const {x_data_name, y_data_name} = param;
    const {x_axis, y_axis}=data[0];
    return {
      tooltip: {
        trigger: 'axis',
        formatter: function (params) {
          return params[0].name + '<br/>' + params[0].value;
        }
      },
      grid: {
        x: '3%',
        y: 60,
        x2: 80,
        y2: 20,
        containLabel: true
      },
      xAxis: {
        name: x_data_name,
        type: 'category',
        boundaryGap: false,
        data: x_axis
      },
      yAxis: {
        name: y_data_name,
        type: 'value',
        axisTick:{
          show: false
        }
      },
      series: [
        {
          ...baseBarSerie,
          type:'line',
          data:y_axis
        }
      ]
    };
  } else if(type=='') {//

  } else if(type=='viscosityOverview') {////群体画像-粘性类-概况
    return {
      tooltip: {
        trigger: 'item',
        formatter: function(params, ticket, callback) {
          var res= params.name + '人，' + params.percent + '%'+"</br>"+params.seriesName;
          if("lossUser" == params.seriesName){
            res = params.name == '' ? 0 : params.name + '人'
          }
          return res;
        }
      },
      series :getViscosityOverview(data)
    }
  }else if(type=='valueLevel') {//群体画像-价值类-等级
    const {levelItemValue, valueLevel}=data[0]
    return {
      backgroundColor:'#fff',
      tooltip : {
        trigger: 'axis',
        axisPointer : {
          type : 'line'
        }
      },
      grid:{
        left:80,
        top:0,
        right:80,
        bottom:0
      },
      yAxis : [{
        type : 'category',
        data : getYAxis(parseInt(valueLevel)),
        splitLine: { show: false},
        axisLine: { show: false},
        axisTick:{ show: false}
      }],
      xAxis : [{
        show: false,//不显示横坐标
      }],
      label: {
        normal: {
          show: true,
          position: 'right',
          formatter: '{c}户'
        }
      },
      series : [{
        name: '人数',
        type:'bar',
        ...baseBarSerie,
        data:levelItemValue,
        itemStyle: {
          normal: {
            color: color,
            //   color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
            //   offset: 0,color: 'rgba(250, 226, 216, 0.1)'
            // }, {
            //   offset: 1,color: 'rgba(215, 0, 16, 1)'
            // }]),
            // shadowColor: 'rgba(0, 0, 0, 0.1)',
            // shadowBlur: 20
          }
        }
      }]
    };
  } else {
    return null;
  }
}

//群体画像-价值类-等级 并排显示5个饼图
function getViscosityOverview(data) {
  // var x_axis=["0","1","2","3","4"];
  // var y_axis=["127","276","188","108","47"];
  // var z_axis=["0.2","0.22","0.55","0.33","0.1"];
  const {x_axis, y_axis,lossUserCount, z_axis, viscosityLevel,usecount_axis,usetime_axis}=data[0];
  var series = [];
  for(var i=0; i<4; i++) {
    series.push({
      name: '特征值区间:使用时长'+usetime_axis[i]+"秒,使用次数"+Math.round(usecount_axis[i])+"次",//启用legend
      center: [10+i*20+'%','50%'],
      radius: ['30%','40%'],
      type: 'pie',
      labelLine: {
        normal: {
          show: false
        }
      },
      data: [{
        name: y_axis[i],
        value: z_axis[i]/100,
        itemStyle: {
          normal: {
            color: '#DB3C2B'
          },
          emphasis: {
            color: '#DB3C2B'
          }
        },
        label: {
          normal: {
            formatter: getViscosityOverviewTitle(i),
            position: 'center',
            show: true,
            textStyle: {
              fontSize: i!=viscosityLevel ? 16 :18,//字体大小
              fontWeight: 'bold',
              color: i!=viscosityLevel ? '#000' : '#D71920'
            }
          }
        }
      },
      {
        value: 1-parseFloat(z_axis[i])/100,
        tooltip: {
          show: false
        },
        itemStyle: {
          normal: {
            color: i!=2?'#FAE4DC':'#F7A79F'
          },
          emphasis: {
            color: i!=2?'#FAE4DC':'#F7A79F'
          }
        },
        hoverAnimation: false
      }]
    });
  }
  const a= 4
  series.push({
    name: 'lossUser',//启用legend
    center: [10+a*20+'%','50%'],
    radius: ['30%','40%'],
    type: 'pie',
    labelLine: {
      normal: {
        show: false
      }
    },
    data: [{
      name: lossUserCount,
      value: 0,
      itemStyle: {
        normal: {
          color: '#DB3C2B'
        },
        emphasis: {
          color: '#DB3C2B'
        }
      },
      label: {
        normal: {
          formatter: getViscosityOverviewTitle(4),
          position: 'center',
          show: true,
          textStyle: {
            fontSize: a!=viscosityLevel ? 16 :18,//字体大小
            fontWeight: 'bold',
            color: a!=viscosityLevel ? '#000' : '#D71920'
          }
        }
      }
    },
      {
        value: 1,
        tooltip: {
          show: false,
        },
        itemStyle: {
          normal: {
            color: a!=2?'#FAE4DC':'#F7A79F'
          },
          emphasis: {
            color: a!=2?'#FAE4DC':'#F7A79F'
          }
        },
        hoverAnimation: false
      }]
  });
  return series;
}
function getViscosityOverviewTitle(i){
  switch (i) {
    case 0:
      return '高粘性';
      break;
    case 1:
      return '普通粘性';
      break;
    case 2:
      return '沉寂用户';
      break;
    case 3:
      return '预流失用户';
      break;
    case 4:
      return '流失用户';
      break;
  }
}
function getLegendSeries(x_axis, y_data, color){
  var series = [];
  for(var i=0;i<y_data.length;i++){
    if(x_axis.length > 0) {
      series.push({
        name:y_data[i],
        type:'bar',
        ...baseBarSerie,
        data: x_axis[i][1],
        itemStyle: {
          normal: {
            color: color,
          }
        }
      });
    }
  }
  return series;
}
function changeEnToCn(y_axis, dataDictionary){
  return y_axis.map(function (item) {
    let zh;
    dataDictionary.map(function (dictionary) {
      if(dictionary.en == item) {
        zh = dictionary.cn;
      }
    });
    return zh;
  });
}
function getYAxis(level) {
  var data = [];
  for(var i=0;i<7;i++){
    data.push({
      value:"Lev."+(i+1),
      textStyle:{
        color : i!=level ? '' : '#D71920',
        fontSize : i!=level ? 12 :16
      }
    });
  }
  return data;
}

