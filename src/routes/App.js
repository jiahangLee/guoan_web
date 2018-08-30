/**
 * Created by liekkas on 2017/3/1.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import styled, { ThemeProvider } from 'styled-components'
import { connect } from 'dva'
import { Header, SideNav, Footer } from '../components'
import {local, session} from '../utils/storage.js'
import {hashHistory} from 'react-router'
// import theme from '../styles/theme'
import theme from '../theme.zxred'
import _ from 'lodash'

const Root = styled.div`
  background-color: ${props => props.theme['body-background']};
`
const Content = styled.div`
  height: 100vh;
  overflow: auto;
`
const Middle = styled.div`
  // height: 100vh;
  padding-top: 70px;
  display: flex;
  // overflow: auto;
`

const Left = styled.div`
  width: 15%;
`

const Right = styled.div`
  width: 83%;
  margin-left: 1%;
`

class App extends React.Component {
  componentDidUpdate (prevProps, prevState) {
    // 模块切换滚动条重置
    const node = ReactDOM.findDOMNode(this.refs.content)
    node.scrollTop = 0
  }

  render () {
    const {children, location,history} = this.props
    const openKeys = _.compact(location.pathname.split('/'))
    const module = location.pathname === '/' ? 'home' : openKeys[0]

    let flag = true
    const  authUrls = session.get('menus')
    if(authUrls) {
      const authUrlMap = authUrls['authUrls']
      if(authUrlMap) {
        authUrls['authUrls'].map(function (val, index, arr) {
          let pathname = '';
          location.pathname.split('/').map(function (val, index, arr) {
            pathname += val
          });
          let urlname = '';
          arr[index].split('/').map(function (val, index, arr) {
            urlname += val
          });
          if (urlname == pathname) {
            flag = false;
            return
          }
        });
        if (flag && module != '404') {
          // history.pushState(null, '/login');
          // history.replaceState(null, '/login');
          hashHistory.push('/login')
        }
      }
    }
    if(authUrls) {
      if (authUrls.authUrls.length == 0 && module == 'home') {
        hashHistory.push('/login')
        // history.pushState(null, '/login');
        // history.replaceState(null, '/login');
      }
    }

    return (
      <ThemeProvider theme={theme}>
        <Root>
          <Header module={module} />
          <Content ref='content'>
            {
              module === 'home' ? children
                : <div>
                  <Middle>
                    <Left>
                      <SideNav module={module}
                        openKeys={openKeys}
                        selectedKeys={[location.pathname]} />
                    </Left>
                    <Right>{children}</Right>
                  </Middle>
                  <Footer />
                </div>
            }
          </Content>
        </Root>
      </ThemeProvider>
    )
  }
}

export default connect(({app}) => ({app}))(App)
