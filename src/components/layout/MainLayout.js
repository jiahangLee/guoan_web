/**
 * Created by jiahang Lee on 2017/6/23.
 */
import React from 'react';
import  './MainLayout.css';
import Header from './TableHeader';

function MainLayout({ children, location }) {
  return (
    <div className='normal'>
      <Header location={location} />
      <div className='content'>
        <div className='main'>
          {children}
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
