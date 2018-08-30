/**
 * Created by jiahang Lee on 2017/6/23.
 */
import React, { Component } from 'react';
import  moment from "moment";
import { Modal, Form, Input,DatePicker } from 'antd';
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
import fetch from 'dva/fetch'
import { connect } from 'dva';
const FormItem = Form.Item;
import REST_API from '../../../consts/api'
import {local, session} from '../../../utils/storage.js'
import { flat2TreeSelect } from '../../../utils/ztool'
import { TreeSelect } from 'antd'
const { TextArea } = Input;



class UserAddModal extends Component {
  state = {
    file:[],
    value: 0,
    list: [],
    visible: false,
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModelHandler = (e) => {
    if (e) e.stopPropagation();
      this.setState({
        visible: true,
      });
  };

  hideModelHandler = () => {
    this.props.form.resetFields()
    this.setState({
      visible: false,
    });
  };
  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let formDate = new FormData()
        formDate.append("file",this.state.file)
        formDate.append("report_date", values.report_date.format('YYYY-MM-DD'))
        formDate.append("report_name",values.report_name)
        formDate.append("report_type",values.report_type)
        formDate.append("key_word",values.key_word)
        formDate.append("remark",values.remark)
        formDate.append("operator_name",session.get('userMsg').operatorName)
        formDate.append("operator_id",session.get("operatorId"))
        formDate.append("organize_id",this.state.value)
        if(this.state.file.size<53477376){
         const data = fetch(REST_API.dataReportAdd, {
            method: 'POST',
            mode: "cors",
            body:formDate,
          }).then(function (response) {
            if (response.status >= 200 && response.status < 300) {
              return response.json();
            } else if(response.status >= 400){
              throw new Error("Bad response from server");
            }
          }).then(function (response) {
            if(response.result =='SUCCESS'){
              Modal.success({
                title: '上传成功',
                okText: '确定',
                onOk() {
                  onOk()
                },
              });

            }else{
              Modal.error({
                title: '上传失败',
                okText: '确定',
                onOk() {
                },
              });
             }
          }).catch(err => {
          });
        }else{
          console.log("文件过大")
          Modal.error({
            title: '文件不能超过50MB',
            okText: '确定',
            onOk() {
            },
          });
          this.hideModelHandler()
        }}

    });
    this.props.form.resetFields()
    this.hideModelHandler()
  };


  changeFile = (e)=>{
    this.state.file = e.target.files[0]
  }
onAreaChange = (value) => {
    if (value) {
      this.setState({value})
    }
  }
  disabledDate(current) {
    // Can not select days before today and today
    return current && current.valueOf() > Date.now();
  }
  render() {
    const { children,areas } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { operatorId, operatorName, operatorCode } = this.props.record;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const data = flat2TreeSelect(areas, 'id', 'parent_id', '-1', '请选择',false)
    return (
      <span>
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal
          title="新增上传数据报告"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >

          <Form  horizontal  enctype='multipart/form-data' onSubmit={this.okHandler}>

              <FormItem
                {...formItemLayout}
                label="选择数据报告"
              >
              {
                getFieldDecorator('file', {
                    validateTrigger:'onBlur',
                    rules: [{
                      required: true,
                      message: '请选择文件',
                    }],
                  }
                )(<Input type = "file" onChange={this.changeFile} placeholder="请选择文件"/>)
              }

            </FormItem>
             <FormItem
               {...formItemLayout}
               label="报告名称">
          {
            getFieldDecorator('report_name', {
              validateTrigger:'onBlur',
              rules: [{
                required: true,
                message: '请输入报告名称',
              }, {}
              ],
            })(
              <Input  placeholder="请输入报告名称"/>
            )}
        </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="类型">
          {
            getFieldDecorator('report_type', {
              validateTrigger:'onBlur',
              rules: [{
                required: true,
                message: '请输入文件类型',
              }, {}
              ],
            })(
              <Input  placeholder="请输入文件类型"/>
            )}
        </FormItem>
              <FormItem
                {...formItemLayout}
                label="地区"
                >
          {
            getFieldDecorator('organize_id', {
              initialValue:'0',
              rules: [{
                required: true,
                message: '请选择地区',
              }],
            })(
              <TreeSelect style={{width: 284.67}}
                          dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                          treeData={data}
                          value={this.state.value}
                          treeDefaultExpandedKeys={['0']}
                          onChange={this.onAreaChange} />
            )}
        </FormItem>

            <FormItem
              {...formItemLayout}
              label="报告日期">
          {
            getFieldDecorator('report_date', {
              rules: [{
                required: true,
                message: '请选择报告日期',
              }],
            })(
              <DatePicker style={{ width: 284.67 }} disabledDate={this.disabledDate} format="YYYY-MM-DD "/>
            )}
        </FormItem>
            <FormItem
              {...formItemLayout}
              label="关键词"
            >
              {
                getFieldDecorator('key_word', {
                    rules: [{
                      required: true,
                      message: '请输入关键词',
                    }],
                  }
                )(<Input placeholder="请输入关键词"/>)
              }
            </FormItem>
           <FormItem
             {...formItemLayout}
             label="报告简介"
           >
              {
                getFieldDecorator('remark', {
                    rules: [{
                      required: true,
                      message: '请输入报告简介',
                    }],
                  }
                )(<TextArea style={{ width: 284.67 }} placeholder="请输入报告简介"/>)
              }
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

const WrappedDynamicRole = Form.create()(UserAddModal);
export default connect(({dataReport, loading}) => ({dataReport, loading: loading.models.dataReport}))(WrappedDynamicRole)
