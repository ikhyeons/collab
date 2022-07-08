import React from 'react'
import Login from './Login'
import Loginpic from './Loginpic'
import styled from 'styled-components'

const SloginMain = styled.div`
    display : flex; // block 가로정렬
    width : 100vw; // 화면에 맞추기
    overflow-x : hidden; //넘어간 거 가리기
`

function LoginMain() {
  return (
    <SloginMain>
        {/*로그인 왼쪽 사진 슬라이드*/}
        <Loginpic/>
        {/*로그인 창*/}
        <Login />
    </SloginMain>
  )
}

export default LoginMain