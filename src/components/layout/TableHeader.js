/**
 * Created by jiahang Lee on 2017/6/23.
 */
import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';

function Header({ location }) {
  return (
    <Menu
      selectedKeys={[location.pathname]}
      mode="horizontal"
      theme="white"
    >

    </Menu>
  );
}

export default Header;
