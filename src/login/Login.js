import React from 'react'
import {Form, Input, Button, Checkbox, Spin, message} from 'antd'
const FormItem = Form.Item;
const createForm = Form.create;
import './base.css'
import {hashHistory} from 'react-router'
import {local, session} from '../utils/storage.js'

import fetch from 'dva/fetch'
import REST_USER_API from '../consts/userApi'



import logoImg from '../../public/assets/login.png'
// 将Promise抛出为全局对象
// window.Promise = Promise
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
    this.login = this.login.bind(this)
    this.onKeyPressLogin = this.onKeyPressLogin.bind(this)
  }

  componentDidMount() {
    session.removeAll()
  }

  login() {
    this.props.form.validateFields((err, values) => {
      if (err) return

      this.setState({
        loading: true
      })

      let loginData = values
      this.setState({
        loading: false
      })
      /*let loginName = values.userName;
      let password = values.password;
      if(loginName =='admin' && password =='admin'){
        session.set('isLogin', true)
        session.set('operatorId',1);
       // session.set('menus','[{"key":"home","name":"首页","path":"/home"},{"key":"ia","name":"洞察分析","path":"/ia/overview/userCover"},{"key":"os","name":"运营支撑","path":"/os"},{"key":"um","name":"用户管理","path":"/um"},{"key":"da","name":"数据资产","path":"/da"}]');
        session.set('childmenus','[{"children":[{"key":"userCover","menuId":1002001001,"name":"用户覆盖","parentId":1002001,"path":"/overview/userCover"},{"key":"userDevelop","menuId":1002001002,"name":"用户发展","parentId":1002001,"path":"/overview/userDevelop"},{"key":"userActive","menuId":1002001003,"name":"用户活跃","parentId":1002001,"path":"/overview/userActive"},{"key":"userUse","menuId":1002001004,"name":"用户使用","parentId":1002001,"path":"/overview/userUse"}],"icon":"appstore","key":"overview","menuId":1002001,"name":"电视概况","parentId":1002,"path":"/overview"},{"children":[{"key":"userCount","menuId":1002002001,"name":"全业务用户量","parentId":1002002,"path":"/allbu/userCount"},{"key":"userTimeInUse","menuId":1002002002,"name":"全业务用户使用时长","parentId":1002002,"path":"/allbu/userTimeInUse"},{"key":"useTimes","menuId":1002002003,"name":"全业务使用次数","parentId":1002002,"path":"/allbu/useTimes"},{"key":"useDays","menuId":1002002004,"name":"全业务使用天数","parentId":1002002,"path":"/allbu/useDays"}],"icon":"appstore","key":"allbu","menuId":1002002,"name":"全业务使用分析","parentId":1002,"path":"/allbu"},{"children":[{"key":"userAnalysis","menuId":1002003001,"name":"用户分析","parentId":1002003,"path":"/dvb/userAnalysis"},{"key":"businessUse","menuId":1002003002,"name":"业务使用分析","parentId":1002003,"path":"/dvb/businessUse"}],"icon":"appstore","key":"dvb","menuId":1002003,"name":"直播业务分析","parentId":1002,"path":"/dvb"},{"children":[{"key":"userAnalysis","menuId":1002004001,"name":"用户分析","parentId":1002004,"path":"/replay/userAnalysis"},{"key":"businessUse","menuId":1002004002,"name":"业务使用分析","parentId":1002004,"path":"/replay/businessUse"}],"icon":"appstore","key":"replay","menuId":1002004,"name":"回看业务分析","parentId":1002,"path":"/replay"},{"children":[{"key":"userAnalysis","menuId":1002005001,"name":"用户分析","parentId":1002005,"path":"/ts/userAnalysis"},{"key":"businessUse","menuId":1002005002,"name":"业务使用分析","parentId":1002005,"path":"/ia/ts/businessUse"}],"icon":"appstore","key":"ts","menuId":1002005,"name":"时移业务分析","parentId":1002,"path":"/ts"},{"children":[{"key":"userAnalysis","menuId":1002006001,"name":"用户分析","parentId":1002006,"path":"/vod/userAnalysis"},{"key":"businessUse","menuId":1002006002,"name":"业务使用分析","parentId":1002006,"path":"/vod/businessUse"}],"icon":"appstore","key":"vod","menuId":1002006,"name":"VOD点播业务分析","parentId":1002,"path":"/vod"},{"children":[{"key":"userAnalysis","menuId":1002007001,"name":"用户分析","parentId":1002007,"path":"/ott/userAnalysis"},{"key":"businessUse","menuId":1002007002,"name":"业务使用分析","parentId":1002007,"path":"/ott/businessUse"}],"icon":"appstore","key":"ott","menuId":1002007,"name":"OTT点播业务分析","parentId":1002,"path":"/ott"},{"children":[{"key":"userAnalysis","menuId":1002008001,"name":"用户分析","parentId":1002008,"path":"/education/userAnalysis"},{"key":"businessUse","menuId":1002008002,"name":"业务使用分析","parentId":1002008,"path":"/education/businessUse"}],"icon":"appstore","key":"education","menuId":1002008,"name":"教育","parentId":1002,"path":"/education"},{"children":[{"key":"userAnalysis","menuId":1002009001,"name":"用户分析","parentId":1002009,"path":"/appstore/userAnalysis"},{"key":"businessUse","menuId":1002009002,"name":"业务使用分析","parentId":1002009,"path":"/appstore/businessUse"}],"icon":"appstore","key":"appstore","menuId":1002009,"name":"应用商店","parentId":1002,"path":"/appstore"},{"children":[{"key":"userAnalysis","menuId":1002010001,"name":"用户分析","parentId":1002010,"path":"/in_community/userAnalysis"}],"icon":"appstore","key":"in_community","menuId":1002010,"name":"智慧社区","parentId":1002,"path":"/in_community"},{"children":[{"children":[{"key":"userAnalysis","menuId":1002011001001,"name":"用户分析","parentId":1002011001,"path":"/life_product/K_song/userAnalysis"}],"key":"K_song","menuId":1002011001,"name":"百灵K歌","parentId":1002011,"path":"/K_song"},{"children":[{"key":"userAnalysis","menuId":1002011002001,"name":"用户分析","parentId":1002011002,"path":"/life_product/happy_fitness_group/userAnalysis"}],"key":"happy_fitness_group","menuId":1002011002,"name":"幸福健身团","parentId":1002011,"path":"/happy_fitness_group"}],"icon":"appstore","key":"life_product","menuId":1002011,"name":"生活产品","parentId":1002,"path":"/life_product"}]');
        hashHistory.push('/ia/overview/userCover')
        return;
      }else{
        message.error("登录名或密码错误");
      }*/


       let param = '?loginName='+ values.userName + '&password=' + values.password;
       const data = fetch(REST_USER_API.LOGIN + param, {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(),
                headers: {
                  'Content-Type': 'application/json'
                }
            }).then(function (response) {
              console.log('respones',response)
              if (response.status >= 200 && response.status < 300) {
                return response.json();
              } else if(response.status >= 400){
                throw new Error("Bad response from server");
              }
            }).then(function (response) {
                console.log('respones1',response)
                if(response.result =='SUCCESS'){
                  console.log('1111111111111111111')
                  session.set('isLogin', true)
                  session.set('operatorId',response.userMsg.operatorId)
                  session.set('userMsg',response.userMsg)
                  console.log('hashHistory',hashHistory)
                  hashHistory.push(response.homeUrl)
                }
                if (response.result == 'FAIL') {
                   message.error(response.error);
                }

            }).catch(err => {
                  console.log(err)
                  message.error('网络异常登录失败')
            });

    })
  }

  onKeyPressLogin(event) {
    if (event.which === 13) {
      this.login();
    }
  }

  render() {
    const {getFieldDecorator} = this.props.form

    return (
      <div className="login-page">
        <div title="管理台"/>
        <div className="login-box">
          <div className="red">
          <img src={'assets/logo.png'} alt="logo" className="logo"/>
          </div>
          <Spin spinning={this.state.loading} size="large">
            <Form className="login-form" onKeyPress={this.onKeyPressLogin}>
              <FormItem>
                {getFieldDecorator('userName', {
                  rules: [
                    {
                      required: true,
                      message: '请输入账户名'
                    }
                  ],
                })(
                  <Input placeholder="账户"/>
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: '请输入密码'
                    }
                  ],
                })(
                  <Input autoComplete="off" type="password" placeholder="密码"/>
                )}
              </FormItem>
              <Button type="primary" onClick={this.login}>登录</Button>
            </Form>
          </Spin>
        </div>
      </div>
    )
  }
}
Login = createForm({})(Login)
export default Login
