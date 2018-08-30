/**
 * Created by liekkas on 2017/3/1.
 */
import React from 'react'
import styled from 'styled-components'
import {Link} from 'dva/router'
import MenuData from '../../consts/menu'
import {Button, Popconfirm, message, Dropdown, Icon} from "antd";
import {local, session} from '../../utils/storage.js'
import fetch from 'dva/fetch'
import REST_USER_API from '../../consts/userApi'


const Root = styled.div`
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0;
  z-index: 9;
  height: 60px;
  background-color: ${props => props.isHome ? 'none' : props.theme.header.bgColor};
`


const LogoImg = styled.img`
  cursor: pointer;
`

const Menu = styled.div`
  display: flex;
`

const MenuItem = styled.div`
  color: ${props => props.selected ? props.theme.header.selectedColor : props.theme.header.color};
  background-color: ${props => props.selected ? props.theme.header.selectedBgColor : 'none'};
  font-size: 1rem;
  text-align: center;
  padding: 17px 16px 19px;
  &:hover {
    color: ${props => props.theme.header.hoverColor};
    background-color: ${props => props.theme.header.hoverBgColor};
  }
`
const userName = 'admin';
/**
 * 动态菜单改造 by zhangtao15 on 2017/7/3
 */
class Header extends React.Component{
  state = {
    menusData :[]
  }

  fetchData = function (callback) {
    const operatorId = session.get("operatorId");
    return fetch(REST_USER_API.MENUS + "?operatorId=" + operatorId , {
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
    session.set("menus",this.state.menusData);
    const menusData = this.state.menusData['rootMenu'];
    if (!menusData) return null
    return (
      <Root isHome={this.props.module === 'home'}>
          <LogoImg src={'assets/logo.png'} />
        <Menu>
          {
            menusData.map((item, index) =>
              <Link key={index} to={item.path} style={{display:'-ms-flexbox'}}>
                <MenuItem selected={this.props.module === item.key}>{item.name}</MenuItem>
              </Link>
            )
          }
          <Menu>
            <MenuItem >
              <Icon type="user" />
              <span style={{marginLeft:"10px"}}>
                 {session.get('userMsg').operatorName}
              </span>
            </MenuItem>
            <Link key={10} to={"/login"}>
              <MenuItem >{"退出"}</MenuItem>
            </Link>
          </Menu>
        </Menu>

      </Root>
    );
  }
}

/*

const Header = ({module}) => {

  return (
    <Root isHome={module === 'home'}>
      <Link to='/home'>
        <LogoImg src={'assets/logo.png'} />
      </Link>
      <Menu>
        {
          MenuData.map((item, index) =>
            <Link key={index} to={item.path}>
              <MenuItem selected={module === item.key}>{item.name}</MenuItem>
            </Link>
          )
        }
      </Menu>
    </Root>
  )
}
*/



Header.propTypes = {
  module: React.PropTypes.string
}

export default Header
