import{Collapse ,Table,Input} from 'antd'
const Search = Input.Search;
import { session} from '../../../utils/storage.js'
import {connect} from 'dva'
import React from 'react'
const Panel = Collapse.Panel;
function header( v){
  const head =()=> {
    return (
      <p style={{fontSize:14}}>{v}</p>
    )
  }
  return head();
}
class HelpRetrievalTemplate extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  fetch = (v)=>{
    this.props.dispatch(
      {
        type: 'helpCenter/fetchHelpRetrieval',
        payload: v
      }
    )
  }
  render(){
    const  dataSourec = []
    const columns = [
      {
        title: '指标名称',
        width: 30,
        dataIndex: 'target_name',
        key: 'target_name',
      },
      {
        title: '指标解释说明',
        dataIndex: 'target_explain',
        key: 'target_explain',
        width: 60
      },
      {
        title: '公式',
        dataIndex: 'formula',
        key: 'formula',
        width: 60
      },
      {
        title: '计算颗粒度',
        dataIndex: 'period',
        key: 'period',
        width: 50
      }
    ];
    const {helpCenter,loading} = this.props
    const  dataSource = helpCenter.list

    return (
      <Collapse bordered={false} defaultActiveKey={['1']}>
        <Panel header={header("帮助检索")} key="1">
          <div style={{width:'100%',marginLeft:0}} className="search" >
            <Search
              placeholder="请输入指标名称"
              style={{ width: 200 }}
              onSearch={this.fetch}
            />
            <Table style={{marginTop:20,marginBottom:40}}  bordered
                   size="large"
                   columns={columns}
                   loading={loading}
                   dataSource={dataSource}
                   pagination={false}
                   scroll={{ x: 1100}}
            />
          </div>
        </Panel>
      </Collapse>
    )
  }
}
export default connect(({helpCenter, loading}) => ({helpCenter, loading: loading.models.helpCenter}))(HelpRetrievalTemplate)
