var React=require('react');
var PropTypes=require('react').PropTypes;
import Tree, { TreeNode } from 'rc-tree';
require('rc-tree/assets/index.css');
import cssAnimation from 'css-animation';
var Link= require('react-router').Link;
var IndexLink=require('react-router').IndexLink;
import FreeScrollBar from 'react-free-scrollbar';
import { connect } from 'dva'



const STYLE = `  
.collapse {  
  overflow: hidden;  
  display: block;  
}  
  
.collapse-active {  
  transition: height 0.3s ease-out;  
}  
`;

function animate(node, show, done) {
  let height = node.offsetHeight;
  return cssAnimation(node, 'collapse', {
    start() {
      if (!show) {
        node.style.height = `${node.offsetHeight}px`;
      } else {
        height = node.offsetHeight;
        node.style.height = 0;
      }
    },
    active() {
      node.style.height = `${show ? height : 0}px`;
    },
    end() {
      node.style.height = '';
      done();
    }
  });
}


var commonTree = React.createClass({
  //设置默认数据类型
  propTypes: {
    keys: PropTypes.array,
    title: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    dataChecked: PropTypes.array.isRequired,
  },
  loadSelectedKeys: function () {
    return this.state.checkedKeys
  },
  componentWillMount () {

  },
  //设置默认属性值
/*  getDefaultProps() {
    return {
      keys: ['0-0']
    };
  },*/
  getInitialState() {

    //const keys = this.props.keys;
   // const treeDatas = '[{"child":[{"key":"-100001","parentId":100,"title":"新增","treeId":100001},{"key":"-100002","parentId":100,"title":"删除","treeId":100002},{"key":"-100003","parentId":100,"title":"修改","treeId":100003}],"key":"-100","parentId":-1,"title":"角色管理","treeId":100},{"child":[{"key":"-101001","parentId":101,"title":"新增","treeId":101001},{"key":"-101002","parentId":101,"title":"删除","treeId":101002},{"key":"-101003","parentId":101,"title":"修改","treeId":101003}],"key":"-101","parentId":-1,"title":"用户管理","treeId":101},{"child":[{"key":"-1001","parentId":103,"title":"首页","treeId":1001},{"child":[{"child":[{"key":"-1002001001","parentId":1002001,"title":"用户覆盖","treeId":1002001001},{"key":"-1002001002","parentId":1002001,"title":"用户发展","treeId":1002001002},{"key":"-1002001003","parentId":1002001,"title":"用户活跃","treeId":1002001003},{"key":"-1002001004","parentId":1002001,"title":"用户使用","treeId":1002001004}],"key":"-1002001","parentId":1002,"title":"电视概况","treeId":1002001},{"child":[{"key":"-1002002001","parentId":1002002,"title":"全业务用户量","treeId":1002002001},{"key":"-1002002002","parentId":1002002,"title":"全业务用户使用时长","treeId":1002002002},{"key":"-1002002003","parentId":1002002,"title":"全业务使用次数","treeId":1002002003},{"key":"-1002002004","parentId":1002002,"title":"全业务使用天数","treeId":1002002004}],"key":"-1002002","parentId":1002,"title":"全业务使用分析","treeId":1002002},{"child":[{"key":"-1002003001","parentId":1002003,"title":"用户分析","treeId":1002003001},{"key":"-1002003002","parentId":1002003,"title":"业务使用分析","treeId":1002003002}],"key":"-1002003","parentId":1002,"title":"直播业务分析","treeId":1002003},{"child":[{"key":"-1002004001","parentId":1002004,"title":"用户分析","treeId":1002004001},{"key":"-1002004002","parentId":1002004,"title":"业务使用分析","treeId":1002004002}],"key":"-1002004","parentId":1002,"title":"回看业务分析","treeId":1002004},{"child":[{"key":"-1002005001","parentId":1002005,"title":"用户分析","treeId":1002005001},{"key":"-1002005002","parentId":1002005,"title":"业务使用分析","treeId":1002005002}],"key":"-1002005","parentId":1002,"title":"时移业务分析","treeId":1002005},{"child":[{"key":"-1002006001","parentId":1002006,"title":"用户分析","treeId":1002006001},{"key":"-1002006002","parentId":1002006,"title":"业务使用分析","treeId":1002006002}],"key":"-1002006","parentId":1002,"title":"VOD点播业务分析","treeId":1002006},{"child":[{"key":"-1002007001","parentId":1002007,"title":"用户分析","treeId":1002007001},{"key":"-1002007002","parentId":1002007,"title":"业务使用分析","treeId":1002007002}],"key":"-1002007","parentId":1002,"title":"OTT点播业务分析","treeId":1002007},{"child":[{"key":"-1002008001","parentId":1002008,"title":"用户分析","treeId":1002008001},{"key":"-1002008002","parentId":1002008,"title":"业务使用分析","treeId":1002008002}],"key":"-1002008","parentId":1002,"title":"教育","treeId":1002008},{"child":[{"key":"-1002009001","parentId":1002009,"title":"用户分析","treeId":1002009001},{"key":"-1002009002","parentId":1002009,"title":"业务使用分析","treeId":1002009002}],"key":"-1002009","parentId":1002,"title":"应用商店","treeId":1002009},{"child":[{"key":"-1002010001","parentId":1002010,"title":"用户分析","treeId":1002010001}],"key":"-1002010","parentId":1002,"title":"智慧社区","treeId":1002010},{"child":[{"child":[{"key":"-1002011001001","parentId":1002011001,"title":"用户分析","treeId":1002011001001}],"key":"-1002011001","parentId":1002011,"title":"百灵K歌","treeId":1002011001},{"child":[{"key":"-1002011002001","parentId":1002011002,"title":"用户分析","treeId":1002011002001}],"key":"-1002011002","parentId":1002011,"title":"幸福健身团","treeId":1002011002}],"key":"-1002011","parentId":1002,"title":"生活产品","treeId":1002011}],"key":"-1002","parentId":103,"title":"洞察分析","treeId":1002},{"key":"-1003","parentId":103,"title":"运营支撑","treeId":1003},{"key":"-1004","parentId":103,"title":"用户管理","treeId":1004},{"key":"-1005","parentId":103,"title":"数据资产","treeId":1005},{"key":"-1006","parentId":103,"title":"帮助中心","treeId":1006}],"key":"-103","parentId":-1,"title":"页面访问","treeId":103}]';
    return {
      //defaultExpandedKeys: keys,   //默认展开 keys节点
      //defaultSelectedKeys: keys,  //默认选中(高亮) keys节点
      //defaultCheckedKeys: keys,  //默认Checked keys节点
      defaultExpandedKeys: [],
      defaultSelectedKeys: [],
      defaultCheckedKeys: ['0-0-1'],
      expandedKeys: [],
      selectedKeys: [],
      checkedKeys: [],
      switchIt: true

    };
  },
  onExpand(expandedKeys) {
    console.log('onExpand', expandedKeys, arguments);
    this.setState({expandedKeys:expandedKeys});
  },
  onSelect(selectedKeys, info) {
    console.log('selected', selectedKeys, info);
    this.setState({selectedKeys:selectedKeys});

    this.selKey = info.node.props.eventKey;
  },
  onCheck(checkedKeys, info) {
    this.setState({checkedKeys:checkedKeys});
    console.log('onCheck', checkedKeys, info);
  },

  render() {

    //先查出根节点
  function findRoot(treeData) {
      var nodeStr=treeData.map(function(node){
        return (
          <TreeNode title={node.title} key={node.key}>{findChild(node)}</TreeNode>
        );
      });
      return nodeStr;
    }

    //循环递归展开树
    function findChild(node){
      if(node!=null){
        if(node.child!=null){
          var str=node.child.map(function(n){
            return(
              <TreeNode title={n.title} key={n.key}>{findChild(n)}</TreeNode>
            );
          })
          return str;
        }
      }
    }


    const animation = {
      enter(node, done) {
        return animate(node, true, done);
      },
      leave(node, done) {
        return animate(node, false, done);
      },
      appear(node, done) {
        return animate(node, true, done);
      }
    };

    const customLabel = (
      <span className="cus-label">
                    <span>operations </span>
              </span>
    );
    //defaultExpandAll 默认全部展开
    //showline  显示树中的虚线
    //checkable 提供复选框功能
    //onExpand 树展开后的回调  onSelect 树选中后的回调  onCheck 树选择的回调
    //onLoadData 动态加载树
    //openAnimation 展开节点时动画函数
    return (<div style={{ margin: '0 20px', width: '300px', height: '360px'}}>
      <FreeScrollBar>
        {/*<div>
         选中的节点key值：{this.state.selectedKeys}<br/>
         展开的节点key值：{this.state.expandedKeys}<br/>
         check的节点key值：{this.state.checkedKeys}<br/>
         </div>
         <style dangerouslySetInnerHTML={{ __html: STYLE }}/>*/}
        <lable>{this.props.title}</lable>
        <Tree
          className="myCls" showLine checkable defaultExpandAll
          defaultExpandedKeys={this.props.dataChecked}
          onExpand={this.onExpand}
          defaultSelectedKeys={this.state.defaultSelectedKeys}
          defaultCheckedKeys={this.props.dataChecked}
          onSelect={this.onSelect} onCheck={this.onCheck}
          callbackParent={this.onChildChanged}
        >
          {findRoot(this.props.data)}
        </Tree>
      </FreeScrollBar>
    </div>);
  }
});


export default commonTree;



