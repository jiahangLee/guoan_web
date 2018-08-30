/**
 * Created by liekkas on 2017/3/2.
 */
import React from 'react'
import styled from 'styled-components'

const Root = styled.div`
  width: 83%;
  margin-left: 16%;
  padding-top: 70px;
  height: 100%;
  position: relative;
`

const ContentBox = ({children}) => {
  return (
    <Root>
      {children}
    </Root>
  )
}

export default ContentBox
