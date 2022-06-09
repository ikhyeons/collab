import React, {useState} from 'react'
import SidebarChat from './SidebarChat'
import SidebarWorkSpace from './SidebarWorkSpace'
import styled from 'styled-components'

const Snav = styled.nav`
    background : lightyellow;
    width : 12%;
    min-width : 200px;
    height : 100vh;
    display : flex;
    justify-content : space-between;
`

const Sspace = styled.li`
    background : lightyellow;
    font-size : 27px;
    margin-bottom : 20px;
    
`
const SidebarGoMain = styled.div`
padding-left : 10px;
:hover{
    background : yellow;
    cursor : pointer;
  }
`

const SidebarBottom = styled.div`
position : absolute;
bottom : 45px;
width : 100%;
`

const SidebarGoSelectProject = styled.div`
width : 100%;
font-size : 27px;
:hover{
    background : yellow;
    cursor : pointer;
  }
`

const SidebarSetting = styled.div`
width : 100%;
font-size : 27px;
:hover{
    background : yellow;
    cursor : pointer;
  }
`

const Snavmain = styled.ul`
    position : relative;
    width : 100%;
`


const SidebarMain = () => {

  return (
    <Snav>
        <Snavmain>
            <Sspace><SidebarGoMain>메인</SidebarGoMain></Sspace>
            <Sspace><SidebarWorkSpace /></Sspace>
            <Sspace><SidebarChat /></Sspace>
            <SidebarBottom>
                <SidebarSetting>세팅</SidebarSetting>
                <SidebarGoSelectProject>프로젝트</SidebarGoSelectProject>
            </SidebarBottom>
            
        </Snavmain>
    </Snav>
  )
}

export default SidebarMain