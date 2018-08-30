/**
 * Created by liekkas on 2017/3/3.
 */
import React from 'react'
import styled from 'styled-components'

const Root = styled.div`
  position: relative;
  padding: 0 12px 12px;
  margin-bottom: 15px;
  border: solid 1px #d3d3d3;
  //border-top-width: 2px;
  //border-top-color: ${props => props.theme.primaryColor};
  background-color: #fff;
  &:hover {
    box-shadow: 0 0 0.5px ${props => props.theme.primaryColor};
  }
`

const Header = styled.div`
  font-size: 1rem;
  padding: 12px 8px;
  //background-color: #fbfbfb;
  border-bottom: solid 1px ${props => props.theme.primaryColor};
  margin-bottom: 12px;
`

const Panel = ({title, children,divStyle}) => {
  return (
    <Root  style ={divStyle}>
      <Header>{title}</Header>
      {children}
    </Root>
  )
}

Panel.propTypes = {
  title: React.PropTypes.string,
  divStyle:React.PropTypes.object,
}

export default Panel
