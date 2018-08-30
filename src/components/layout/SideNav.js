/**
 * Created by liekkas on 2017/3/2.
 */
import React from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'dva/router'
import {MENUS,loadMenus} from '../../consts/menu'
import fetch from 'dva/fetch'
import REST_USER_API from '../../consts/userApi'
import {local, session} from '../../utils/storage.js'


const getMenus = function (module, topMenus, menuArray, siderFold, parentPath) {
  parentPath = parentPath || '/'
  return menuArray.map(item => {
    if (item.children) {
      return (
        <Menu.SubMenu key={item.key} title={<span>{item.icon ? <Icon type={item.icon} /> : ''}{siderFold && topMenus.indexOf(item.key) >= 0 ? '' : item.name}</span>}>
          {getMenus(module, topMenus, item.children, siderFold, parentPath + item.key + '/')}
        </Menu.SubMenu>
      )
    } else {
      return (
        <Menu.Item key={'/' + module + parentPath + item.key}>
          <Link to={module + parentPath + item.key}>
            <Icon type='right' />
            {siderFold && topMenus.indexOf(item.key) >= 0 ? '' : item.name}
          </Link>
        </Menu.Item>
      )
    }
  })
}


/**
 * 动态菜单改造 by zhangtao15 on 2017/7/3
 */
class SideNav extends React.Component {
  state = {
    selectedKeys: [],
    module: '',
    openKeys :[],
    siderFold :'',
    menusData :[]
  }

  fetchData = function (callback) {
    const menuCode = this.props.module;
    const operatorId = session.get("operatorId");
    return fetch(REST_USER_API.MENUS + "?operatorId=" + operatorId + '&menuCode=' + menuCode, {
      method: 'POST',
      mode: 'cors',
      timeout: 5000,
      body: JSON.stringify(),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
    }).then(function (response) {
      callback(response)
      return response
    }).catch(err => {
    });
  }

  componentWillMount () {
    this.fetchData(menusData => this.setState({ menusData }));
  }

  render() {
    const menusData = this.state.menusData[this.props.module];
    if (!menusData) return null

    const topMenus = menusData.map(item => item.key)
    const menuItems = getMenus(this.props.module, topMenus, menusData, this.props.siderFold)

    return (
      <div style={{width: '100%', height: '94vh', overflow: 'auto'}}>
        {
          this.state.siderFold
            ? <Menu
              mode='vertical'>
              {menuItems}
            </Menu>
            : <Menu
              defaultSelectedKeys={this.props.selectedKeys}
              defaultOpenKeys={this.props.openKeys}
              mode='inline'>
              {menuItems}
            </Menu>
        }
      </div>
    )
  }
}

/*
const SideNav = ({module, selectedKeys, openKeys, siderFold}) => {
  const menus = session.get('menus')
  if(!menus) return null
  const menusData = menus[module]
  if (!menusData) return null
  const topMenus = menusData.map(item => item.key)
  const menuItems = getMenus(module, topMenus, menusData, siderFold)
  return (
    <div>
      {
        siderFold
          ? <Menu
            mode='vertical'>
            {menuItems}
          </Menu>
          : <Menu
            defaultSelectedKeys={selectedKeys}
            defaultOpenKeys={openKeys}
            mode='inline'>
            {menuItems}
          </Menu>
      }
    </div>
  )
}*/

SideNav.propTypes = {
  module: React.PropTypes.string,
  siderFold: React.PropTypes.bool,
  selectedKeys: React.PropTypes.array,
  openKeys: React.PropTypes.array
}

export default SideNav
