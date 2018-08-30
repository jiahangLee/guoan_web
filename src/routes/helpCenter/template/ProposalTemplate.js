import{Collapse ,Button ,Form,Modal} from 'antd'
import REST_API from '../../../consts/api'
import { session} from '../../../utils/storage.js'

const FormItem = Form.Item;
import React from 'react'
const Panel = Collapse.Panel;
const pStlye = {
  marginTop:12,
  fontSize:12,
  textIndent:24
}
function header( v){
  const head =()=> {
    return (
      <p style={{fontSize:14}}>{v}</p>
    )
  }
  return head();
}
class ProposalTemplate extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      value:false
    }
  }
  handle = ()=>{
    this.setState({value:true})
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.advice_user =session.get('userMsg').operatorName
        const data = fetch(REST_API.adviceAdd, {
          method: 'POST',
          mode: 'cors',
          body:JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json'
          },
          timeout:5000
        }).then(function (response) {
          if (response.status >= 200 && response.status < 300) {
            return response.json();
          } else if(response.status >= 400){
            throw new Error("Bad response from server");
          }
        }).then(function (response) {
          if(response.result =='SUCCESS'){
            Modal.success({
              title: '提交成功',
              okText: '确定',
              onOk() {
              },
            });
          }else{
            Modal.error({
              title: '提交失败',
              okText: '确定',
              onOk() {
              },
            });
          }
        }).catch(err => {
        });
      }
    })
  }
  showButton = ()=>{
    console.log("showButton")
    if(this.state.value){
      this.setState({value:false})
    }
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <Collapse bordered={false} defaultActiveKey={['1']}>
        <Panel header={header("对大数据管理DMP平台用户的感受和建议，并以此优化我们的产品和服务")} key="1">
          <Form horizontal >
          <div >
              <FormItem
                label="">
                {
                  getFieldDecorator('advice_message', {
                    initValue:'',
                    validateTrigger:'onBlur',

                    rules: [{
                      required: true,
                      message: '请填写您的建议',
                      maxLength:200
                    }, {}
                    ],
                  })(
                    <textarea    onKeyUp={this.showButton}  placeholder="请填写您的建议" style={{width:'100%'}}/>
                  )}
              </FormItem>

          </div>
          <div style={{textAlign:'center'}}>  <Button onClick={this.handle.bind(this)} disabled={this.state.value}  type='primary'>提交</Button>   </div>
        </Form>
        </Panel>
        <Panel header={header("联系客服，邮件、手机短信、电话号码、QQ群、微信群")} key="2">
          <p style={pStlye}>
          </p>
        </Panel>
      </Collapse>
    )
  }
}
export default  Form.create()(ProposalTemplate);
