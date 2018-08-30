import React from 'react';
import { connect } from 'dva';
import './DataReport.css';
import MainLayout from '../../components/layout/MainLayout';
import  ReportQueryTemplate from './template/ReportQueryTemplate';

function DataReport({ location }) {
  return (
    <MainLayout location={location}>
      <div className='normal'>
        <ReportQueryTemplate />
      </div>
    </MainLayout>
  );
}

export default connect()(DataReport);
