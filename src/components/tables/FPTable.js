/**
 * Created by liekkas on 16/3/7.
 * 前端分页 Front Paginate
 */
import React, {PropTypes} from 'react'
import {Table, Pagination, Button} from 'antd'
import Panel from '../Panel'
import _ from 'lodash'
import shallowCompare from 'react-addons-shallow-compare'
import XLSX from 'xlsx';
import { connect } from 'dva'
import fetch from 'dva/fetch'
import REST_API from '../../consts/api'
import {local, session} from '../../utils/storage.js'
var FileSaver = require('file-saver');


class FPTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pageSize: props.defaultPageSize,
      current: 1,
      sorter: {}
    }
  }

  // pageSize改变,重新回到第一页
  onShowSizeChange(current, pageSize) {
//    console.log('Current: ', current, '; PageSize: ', pageSize);
    this.setState({pageSize, current: 1})
  }

  onChange(current) {
    this.setState({current})
  }

  exportData() {
    const {columns, data, title,defaultExportSize,biz,bizSubtype} = this.props

    if (data.length == 0)
      return
    const operatorId = session.get("operatorId");
    const areaName = data[0].area_name
    var param = '?biz=' + biz + '&bizSubtype=' + bizSubtype + '&areaName=' + areaName + '&browsePageCount=1&dataDownCount=1&loginCount=0&userName=' + operatorId
    fetch(REST_API.userUseLog + param)
      .then(response => response.json())
      .then((body) => {
      });

    var exportSize = defaultExportSize
    if (defaultExportSize == 0 || defaultExportSize > data.length) {
      exportSize = data.length
    }
    let renderData = []
    for (let i = 0; i < exportSize; i++) {
      data[i].row_num = i + 1
      renderData.push(data[i])
    }

    var arr = new Array()
    for (var i = 0; i < columns.length; i++) {
      const child = columns[i].children
      if (child) {
        for (var j = 0; j < child.length; j++) {
          arr.push(child[j].key)
        }
      } else {
        arr.push(columns[i].key)
      }
      // arr.push(columns[i].key)
    }

    // workbook
    var _headers = arr
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

  componentWillReceiveProps(nextProps, nextState) {
    if (shallowCompare(this, nextProps, nextState)) {
      this.setState({current: 1, sorter: {}})
    }
  }

  showTotal(total) {
    return `共 ${total} 条`
  }

  onTableChange(pagination, filters, sorter) {
    // 点击分页、筛选、排序时触发
//    console.log('各类参数是', pagination, filters, sorter);
    this.setState({sorter})
  }

  sort(e) {
    const {data}=this.props
    let a = data
    a.sort((a, b) => parseFloat(b[e]) - parseFloat(a[e]))
  }

  sortAsc(e) {
    const {data}=this.props
    let a = data
    a.sort((a, b) => parseFloat(a[e]) - parseFloat(b[e]))
  }

  render() {
    const {columns, data, defaultPageSize, loading, useFixedHeader, scrollX, rowKeyField, rowSelection, title} = this.props
    const {pageSize, current, sorter} = this.state

    let parareDatas = data
    if (sorter.hasOwnProperty('field')) {
      const fieldName = sorter.field
      if (sorter.order === 'ascend') {
        this.sortAsc(fieldName)
      } else {
        this.sort(fieldName)
      }
      parareDatas = data

      // parareDatas = _.orderBy(data, [sorter.field], [sorter.order === 'descend' ? 'desc' : 'asc'])
    }


    const start = (current - 1) * pageSize
    const end = Math.min(current * pageSize, parareDatas.length)
    let renderData = []
    for (let i = start; i < end; i++) {
      parareDatas[i].row_num = i + 1
      renderData.push(parareDatas[i])
    }


    return (
      <Panel title={title}>
        <div className="table-operations">
          <Button style={{marginBottom: 5, width: 100}} onClick={this.exportData.bind(this)}>导出</Button>
        </div>
        <Table dataSource={renderData} onChange={(a, b, c) => this.onTableChange(a, b, c)}
               useFixedHeader={useFixedHeader} rowKey={item => item[rowKeyField]}
               rowSelection={rowSelection} bordered loading={loading}
               columns={columns} scroll={{x: scrollX}}
               pagination={false}/>
        <div style={{marginTop: 10, display: 'flex', justifyContent: 'flex-end'}}>
          <Pagination showSizeChanger showQuickJumper showTotal={(a) => this.showTotal(a)}
                      current={current}
                      onChange={(v) => this.onChange(v)} pageSizeOptions={['10', '20', '30', '40']}
                      onShowSizeChange={(a, b) => this.onShowSizeChange(a, b)}
                      defaultPageSize={defaultPageSize}
                      defaultCurrent={1} total={data.length}/>
        </div>
      </Panel>
    )
  }
}

FPTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  defaultPageSize: PropTypes.number.isRequired,
  title: PropTypes.string,
  rowSelection: PropTypes.object,
  rowKeyField: PropTypes.string,
  loading: PropTypes.bool,
  scrollX: PropTypes.number,
  scrollY: PropTypes.number,
  defaultExportSize: PropTypes.number,
  biz: React.PropTypes.string,
  bizSubtype: React.PropTypes.string,
}
FPTable.defaultProps = {
  columns: [],
  data: [],
  defaultPageSize: 10,
  rowSelection: null,
  rowKeyField: 'id',
  useFixedHeader: false,
  scrollX: 1000,
  scrollY: 500,
  defaultExportSize : 0
}

export default FPTable
