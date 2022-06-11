import React from 'react'
import SidebarChat from './SidebarChat'
import SidebarWorkSpace from './SidebarWorkSpace'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Snav = styled.nav`
    background : lightyellow;
    width : 10%;
    min-width : 200px;
    height : 100vh;
    display : flex;
    justify-content : space-between;
    margin-right : 25px;
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
            <Sspace><Link to='/main/calendar' style={{ textDecoration: 'none', color : 'black'}}><SidebarGoMain>메인</SidebarGoMain></Link></Sspace>
            <Sspace><SidebarWorkSpace /></Sspace>
            <Sspace><SidebarChat /></Sspace>
            <SidebarBottom> {/* 아래부분 */}
                    <Link to='/main/setting' style={{ textDecoration: 'none', color : 'black'}}><SidebarSetting>세팅</SidebarSetting></Link>
                    <Link to='/main/project' style={{ textDecoration: 'none', color : 'black'}}><SidebarGoSelectProject>프로젝트</SidebarGoSelectProject></Link>
            </SidebarBottom>
            
        </Snavmain>
    </Snav>
  )
}

export default SidebarMain