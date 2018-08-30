/**
 * Created by jiahang Lee on 2017/6/23.
 */
import React, { Component } from 'react';
import  moment from "moment";
import { Modal, Form, Input,DatePicker } from 'antd';
import SearchInput from '../layout/Roleselect'
import RoleSelect from '../userManage/RoleSelect'
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;
import fetch from 'dva/fetch'
import REST_USER_API from '../../consts/userApi'
import userAuth from '../../consts/userAuth'
import {local, session} from '../../utils/storage.js'

const FormItem = Form.Item;


class UserEditModal extends Component {
  state = {
    checkLoginName :'',
    loginName :''
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    if(!userAuth.checkUserAuth.getUserAuth(userAuth.USERADD)){
      this.state = {
        visible: false,
      };
      Modal.error({
        title: '用户权限不足',
        okText: '确定'
      });
    }else {
      this.setState({
        visible: true,
      });
    }
  };

  hideModelHandler = () => {
    const names = ['operatorCode','operatorName','endDate','password','confirmpwd']
    this.props.form.resetFields(names);
    this.setState({
      visible: false,
    });
  };



  okHandler = () => {
    const { onOk } = this.props;
    const operatorId = session.get("operatorId");
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const result = this.state.checkLoginName
        if(result){
          if(result.result=='FAIL') {
            this.props.form.setFields({
              operatorCode: {
                value: values.operatorCode,
                errors: [new Error('用户名已存在')],
              },
            });
            return
          }
        }
        values.roleName = values.roleName.value;
        values.endDate = values.endDate.format('YYYY-MM-DD')
        if(operatorId == "14"){
          values.ext1 = "1"
        }else {
          values.ext1 = "0"
        }
        onOk(values);
        this.hideModelHandler();
      }
    });
  };
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次密码输入不一致!');
    } else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if(!value){
      callback('密码由6-16位的字母下划线或数字组成');
    }
    if(value && !rule.pattern.test(value)) {
      callback('密码由6-16位的字母下划线或数字组成');
    }else if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  handleChange = (rule, value, callback) => {
    if(value.value < 0) {
      callback('请选择角色!');
    }else {
      callback();
    }
  }

  checkLoginName = (rule, value, callback) => {
    if(value){
      this.state.loginName = value
      this.fetchData(checkLoginName => this.setState({ checkLoginName }));
    }
    if(!rule.pattern.test(value)) {
      callback('用户名由2-10位的字母下划线或数字组成');
    }else if(!value) {
      callback('Please input your LoginName');
    }else{
      callback();
    }
  }

  fetchData = function (callback) {
    return fetch(REST_USER_API.CHECKUSER + "?loginName=" + this.state.loginName , {
      method: 'POST',
      mode: 'cors',
      timeout: 5000,
      body: JSON.stringify(),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
    }).then(function (response) {
      callback(response)
      return response
    }).catch(err => {
    });
  }

  disabledDate(current) {
    // Can not select days before today and today
    return current && current.valueOf() < Date.now();
  }

  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { operatorId, operatorName, operatorCode } = this.props.record;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <span>
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal
          title="新增"
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
            <FormItem
              {...formItemLayout}
              label="用户名"
            >
              {
                getFieldDecorator('operatorCode', {
                    validateTrigger:'onBlur',
                    rules: [{
                      required: true,
                      pattern : /^[a-zA-Z0-9_][a-zA-Z0-9_]{1,9}$/,
                      message: '用户名由2-10位的字母下划线或数字组成',
                      validator: this.checkLoginName,
                    }],
                  }
                )(<Input placeholder="Please input your LoginName"/>)
              }

            </FormItem>
          <Form horizontal onSubmit={this.okHandler}>
             <FormItem
               {...formItemLayout}
               label="密码">
          {
            getFieldDecorator('password', {
              validateTrigger:'onBlur',
              rules: [{
                required: true,
                pattern : /^[a-zA-Z0-9_][a-zA-Z0-9_]{5,15}$/,
                message: '密码由6-16位的字母下划线或数字组成',
                validator: this.checkConfirm,
              }, {}
              ],
            })(
              <Input type="password" placeholder="Please input your password"/>
            )}
        </FormItem>

             <FormItem
               {...formItemLayout}
               label="确认密码">
          {
            getFieldDecorator('confirmpwd', {
              rules: [{
                required: true,
                message: '再次确认您的密码',
              }, {validator: this.checkPassword,}],
            })(
              <Input type="password" placeholder="Please confirm your password"/>
            )}

        </FormItem>
            {/*<FormItem
             {...formItemLayout}
             label="开始时间">
             {
             getFieldDecorator('startDate', {
             rules: [{
             required: true,
             message: 'Please input your startDate',
             }],
             })(
             <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>
             )}
             </FormItem>*/}
            <FormItem
              {...formItemLayout}
              label="失效日期">
          {
            getFieldDecorator('endDate', {
              rules: [{
                required: true,
                message: '请选择失效日期',
              }],
            })(
              <DatePicker style={{ width: 284.67 }} disabledDate={this.disabledDate} format="YYYY-MM-DD HH:mm:ss"/>
            )}
        </FormItem>
            <FormItem
              {...formItemLayout}
              label="员工名称"
            >
              {
                getFieldDecorator('operatorName', {
                    rules: [{
                      required: true,
                      message: '请输入员工名称',
                    }],
                  }
                )(<Input placeholder="Please input your name"/>)
              }
            </FormItem>
          <FormItem
            {...formItemLayout}
            label="角色">
          {
            getFieldDecorator('roleName', {
                rules: [{
                  required: true,
                  message: 'Please input your roleName',
                }, {validator: this.handleChange,}],
                initialValue: {value: -99},
              }
            )(
              <RoleSelect />
            )}
        </FormItem>

          </Form>
        </Modal>
      </span>
    );
  }
}


export default Form.create()(UserEditModal);
