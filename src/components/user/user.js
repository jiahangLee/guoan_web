/**
 * Created by jiahang Lee on 2017/6/23.
 */
import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Table, Pagination, Popconfirm, Button ,Modal} from 'antd';
import './user.css';
import { PAGE_SIZE } from '../../constants';
import UserModal from './UserModel';
import UserUpdateModel from './UserUpdateModel';
import {local, session} from '../../utils/storage.js'
import  UserRemoteSelect from '../layout/Search'
import { Input } from 'antd';
import App from './deleteAll'
const Search = Input.Search;
import userAuth from '../../consts/userAuth'
const operatorId =  session.get('operatorId')
var valuess = "" ;
// rowSelection object indicates the need for row selection
//////////////////////////////////////////////////////////////////////////////////////////////
var ids;
const rowSelection = {

  onChange: (selectedRowKeys, selectedRows) => {
    ids = selectedRows;
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User',    // Column configuration not to be checked
  }),
};
function Users({ dispatch, list: dataSource, loading, total, page: current }) {
  function deleteHandler(id) {
    if(!userAuth.checkUserAuth.getUserAuth(userAuth.USERDEL)){
      Modal.error({
        title: '用户权限不足',
        okText: '确定'
      });
      return
    }
    const operatorId = session.get("operatorId");
    if(id == userAuth.SUPERUSERID)
    {
      Modal.error({
        title: '不能删除超级管理员',
        okText: '确定'
      });
      return
    }
    if(id == operatorId){
      Modal.error({
        title: '不能删除自身用户',
        okText: '确定'
      });
      return{}
    }
    dispatch({
      type: 'userManage/remove',
      payload: id,
    });
  }
  function pwdResetHandler(id) {
    if(!userAuth.checkUserAuth.getUserAuth(userAuth.PWDRESET)){
      Modal.error({
        title: '用户权限不足',
        okText: '确定'
      });
      return
    }
    const operatorId = session.get("operatorId");
    dispatch({
      type: 'userManage/resetPwd',
      payload: id,
    });
  }



  function deleteAll(arr) {
    if(!userAuth.checkUserAuth.getUserAuth(userAuth.USERDEL)){
      Modal.error({
        title: '用户权限不足',
        okText: '确定'
      });
      return
    }
    if(!ids){
      Modal.warning({
        title: '请选择要删除的员工!',
        okText: '确定'
      });
      return;
    }
    for(let i=0;i<ids.length;i++){
      const operatorId = session.get("operatorId");
      if(ids[i].operatorId == operatorId){
        Modal.error({
          title: '不能删除自身用户',
          okText: '确定'
        });
        return
      }
    }
    for(let i=0;i<ids.length;i++)
        deleteHandler(ids[i].operatorId);
  }
  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: 'um/user',
      query: { valuess ,page },
    }));
  }
  function selectUser(values,page) {
    dispatch({
      type: 'userManage/userSelect',
      payload: { values,page },
    });
    valuess = values;
  }
  function editHandler(id, values) {
    dispatch({
      type: 'userManage/patch',
      payload: { id, values },
    });
  }

  function createHandler(values) {
    dispatch({
      type: 'userManage/create',
      payload: values,
    });
  }

  const columns = [
    // {
    //   title: '员工编号',
    //   dataIndex: 'operatorId',
    //   key: 'operatorId',
    //   sorter: (a, b) => a.operatorId - b.operatorId,
    // },
    {
      title: '用户名',
      dataIndex: 'operatorCode',
      key: 'operatorCode',
    },
    {
      title: '员工名',
      dataIndex: 'operatorName',
      key: 'operatorName',
    },
    {
      title: '角色',
      dataIndex: 'roleName',
      key: 'roleName',
    },
    {
      title: '开始时间',
      dataIndex: 'createDate',
      key: 'createDate',
    },
    {
      title: '结束时间',
      dataIndex: 'endDate',
      key: 'endDate',
    },
    // {
    //   title: '所属项目',
    //   dataIndex: '',
    //   key: '',
    // },
    // {
    //   title: '省',
    //   dataIndex: '',
    //   key: '',
    // },
    // {
    //   title: '市',
    //   dataIndex: '',
    //   key: '',
    // },
    {
      title: '单位名称',
      dataIndex: '',
      key: '',
    },
    {
      title: '部门',
      dataIndex: '',
      key: '',
    },
    {
      title: '职位',
      dataIndex: '',
      key: '',
    },
    {
      title: '邮箱',
      dataIndex: '',
      key: '',
    },
    {
      title: '手机号',
      dataIndex: '',
      key: '',
    },

    {
      title: '操作',
      key: 'operation',
      render: (text, record) => (
        <span className='operation'>
          <UserUpdateModel record={record} onOk={editHandler.bind(record.operatorId, record)}>
            <a>修改  </a>
          </UserUpdateModel>
          <Popconfirm title="确认删除吗?" onConfirm={deleteHandler.bind(null, record.operatorId)}>
            <a href="">删除</a>
          </Popconfirm>
          {session.get('operatorId') == 1 && <Popconfirm title="确认重置密码吗?" onConfirm={pwdResetHandler.bind(null, record.operatorId)}>
            <a href="">密码重置</a>
          </Popconfirm>
          }
        </span>
      ),
    },
  ];



  return (
    <div>
      <div>
        <div className='create'>
          <UserModal record={{}} onOk={createHandler}>
            <Button type="primary">新增</Button>
          </UserModal>
        </div>
        <div className='delete1'>
        </div>
        <div className="search">
          <Search
            placeholder="请输入要查询的员工名"
            style={{ width: 200 }}
            onSearch={selectUser}
          />
        </div>
      </div>
        <Table bordered  className='normal'
          /*rowSelection={rowSelection}*/
          size="small"
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          rowKey={record => record.id}
          pagination={false}
        />
      <Pagination className="page" showQuickJumper pageSize={PAGE_SIZE} current={current} total={total} onChange={pageChangeHandler} />
    </div>
  );
}


function mapStateToProps(state) {
  const { list, total, page } = state.userManage;
  return {
    loading: state.loading.models.userManage,
    list,
    total,
    page,
  };
}

export default connect(mapStateToProps)(Users);

