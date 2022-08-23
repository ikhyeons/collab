import React from 'react'
import SidebarChat from './SidebarChat'
import SidebarWorkSpace from './SidebarWorkSpace'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'


const Snav = styled.nav`
  position : relative;
    background : lightyellow;
    width : 10%;
    min-width : 200px;
    height : 100vh;
    display : flex;
    justify-content : space-between;
    margin-right : 5px;
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
  box-shadow : 0 -5px 8px -6px rgb(200, 200, 120);
  position : absolute;
  bottom : 0px;
  height : 120px;
  width : 100%;
  background : rgb(250, 250, 150);
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
  margin : 15px 0 15px 0;
`

const Snavmain = styled.ul`
    position : relative;
    width : 100%;
`

const SidebarMain = () => {
  const {projectNum} = useParams()
  return (
    <Snav>
        <Snavmain>
            <Sspace><Link to={`/main/calendar/${projectNum}`} style={{ textDecoration: 'none', color : 'black'}}><SidebarGoMain>메인</SidebarGoMain></Link></Sspace>
            <Sspace><SidebarWorkSpace /></Sspace>
            <Sspace><SidebarChat /></Sspace>
            <SidebarBottom> {/* 아래부분 */}
                    <Link to='/main/setting' style={{ textDecoration: 'none', color : 'black'}}><SidebarSetting>세팅</SidebarSetting></Link>
                    <Link to='/project' style={{ textDecoration: 'none', color : 'black'}}><SidebarGoSelectProject>프로젝트</SidebarGoSelectProject></Link>
            </SidebarBottom>
        </Snavmain>
    </Snav>
  )
}

export default SidebarMain