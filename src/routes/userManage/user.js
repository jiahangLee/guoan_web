import React from 'react';
import { connect } from 'dva';
import './user.css';
import UsersComponent from '../../components/user/user';
import MainLayout from '../../components/layout/MainLayout';

function Users({ location }) {
  return (
    <MainLayout location={location}>
      <div className='normal'>
        <UsersComponent />
      </div>
    </MainLayout>
  );
}

export default connect()(Users);
