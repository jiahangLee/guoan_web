/**
 * Created by jiahang Lee on 2017/7/6.
 */
import React from 'react';
import { connect } from 'dva';
import RoleComponent from '../../components/user/role';
import MainLayout from '../../components/layout/MainLayout';

function Users({ location }) {
  return (
    <MainLayout location={location}>
      <div className='normal'>
        <RoleComponent />
      </div>
    </MainLayout>
  );
}

export default connect()(Users);
