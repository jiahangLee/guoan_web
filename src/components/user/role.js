/**
 * Created by jiahang Lee on 2017/7/6.
 */
import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Table, Pagination, Popconfirm, Button ,Modal} from 'antd';
import './role.css';
import { PAGE_SIZE } from '../../constants';
import {local, session} from '../../utils/storage.js'
import { Input } from 'antd';
const Search = Input.Search;
import RoleAdd from '../../routes/userManage/RoleAdd'
import RoleUpdate from '../../routes/userManage/RoleUpdate'
var searchValue;
function Users({ dispatch, roleList: dataSource, loading, roleTotal, rolePage: current }) {
    const operatorId = session.get("operatorId");

  function pageChangeHandler(rolePage) {
    dispatch(routerRedux.push({
      pathname: 'um/role',
      query: { searchValue, rolePage },
    }));
  }
  function selectUser(values,rolePage) {

    dispatch({
      type: 'userManage/roleSelect',
      payload: { values,rolePage },
    });
    searchValue = values;
  }

  const columns = [
    // {
    //   title: '角色编号',
    //   dataIndex: 'roleId',
    //   key: 'roleId',
    // },
    {
      title: '角色名',
      dataIndex: 'roleName',
      key: 'roleName',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        <span>
          正常
        </span>
      )
    },
    {
      title: '创建日期',
      dataIndex: 'createDate',
      key: 'createDate',
    },
    {
      title: '修改日期',
      dataIndex: 'modifyDate',
      key: 'modifyDate',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: '操作',
      key: 'operation',
      render: (text, record) => (
        <span className='operation'>
          <RoleUpdate record={record} onCancel={pageChangeHandler.bind(current)} >
            <a>修改  </a>
          </RoleUpdate>
        </span>
      ),
    },
  ];


  return (
    <div>
      <div>
        <div className='create'>
          <RoleAdd record={{}} onCancel={pageChangeHandler.bind(current)} >
            <Button type="primary">新增</Button>
          </RoleAdd>
        </div>
        <div className="search">
          <Search
            placeholder="请输入要查询的角色名"
            style={{ width: 200 }}
            onSearch={selectUser}
          />
        </div>
      </div>
      <Table bordered  className='normal'
             size = "small"
             columns={columns}
             dataSource={dataSource}
             loading={loading}
             rowKey={record => record.id}
             pagination={false}
      />

      <Pagination className="page" showQuickJumper pageSize={PAGE_SIZE} current={current} total={roleTotal} onChange={pageChangeHandler} />
    </div>
  );
}


function mapStateToProps(state) {
  const { roleList, roleTotal, rolePage } = state.userManage;
  return {
    loading: state.loading.models.userManage,
    roleList,
    roleTotal,
    rolePage,
  };
}

export default connect(mapStateToProps)(Users);

