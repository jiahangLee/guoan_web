import{Collapse  ,Form,Table} from 'antd'
import REST_API from '../../../consts/api'
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
class ProposalListTemplate extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render(){
    const  dataSourec = []
    const columns = [
      {
        title: '提交人',
        dataIndex: 'advice_user',
        key: 'advice_user',
      },
      {
        title: '提交时间',
        dataIndex: 'create_time',
        key: 'create_time',
      },
      {
        title: '所提意见',
        dataIndex: 'advice_message',
        key: 'advice_message',
      }
    ];
    const {loading,helpCenter} = this.props
    const  dataSource = helpCenter.list
    return (
      <Collapse bordered={false} defaultActiveKey={['1']}>
        <Panel header={header("建议反馈历列表")} key="1">
          <div >
            <Table bordered  className='normal'
                   size="large"
                   columns={columns}
                   dataSource={dataSource}
                   loading={loading}
                   pagination={true}
            />
          </div>
        </Panel>
      </Collapse>
    )
  }
}
export default connect(({helpCenter, loading}) => ({helpCenter, loading: loading.models.helpCenter}))(ProposalListTemplate)
