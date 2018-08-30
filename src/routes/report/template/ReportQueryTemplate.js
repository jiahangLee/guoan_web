/**
 * Created by jiahang Lee on 2017/6/23.
 */
import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Table, Pagination, Popconfirm, Button ,Modal} from 'antd';
import '../DataReport.css';
import { PAGE_SIZE } from '../../../constants';
import {local, session} from '../../../utils/storage.js'
import { Input,Select } from 'antd';
import _ from 'lodash'
import REST_API from '../../../consts/api'
import fetch from 'dva/fetch'
const Search = Input.Search;
var valuess = "" ;
var downUrl = REST_API.dataReportUpload
// rowSelection object indicates the need for row selection
//////////////////////////////////////////////////////////////////////////////////////////////
var ids;
var slvalue ="1";
const rowSelection = {

  onChange: (selectedRowKeys, selectedRows) => {
    ids = selectedRows;
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User',    // Column configuration not to be checked
  }),
};
function ReportTemplete({ dispatch, list: dataSource, loading, total, page: current ,area}) {

  function search(values,page){
    valuess = '{"searchValue":"'+values+'","searchType":"'+slvalue+'"}'
    valuess = JSON.parse(valuess)
    fetchData(valuess,page)
  }
  function fetchData (values,page){
    dispatch({
      type: 'dataReport/fetch',
      payload:{valuess, page,}
    });
  }
  function pageChangeHandler(page) {
    fetchData(valuess,page)
  }
  function changeValue(e){
    console.log(e.target)
   // valuess = value;
  }
  function downloadFile() {
    console.log(ids)
    const operatorId =  session.get('operatorId')
    if(ids ==null || ids == undefined || ids.length==0){
      Modal.error({
        title: '请选择要下载的报告!',
        okText: '确定'
      });
      return
    }

    var downloadData = new Array();
    var reportIds = [];

    for (var i = 0; i < ids.length; i++) {
      var reportId = ids[i].report_id
      reportIds.push(reportId)
      console.log(reportId)

      const param = "?reportId="+reportId +"&operatorId="+operatorId

      downloadData.push(downUrl + param)
    }

    const param = "?reportId="+reportIds +"&operatorId="+operatorId
    fetch(REST_API.checkDownAuth + param)
      .then(response => response.json())
      .then((body) => {
        console.log(body)
        if(body.result == 'FAIL'){
          Modal.error({
            title: body.msg,
            okText: '确定'
          });
        }
      });


    var downloadNum=0;//方法执行次数

    circularWindow(downloadNum);

    function circularWindow(){//循环弹窗
      setTimeout(function(){
        jumpDownloadWindow(downloadNum);
      },500);//次数设置一下延时，不然有的手机会因为反应不过来而出现误差
    }
    function jumpDownloadWindow(i){//弹出下载窗口
      var fileFrame = document.createElement("iframe");
      fileFrame.src = downloadData[i];//文件路径
      fileFrame.style.display = "none";
      document.body.appendChild(fileFrame);

      downloadNum++;
      if(downloadNum!=downloadData.length){
        circularWindow();
      }

    }

  }


  function downReport(record) {
    const reportId = record.report_id
    const operatorId =  session.get('operatorId')

    const param = "?reportId="+reportId +"&operatorId="+operatorId

    fetch(REST_API.checkDownAuth + param)
      .then(response => response.json())
      .then((body) => {
        console.log(body)
        if(body.result == 'FAIL'){
          Modal.error({
            title: body.msg,
            okText: '确定'
          });
          return
        }
      });

    console.log(record)
    var fileFrame = document.createElement("iframe");
    fileFrame.src = REST_API.dataReportUpload + param;//文件路径
    fileFrame.style.display = "none";
    document.body.appendChild(fileFrame);
  }

  const columns = [
    {
      title: '地区',
      dataIndex: 'organize_id',
      key: 'organize_id',
      render: (text) => {
        const item = _.find(area, {id: text})
        return item ? item.label : (text == 0 ? '全国' : text)
      }
    },
    {
      title: '报告名称',
      dataIndex: 'report_name',
      key: 'report_name',
    },
    {
      title: '关键词',
      dataIndex: 'key_word',
      key: 'key_word',
    },
    {
      title: '报告日期',
      dataIndex: 'report_date',
      key: 'report_date',
    },
    {
      title: '报告类型',
      dataIndex: 'report_type',
      key: 'report_type',
    },
    {
      title: '报告简介',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: '上传日期',
      dataIndex: 'upload_date',
      key: 'upload_date',
    },
    {
      title: '上传人',
      dataIndex: 'operator_name',
      key: 'operator_name',
    },{
      title: '上传文件',
      dataIndex: 'file_name',
      key: 'file_name',
      render: (text, record) => (
          <a  href="javascript:;" onClick={downReport.bind(null,record)}> <span color={'#1890ff'} >{text}</span></a>
      ),
    }
  ];

  function handleChange(value) {
    console.log(`selected ${value}`);
    slvalue = value
  }

  return (
    <div>
      <div>
        <div className='create'>
            <Button type="primary" onClick={downloadFile}>下载</Button>
        </div>
        <div className='delete1'>
        </div>
        <div className="search">
          <Select
            defaultValue="1"
            style={{ width: 100,marginRight:10 }}
            onChange={handleChange}
          >
            <Option value="1">报表名称</Option>
            <Option value="2">地区</Option>
            <Option value="3">关键词</Option>
            <Option value="4">报告日期</Option>
            <Option value="5">报告类型</Option>
          </Select>
          <Search placeholder="请输入"
                  style={{ width: 200 }}
                  onSearch={search} onChange={changeValue}
          />
        </div>
      </div>
      <Table bordered  className='normal'
        rowSelection={rowSelection}
             size="small"
             columns={columns}
             dataSource={dataSource}
             loading={loading}
             rowKey={record => record.id}
             pagination={false}
      />
      <Pagination className="page" showQuickJumper pageSize={PAGE_SIZE} current={current} total={total} onChange={pageChangeHandler} />
    </div>
  );
}


function mapStateToProps(state) {
  const { list, total, page,area  } = state.dataReport;
  return {
    loading: state.loading.models.dataReport,
    list,
    total,
    page,
    area
  };
}

export default connect(mapStateToProps)(ReportTemplete);

