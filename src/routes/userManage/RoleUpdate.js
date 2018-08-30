/**
 * Created by zhangtao15 on 2017-06-26.
 */
import React, { Component } from 'react';
import CommonTree from '../../components/userManage/CommonTree'
import { Form, Input, Button, Checkbox,Modal } from 'antd';
const FormItem = Form.Item;
import { connect } from 'dva'
import fetch from 'dva/fetch'
import REST_USER_API from '../../consts/userApi'
import userAuth from '../../consts/userAuth'
import {local, session} from '../../utils/storage.js'

//const treeDatas = JSON.parse('[{"child":[{"key":"-100001","parentId":100,"title":"新增","treeId":100001},{"key":"-100002","parentId":100,"title":"删除","treeId":100002},{"key":"-100003","parentId":100,"title":"修改","treeId":100003}],"key":"-100","parentId":-1,"title":"角色管理","treeId":100},{"child":[{"key":"-101001","parentId":101,"title":"新增","treeId":101001},{"key":"-101002","parentId":101,"title":"删除","treeId":101002},{"key":"-101003","parentId":101,"title":"修改","treeId":101003}],"key":"-101","parentId":-1,"title":"用户管理","treeId":101},{"child":[{"key":"-1001","parentId":103,"title":"首页","treeId":1001},{"child":[{"child":[{"key":"-1002001001","parentId":1002001,"title":"用户覆盖","treeId":1002001001},{"key":"-1002001002","parentId":1002001,"title":"用户发展","treeId":1002001002},{"key":"-1002001003","parentId":1002001,"title":"用户活跃","treeId":1002001003},{"key":"-1002001004","parentId":1002001,"title":"用户使用","treeId":1002001004}],"key":"-1002001","parentId":1002,"title":"电视概况","treeId":1002001},{"child":[{"key":"-1002002001","parentId":1002002,"title":"全业务用户量","treeId":1002002001},{"key":"-1002002002","parentId":1002002,"title":"全业务用户使用时长","treeId":1002002002},{"key":"-1002002003","parentId":1002002,"title":"全业务使用次数","treeId":1002002003},{"key":"-1002002004","parentId":1002002,"title":"全业务使用天数","treeId":1002002004}],"key":"-1002002","parentId":1002,"title":"全业务使用分析","treeId":1002002},{"child":[{"key":"-1002003001","parentId":1002003,"title":"用户分析","treeId":1002003001},{"key":"-1002003002","parentId":1002003,"title":"业务使用分析","treeId":1002003002}],"key":"-1002003","parentId":1002,"title":"直播业务分析","treeId":1002003},{"child":[{"key":"-1002004001","parentId":1002004,"title":"用户分析","treeId":1002004001},{"key":"-1002004002","parentId":1002004,"title":"业务使用分析","treeId":1002004002}],"key":"-1002004","parentId":1002,"title":"回看业务分析","treeId":1002004},{"child":[{"key":"-1002005001","parentId":1002005,"title":"用户分析","treeId":1002005001},{"key":"-1002005002","parentId":1002005,"title":"业务使用分析","treeId":1002005002}],"key":"-1002005","parentId":1002,"title":"时移业务分析","treeId":1002005},{"child":[{"key":"-1002006001","parentId":1002006,"title":"用户分析","treeId":1002006001},{"key":"-1002006002","parentId":1002006,"title":"业务使用分析","treeId":1002006002}],"key":"-1002006","parentId":1002,"title":"VOD点播业务分析","treeId":1002006},{"child":[{"key":"-1002007001","parentId":1002007,"title":"用户分析","treeId":1002007001},{"key":"-1002007002","parentId":1002007,"title":"业务使用分析","treeId":1002007002}],"key":"-1002007","parentId":1002,"title":"OTT点播业务分析","treeId":1002007},{"child":[{"key":"-1002008001","parentId":1002008,"title":"用户分析","treeId":1002008001},{"key":"-1002008002","parentId":1002008,"title":"业务使用分析","treeId":1002008002}],"key":"-1002008","parentId":1002,"title":"教育","treeId":1002008},{"child":[{"key":"-1002009001","parentId":1002009,"title":"用户分析","treeId":1002009001},{"key":"-1002009002","parentId":1002009,"title":"业务使用分析","treeId":1002009002}],"key":"-1002009","parentId":1002,"title":"应用商店","treeId":1002009},{"child":[{"key":"-1002010001","parentId":1002010,"title":"用户分析","treeId":1002010001}],"key":"-1002010","parentId":1002,"title":"智慧社区","treeId":1002010},{"child":[{"child":[{"key":"-1002011001001","parentId":1002011001,"title":"用户分析","treeId":1002011001001}],"key":"-1002011001","parentId":1002011,"title":"百灵K歌","treeId":1002011001},{"child":[{"key":"-1002011002001","parentId":1002011002,"title":"用户分析","treeId":1002011002001}],"key":"-1002011002","parentId":1002011,"title":"幸福健身团","treeId":1002011002}],"key":"-1002011","parentId":1002,"title":"生活产品","treeId":1002011}],"key":"-1002","parentId":103,"title":"洞察分析","treeId":1002},{"key":"-1003","parentId":103,"title":"运营支撑","treeId":1003},{"key":"-1004","parentId":103,"title":"用户管理","treeId":1004},{"key":"-1005","parentId":103,"title":"数据资产","treeId":1005},{"key":"-1006","parentId":103,"title":"帮助中心","treeId":1006}],"key":"-103","parentId":-1,"title":"页面访问","treeId":103}]');


