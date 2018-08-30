/**
 * Created by liekkas on 2016/12/25.
 */
import React from 'react'
import styled from 'styled-components'

const Root = styled.div`
  width: 100%;
  height: 75vh;
  background-image: url(assets/wip.jpg);
  background-size: cover;
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const WIP = (props) => {
  return (
    <Root />
  )
}

export default WIP
