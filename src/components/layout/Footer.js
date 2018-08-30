import React from 'react'
import config from '../../config'
import styled from 'styled-components'

const Root = styled.div`
    height: 3.4vh;
    line-height: 3.4vh;
    text-align: center;
    font-size: 12px;
    color: #999;
    color: ${props => props.theme.footer.color};
    background-color: ${props => props.theme.footer.bgColor};
    width: 100%;
    margin-top:20px;
    position:absolute
    bottom:0px;
`

const Footer = () => <Root>{config.footerText}</Root>

export default Footer
