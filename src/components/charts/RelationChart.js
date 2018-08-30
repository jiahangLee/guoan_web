/**
 * Created by jiahang Lee on 2017/7/29.
 */
import { Modal, Button ,Checkbox, Radio} from 'antd';
import ECharts from 're-echarts'
import Panel from '../Panel'
import React, {PropTypes} from 'react'

import styled from 'styled-components'
import {getSingleOption, getMultiOption} from './genOption'
import _ from 'lodash'
import * as echarts from "echarts";
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



class RelationChart extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      currentKpi: props.kpis[0],
    }
  }

   fun  (v){
    var series1=[];
    for( var i=1;i < v.length;i++){
      var allData =  "data.data"+i.toString()
      var allLinks = "links.links"+i.toString()
      var allCategories = "categories.categories"+i.toString()

      var item={
        force: {
          repulsion: 1000
        },

        data: allData,
        links: allLinks,
        categories:allCategories,
        focusNodeAdjacency: true,
        roam: true,
        label: {
          normal: {

            show: true,
            position: 'top',

          }
        },
        lineStyle: {
          normal: {
            color: 'source',
            curveness: 0,
            type: "solid"
          }
        }
      }
      series1.push(item);
    };
    return series1;
  }
  loadFlowTrendData(data,links,categories,periodType){
    if(periodType == '30'){
      return {
        baseOption: {
          timeline: {
            data: [
              '0：30', '1：00', '1：30', '2：00', '2：30', '3：00', '3：30', '4：00', '4：30', '5：00', '5：30', '6：00', '6：30', '7：00', '7：30', '8：00', '8：30', '9：00', '9：30', '10：00', '10：30', '11：00', '11：30', '12：00', '12：30', '13：00', '13：30', '14：00', '14：30', '15：00', '15：30', '16：00', '16：30', '17：00', '17：30', '18：00', '18：30', '19：00', '19：30', '20：00', '20：30', '21：00', '21：30', '22：00', '22：30', '23：00', '23：30', '0：00'
            ],
            top:25,
            axisType: 'category',
            autoPlay: true,
            playInterval: 3000,
          },
          tooltip: {},
          legend: [{
            formatter: function (name) {
              return echarts.format.truncateText(name, 40, '14px Microsoft Yahei', '…');
            },
            tooltip: {
              show: true
            },
            selectedMode: 'false',
            bottom: 20,
            data: categories
          }],
          toolbox: {
            show: true,
            feature: {
              dataView: {
                show: true,
                readOnly: true
              },
              restore: {
                show: true
              },
              saveAsImage: {
                show: true
              }
            }
          },
          animationDuration: 3000,
          animationEasingUpdate: 'quinticInOut',
          series: []
        },

        options :
          []}
    }else {
      return {
        tooltip: {},
        legend: [{
          formatter: function(name) {
            return echarts.format.truncateText(name, 40, '14px Microsoft Yahei', '…');
          },
          tooltip: {
            show: true
          },
          selectedMode: 'false',
          bottom: 20,
          data: categories
        }],
        toolbox: {
          show: true,
          feature: {
            dataView: {
              show: true,
              readOnly: true
            },
            restore: {
              show: true
            },
            saveAsImage: {
              show: true
            }
          }
        },
        animationDuration: 3000,
        animationEasingUpdate: 'quinticInOut',
        series: [{
          // top:105,
          type: 'graph',
          layout: 'force',

          force: {
            repulsion: 500
          },
          data: data,
          links: links,
          categories: categories,
          focusNodeAdjacency: true,
          roam: true,
          label: {
            normal: {

              show: true,
              position: 'top',

            }
          },
          lineStyle: {
            normal: {
              color: 'source',
              curveness: 0,
              type: "solid"
            }
          }
        }]
      }
    }
  }

  parseTableData (v, kpi,periodType) {
    if (_.isEmpty(v)) return {}
    if(kpi.en =='active_user'){
      var option =  this.loadFlowTrendData(v.activeUser.data,v.activeUser.links,v.activeUser.categories,periodType)
      if(periodType=='30') {
        this.funcOptons(v.activeUser.data, v.activeUser.links, v.activeUser.categories, option)
      }
      return option
      //return this.loadFlowTrendData(v.activeUser.data,v.activeUser.links,v.activeUser.categories,periodType)
    }
    if(kpi.en =='active_user_ratio'){
      var option =  this.loadFlowTrendData(v.activeUserRatio.data,v.activeUserRatio.links,v.activeUserRatio.categories,periodType)
      if(periodType=='30') {
        this.funcOptons(v.activeUserRatio.data, v.activeUserRatio.links, v.activeUserRatio.categories, option)
      }
      return option
    }
    if(kpi.en =='use_count'){
      var option =  this.loadFlowTrendData(v.useCount.data,v.useCount.links,v.useCount.categories,periodType)
      if(periodType=='30') {
        this.funcOptons(v.useCount.data, v.useCount.links, v.useCount.categories, option)
      }
      return option
    }
    if(kpi.en =='time_in_use'){
      var option =  this.loadFlowTrendData(v.timeInUse.data,v.timeInUse.links,v.timeInUse.categories,periodType)
      if(periodType=='30') {
        this.funcOptons(v.timeInUse.data, v.timeInUse.links, v.timeInUse.categories, option)
      }
      return option
    }
    return {}

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

  funcOptons(data,links,categories,option){
    for (var i = 0; i < 24; i++) {
      var dataOpt ='data.data'+i;
      //option.baseOption.timeline.data.push(timeLineData[i]);
      option.options.push(
        {
          tooltip: {},
          legend: [{
            formatter: function (name) {
              return echarts.format.truncateText(name, 40, '14px Microsoft Yahei', '…');
            },
            tooltip: {
              show: true
            },
            selectedMode: 'false',
            bottom: 20,
            data: categories
          }],
          toolbox: {
            show: true,
            feature: {
              dataView: {
                show: true,
                readOnly: true
              },
              restore: {
                show: true
              },
              saveAsImage: {
                show: true
              }
            }
          },
          animationDuration: 3000,
          animationEasingUpdate: 'quinticInOut',

          series: [{
            // top:105,
            type: 'graph',
            layout: 'force',

            force: {
              repulsion: 1000
            },
            data: data['data'+i],
            links: links['links'+i],
            categories: categories['categories'+i],
            focusNodeAdjacency: true,
            roam: true,
            label: {
              normal: {

                show: true,
                position: 'top',

              }
            },
            lineStyle: {
              normal: {
                color: 'source',
                curveness: 0,
                type: "solid"
              }
            }
          }
          ]
        }
      )
    }
  }

  render() {

    const {kpis, title, height, tableData, config,periodType} = this.props
    const {currentKpi} = this.state
    const option = this.parseTableData(tableData, currentKpi,periodType)

    return (
      <Panel title={title}>
        {
        _.isEmpty(option)
          ? <div style={{height}} />
          : <ECharts option={option} style={{height:"70vh"}} notMerge  />
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


      </Panel>
    );
  }
}


RelationChart.propTypes = {
  kpis: PropTypes.array.isRequired,
  bizSubtype: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tableData: PropTypes.array,
  config: PropTypes.object,
  onCompare: PropTypes.func,
  isCompare: PropTypes.bool
}

RelationChart.defaultProps = {
  height: '400px',
  isCompare: true,
  bizSubtype:'common'
}

export default RelationChart
