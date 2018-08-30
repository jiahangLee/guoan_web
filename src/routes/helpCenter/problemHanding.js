
import{Collapse  } from 'antd'

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

const businessIntroduction = () => {
  return (
    <Collapse bordered={false} defaultActiveKey={['1']}>
      <Panel header={header("DMP使用常见问题")} key="1">
        <p style={pStlye}>

        </p>
      </Panel>
    </Collapse>
  )
}

export default businessIntroduction
