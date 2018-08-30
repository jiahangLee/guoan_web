/**
 * Created by jiahang Lee on 2017/7/7.
 */
import { Form, Icon, Input, Button, Checkbox,Modal } from 'antd';
import React, { Component } from 'react';
import {local, session} from '../../utils/storage.js'
import REST_USER_API from '../../consts/userApi'
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

class NormalLoginForm extends Component {
  state = {
    checkPwd :'',
    oldPwd :''
  }

  handleSubmit = (e,dispatch) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const result = this.state.checkPwd
        const operatorId = session.get("operatorId");
        if(result){
          if(result.result=='FAIL') {
            this.props.form.setFields({
              oldPassword: {
                value: values.oldPassword,
                errors: [new Error('旧密码不正确')],
              },
            });
          return
          }
          //修改密码
         fetch(REST_USER_API.MODIFYPASSWORD + "?newPassword=" + values.newPassword+"&operatorId="+operatorId).then(function (response) {
            if (response.status >= 200 && response.status < 300) {
              return response.json();
            } else if (response.status >= 400) {
              throw new Error("Bad response from server");
            }
          }).then(function (response) {
           if(response.result =='SUCCESS'){
             Modal.success({
               title: '密码修改成功',
               okText: '确定',
               onOk() {
                 //
               },
             });
           }else{
             Modal.error({
               title: '密码修改失败',
               content: response.error,
               okText: '确定'
             });
           }
         }).catch(err => {
           Modal.error({
             title: '密码修改失败',
             content: err.message,
             okText: '确定'
           });
         });
          this.props.form.resetFields();
        }

      }
    });
  }

  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('newPassword')) {
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

  checkPwd = (rule, value, callback) => {
    if(value){
      this.state.oldPwd = value
      this.fetchData(checkPwd => this.setState({ checkPwd }));
    }
    if(!value) {
      callback('Please input your old password');
    }else{
      callback();
    }
  }

  fetchData = function (callback) {
    const operatorId = session.get("operatorId");
    return fetch(REST_USER_API.CHECKPWD + "?oldPwd=" + this.state.oldPwd+"&operatorId="+operatorId).then(function (response) {
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
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="旧密码">
          {
            getFieldDecorator('oldPassword', {
              validateTrigger:'onBlur',
              rules: [{
                required: true,
                message: '请输入您的密码',
                validator: this.checkPwd,
              }, {}
              ],
            })(
              <Input style={{ width: 220.67 }} type="password" placeholder="Please input your old password"/>
            )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="新密码">
          {
            getFieldDecorator('newPassword', {
              validateTrigger:'onBlur',
              rules: [{
                required: true,
                pattern : /^[a-zA-Z0-9_][a-zA-Z0-9_]{5,15}$/,
                message: '密码由6-16位的字母下划线或数字组成',
                validator: this.checkConfirm,
              }, {}
              ],
            })(
              <Input style={{ width: 220.67 }} type="password" placeholder="Please input your new password"/>
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
              <Input style={{ width: 220.67 }} type="password" placeholder="Please confirm your new password"/>
            )}
        </FormItem>
        <FormItem >
          <Button style={{marginLeft:320}}
            type="primary"
            htmlType="submit"
          >
            保存
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;
