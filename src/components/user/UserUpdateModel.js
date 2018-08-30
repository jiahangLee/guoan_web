/**
 * Created by jiahang Lee on 2017/6/23.
 */
import React, { Component } from 'react';
import  moment from "moment";
import { Modal, Form, Input,DatePicker } from 'antd';
import RoleSelect from '../userManage/RoleSelect'
import {local, session} from '../../utils/storage.js'
import userAuth from '../../consts/userAuth'

const FormItem = Form.Item;


class UserEditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    if(!userAuth.checkUserAuth.getUserAuth(userAuth.ROLEUPDATE)){
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
    this.setState({
      visible: false,
    });
  };

  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const operatorId = session.get("operatorId");
        if(values.operatorId == operatorId || !values.roleName){
          values.roleName =null
        }else {
          values.roleName = values.roleName.value;
        }

        values.endDate = values.endDate.format('YYYY-MM-DD')
        onOk(values);
        this.hideModelHandler();
      }
    });
  };

 /* handleChange = (rule, value, callback) => {
    if(value.value < 0) {
      callback('请选择角色!');
    }else {
      callback();
    }
  }*/



  disabledDate(current) {
    // Can not select days before today and today
    return current && current.valueOf() < Date.now();
  }

  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { operatorId, operatorName, operatorCode,endDate } = this.props.record;
    let endDateStr = endDate
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
          title="修改"
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
                    initialValue: operatorCode,
                    validateTrigger:'onBlur',
                    rules: [{
                      required: true,
                      pattern : /^[a-zA-Z0-9_][a-zA-Z0-9_]{1,9}$/,
                      message: '用户名由2-10位的字母下划线或数字组成',
                    }],
                  }
                )(<Input disabled placeholder="Please input your LoginName" />)
              }

            </FormItem>
          <Form horizontal onSubmit={this.okHandler}>
            {
              getFieldDecorator('operatorId', {
                  initialValue: operatorId,
                }
              )(<Input style={{display:'none' }}/>)
            }

            <FormItem
              {...formItemLayout}
              label="失效日期">
          {
            getFieldDecorator('endDate', {
              initialValue:moment(endDateStr, 'YYYY-MM-DD'),
              rules: [{
                required: true,
                message: '请选择失效日期',
              }],
            })(
              <DatePicker style={{ width: 284.67 }} disabledDate={this.disabledDate} format="YYYY-MM-DD" defaultValue={moment(endDateStr, 'YYYY-MM-DD')} />
            )}


        </FormItem>
            <FormItem
              {...formItemLayout}
              label="员工名称"
            >
              {
                getFieldDecorator('operatorName', {
                  initialValue: operatorName,
                    rules: [{
                      required: true,
                      message: '请输入员工名称',
                    }],
                  }
                )(<Input placeholder="Please input your name" />)
              }
            </FormItem>
          <FormItem
            {...formItemLayout}
            label="角色">
          {
            getFieldDecorator('roleName', {
              }
            )(
              <RoleSelect ref={self => this.roleData = self}/>
            )}
        </FormItem>

          </Form>
        </Modal>
      </span>
    );
  }
}


export default Form.create()(UserEditModal);