const formItemLayout = {
  labelCol: { span: 3 ,offset: 1},
  wrapperCol: { span: 8 },
};
const formTailLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 8, offset: 3 },
};
const formTreeLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 14, offset: 3 },
};

class DynamicRole extends Component {

  state = {
    areaIds :[],
    funcIds :[]
  }

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
    const { onCancel } = this.props;
    //const names = ['operatorCode','operatorName','endDate','password','confirmpwd']
    //this.props.form.resetFields(names);
    this.setState({
      visible: false,
    });
    onCancel();
  };

  fetchAreaIds = function (callback) {
    const { roleId } = this.props.record;
    return fetch(REST_USER_API.AREAIDS + "?roleId=" + roleId , {
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

  fetchFuncIds = function (callback) {
    const { roleId } = this.props.record;
    return fetch(REST_USER_API.FUNCIDS + "?roleId=" + roleId , {
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

  componentWillMount () {
    const operatorId = session.get("operatorId");
    this.props.dispatch({type: 'userManage/fetchFuncTree', payload: '?operatorId='+operatorId})
    this.props.dispatch({type: 'userManage/fetchAreaTree', payload: '?operatorId='+operatorId})

    this.fetchAreaIds(areaIds => this.setState({ areaIds }));
    this.fetchFuncIds(funcIds => this.setState({ funcIds }));

  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { roleId} = this.props.record;
        const areaTree = this.areaTree.loadSelectedKeys();
        const funcTree = this.funcTree.loadSelectedKeys();
        const rolename = values.roleName;
        if(rolename==null || rolename=='' || rolename==undefined){
          Modal.warning({
            title: '请输入角色名称',
            okText: '确定'
          });
          return;
        }
        values.areaList = areaTree;
        values.funcList = funcTree;

        const operatorId = session.get("operatorId");
        let param = '?roleId='+roleId+'&roleName='+ values.roleName + '&areaList=' + values.areaList + '&funcList=' +values.funcList;
        const data = fetch(REST_USER_API.ROLEUPDATE + param, {
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify(),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(function (response) {
          if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else if(response.status >= 400){
            throw new Error("Bad response from server");
          }
        }).then(function (response) {
          if(response.result =='SUCCESS'){
            Modal.success({
              title: '角色修改成功',
              okText: '确定',
              onOk() {
                //
              },
            });
          }else{
            Modal.error({
              title: '角色修改失败',
              content: response.error,
              okText: '确定'
            });
          }
        }).catch(err => {
          Modal.error({
            title: '角色修改失败',
            content: err.message,
            okText: '确定'
          });
        });

        console.log('>>> DynamicRole.trees:', areaTree)
        console.log('>>> DynamicRole.funcTree:', funcTree)
        console.log('Received values of form: ', values);
        this.hideModelHandler();
      }
    });
  }

  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const  {userManage} = this.props;
    const { roleId,roleName } = this.props.record;


    const areaTrees = userManage.areaTree;
    const funcTrees = userManage.funcTree;

    return (
      <span>
    <span onClick={this.showModelHandler}>
          { children }
        </span>
    <Modal
    visible={this.state.visible}
    onOk={this.handleSubmit}
    onCancel={this.hideModelHandler}
    width = "780"
  >
      <div>
        <Form onSubmit={this.handleSubmit}>
        <label>修改角色</label>
        <FormItem {...formItemLayout} label="角色名称" >
          {getFieldDecorator('roleName', {
            initialValue: roleName,
            Roles: [{
              required: true,
              message: '请输入角色名称',
            }],
          })(
            <Input placeholder="请输入角色名称" />
          )}
        </FormItem>


        <label>权限设置</label>
        <FormItem {...formTreeLayout}  >
          <div style={{display: 'flex',  flexFlow:'row nowrap'}}>
            <div>
              {getFieldDecorator('areaList', {Roles: [{required: false}]})(
                <CommonTree ref={self => this.areaTree = self} title='区域权限' dataChecked={this.state.areaIds} data={areaTrees}/>
              )}
            </div>
            <div>
              {getFieldDecorator('funcList', {Roles: [{required: false}]})(
                <CommonTree  ref={self => this.funcTree = self} title='功能权限' dataChecked={this.state.funcIds} data={funcTrees}/>
              )}
            </div>
          </div>
        </FormItem>
        <FormItem {...formTailLayout} style={{display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
        </FormItem>
        </Form>
      </div>
          </Modal>
          </span>
    );
  }
}


const WrappedDynamicRole = Form.create()(DynamicRole);
export default connect(({userManage, loading}) => ({userManage, loading: loading.models.userManage}))(WrappedDynamicRole)



