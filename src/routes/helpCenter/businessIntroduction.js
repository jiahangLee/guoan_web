
import{Collapse ,Icon } from 'antd'
import REST_API from '../../consts/api'

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
      <Panel header={header('广视大数据DMP应用概述')} key="1">
        <p style={pStlye} >
          1.为国安广视提供机顶盒DVB和OTT业务的业务洞察分析，包括直播、时移、回看、VOD点播、OTT点播、游戏、教育等等。
        </p>
        <p style={pStlye} >
          2.建立丰富完整的标签体系，构建360度用户画像及用户分群，为用户和业务产品提供客观准确的特征描述。
        </p>
        <p style={pStlye} >
          3.提供用户价值类、用户粘性增强类等分级判定，为精准营销和智能推荐提供数据基础。

        </p>
      </Panel>
      <Panel header={header('如何使用用户设置功能')} key="2">
        <p style={pStlye}>
          1.用户管理,点击新增,输入用户名及其他信息,点击确认即创建该用户;
          点击修改可以修改用户名,失效日期以及角色,点击删除则删除该用户所有信息,点击密码重置则重置该用户密码为"000000"
        </p>
        <p style={pStlye}>
          2.角色管理,点击新增,输入角色名,勾选该角色的区域权限和功能权限,点击确定及创建该角色;点击修改可以修改角色名,区域权限和功能权限
        </p>
        <p style={pStlye}>
          3.用户密码修改,对当前用户进行密码修改,输入旧密码,新密码,点击保存,旧密码正确则修改成功
        </p>
      </Panel>
      <Panel header={header("洞察分析业务及功能介绍")} key="3">
        <p style={pStlye}>
          1.洞察分析业务包含：电视概况、全业务使用分析、直播业务分析、回看业务分析、时移业务分析、VOD点播业务分析、OTT点播业务分析、
          教育、应用商店、智慧社区、生活产品、媒资分析、广告分析、游戏大厅；
        </p>
        <p style={pStlye}>
          2.业务下面为具体的：用户分析、业务使用分析、频道分析、频道组分析、频道排名、节目分析、节目排行、栏目分析、用户流动分析、用户留存率分析、
          专区分析、产品包分析、业务分布占比、应用装机情况分析、应用分类分析、省平台存量分析、省平台增量分析、流量走势
        </p>
      </Panel>
      <Panel header={header("如何使用洞察分析报表")} key="4">
        <p style={pStlye}>
          1.点击要查询的业务菜单，选择统计粒度（日，周......年）,选择日期区间,选择地区,点击查询即可
        </p>
        <p style={pStlye}>
          2.报表分为图表和列表两大类展现方式,图表以柱状图的方式呈现数据,列表以详细数据显示,选择图表中的某类指标则加载该指标的数据展示信息(列表同步展示)
        </p>
        <p style={pStlye}>
          3.当查询包含频道、节目或栏目等数据时，可以在查询框里输入要查询的频道、节目等配置信息，勾选查询的类点击查询即可
        </p>
      </Panel>
      <Panel header={header("营销服务功能使用说明及介绍")} key="5">
        <p style={pStlye}>
          1.点击要查询的业务菜单，选择统计粒度（日，周......年）,选择日期区间,选择地区,点击查询即可
        </p>
        <p style={pStlye}>
          2.点击标签库、标签生态可以查看客观标签(标签云)跟非客观标签(夜猫子、综艺达人、动漫达人、足球迷家有老人、家有小孩、家有学生)
        </p>
        <p style={pStlye}>
          3.点击用户画像个人画像可以查看用户基本信息、家庭成员判定、业务用户排行、非客观标签、客观标签
        </p>
        <p style={pStlye}>
          4.点击用户画像群体画像可以查看价值跟粘性群体的等级、总业务排行、区域分布、用户趋势、人员判定、价值或粘性偏好、人员分布以及业务群体的概况
        </p>
      </Panel>
      <Panel header={header("帮助文档")} key="6">
        <p style={pStlye}>
          <Icon type="file-word" style={{ fontSize: 16, color: '#08c' }} />
          <a href={REST_API.helpDocDownload+100}>中信国安广视网络大数据系统系统操作手册</a>
        </p>
        <p style={pStlye}>
          <Icon type="file-excel" style={{ fontSize: 16, color: '#08c' }} />
          <a href={REST_API.helpDocDownload+200}>中信国安广视网络大数据平台指标</a>
        </p>
        {/*<p style={pStlye}>*/}
          {/*<Icon type="file-word" style={{ fontSize: 16, color: '#08c' }} />*/}
          {/*<a href={REST_API.helpDocDownload+300}>中信国安广视大数据中心平台详细设计文档</a>*/}
        {/*</p>*/}
      </Panel>
    </Collapse>
  )
}

export default businessIntroduction
