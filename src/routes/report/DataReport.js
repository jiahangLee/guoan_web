import React from 'react';
import { connect } from 'dva';
import './DataReport.css';
import MainLayout from '../../components/layout/MainLayout';
import  ReportTemplate from './template/ReportTemplate';

function DataReport({ location }) {
  return (
    <MainLayout location={location}>
      <div className='normal'>
        <ReportTemplate />
      </div>
    </MainLayout>
  );
}

export default connect()(DataReport);
