/**
 * Created by zhangtao on 2017/10/27.
 */
import {Modal, Button, Checkbox, Radio} from 'antd';
import Panel from '../Panel'
import React, {PropTypes} from 'react'

import styled from 'styled-components'
import _ from 'lodash'
import ECharts from 're-echarts'
import XLSX from 'xlsx';
var FileSaver = require('file-saver');
import { connect } from 'dva'
import fetch from 'dva/fetch'
import REST_API from '../../consts/api'
import {local, session} from '../../utils/storage.js'

class SankeyChart extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      currentKpi: props.kpis[0],
    }
  }

  exportData() {
    const {tableData, title,areaName} = this.props
    var columns = new Array('current_pagename','parent_pagename','user_count','click_count','l_date','area_name')
    var data = tableData.data
    if (data.length == 0)
      return
    const operatorId = session.get("operatorId");
    var param = '?biz=overview&bizSubtype=flowtrend&areaName=' + areaName + '&browsePageCount=1&dataDownCount=1&loginCount=0&userName=' + operatorId
    fetch(REST_API.userUseLog + param)
      .then(response => response.json())
      .then((body) => {
      });

    let renderData = []
    for (let i = 0; i < data.length; i++) {
      data[i].row_num = i + 1
      renderData.push(data[i])
    }

    // workbook
    var _headers = columns
    var headers = _headers
    // 为 _headers 添加对应的单元格位置
      .map((v, i) => Object.assign({}, {v: v, position: this.convertCell(i) + 1}))
      // 转换成 worksheet 需要的结构
      .reduce((prev, next) => Object.assign({}, prev, {[next.position]: {v: next.v}}), {});
    var _data = renderData
    // 匹配 headers 的位置，生成对应的单元格数据
      .map((v, i) => _headers.map((k, j) => Object.assign({}, {
        v: v[k],
        position: this.convertCell(j) + (i + 2)
      })))
      // 对刚才的结果进行降维处理（二维数组变成一维数组）
      .reduce((prev, next) => prev.concat(next))
      // 转换成 worksheet 需要的结构
      .reduce((prev, next) => Object.assign({}, prev, {[next.position]: {v: next.v}}), {});
    // 合并 headers 和 data
    var output = Object.assign({}, headers, _data);
    // 获取所有单元格的位置
    var outputPos = Object.keys(output);
    // 计算出范围
    var ref = outputPos[0] + ':' + outputPos[outputPos.length - 1];
    // 构建 workbook 对象
    var wb = {
      SheetNames: ['Sheet'],
      Sheets: {
        'Sheet': Object.assign({}, output, {'!ref': ref})
      }
    };

    const s2ab = function (s) {
      let buf = new ArrayBuffer(s.length);
      let view = new Uint8Array(buf);
      for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    };

    // 导出 Excel
    let wbout = XLSX.write(wb, {
      bookType: 'xlsx',
      bookSST: false,
      type: 'binary'
    });
    FileSaver.saveAs(new Blob([s2ab(wbout)], {
      type: "application/octet-stream"
    }), title + ".xlsx")

    console.log("exportData")
  }

  //转换EXCEL列名称
  convertCell(v) {
    if (v > 25) {
      return "A" + String.fromCharCode(65 + (v - 26))
    }
    return String.fromCharCode(65 + v)
  }



  parseTableData(data1) {
    console.log( Array.toString(data1.nodes))
    const option = {
      title: {
        text: "",
        top: "top",
        left: "center"
      },
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
        type: 'graph',
        layout: 'force',
        draggable: "true",

        force: {
          repulsion: 300
        },
        data: _.uniq(data1.nodes),
        links: data1.links,
        categories: data1.categories,
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
    };

    return option
  }


  onKpiChange(e) {
    const kpi = _.find(this.props.kpis, {en: e.target.value})
    this.setState({
      currentKpi: kpi
    })
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.kpis, this.props.kpis)) {
      this.setState({
        currentKpi: nextProps.kpis[0]
      })
    }
  }


  render() {
    const {kpis, title, height, tableData} = this.props
    const {currentKpi} = this.state
    const option = this.parseTableData(tableData)

    return (
      <Panel title={title}>
        <div className="table-operations">
          <Button style={{marginBottom: 5, width: 100}} onClick={this.exportData.bind(this)}>导出</Button>
        </div>
        {
          _.isEmpty(option)
            ? <div style={{height}}/>
            : <ECharts option={option} style={{height: "75vh"}} notMerge/>
        }

      </Panel>
    );
  }
}


SankeyChart.propTypes = {
  kpis: PropTypes.array.isRequired,
  bizSubtype: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tableData: PropTypes.array,
  config: PropTypes.object,
  onCompare: PropTypes.func,
  isCompare: PropTypes.bool,
  areaName: PropTypes.string.isRequired
}

SankeyChart.defaultProps = {
  height: '400px',
  isCompare: true,
  bizSubtype: 'common'
}

export default SankeyChart
