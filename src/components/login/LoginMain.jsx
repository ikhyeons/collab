import React from 'react'
import Login from './Login'
import Loginpic from './Loginpic'
import styled from 'styled-components'

const SloginMain = styled.div`
    display : flex;
    justify-content : space-around;
    width : 100vw;
    overflow-x : hidden;
`

function LoginMain() {
  return (
    <SloginMain>
        <Loginpic/>
        <Login/>
    </SloginMain>
  )
}

export default LoginMain