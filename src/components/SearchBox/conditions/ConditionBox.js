/**
 * Created by liekkas on 2017/3/3.
 */
import React from 'react'
import styled from 'styled-components'

const Root = styled.div`
  display: flex;
  align-items: baseline;
  margin: 0 10px 8px 0;
`

const ConditionBox = ({children}) => {
  return (
    <Root>
      {children}
    </Root>
  )
}

export default ConditionBox
