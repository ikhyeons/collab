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

const Sspace = styled.p`
    background : lightyellow;
    font-size : 25px;
    padding-left : 10px;
    :hover{
        background : yellow;
        cursor : pointer;
    }
`

const Sarrowbar = styled.div`
    position : relative;
    right : 0px;
    transition : top 4s;
    top : ${prop => prop.top}px;
    
`

const SidebarMain = () => {
    const [top, setTop] = useState(0);

  return (
    <Snav>
        <navmain>
            <Sspace>뒤로가기</Sspace>
            <Sspace>메인</Sspace>
            <Sspace><SidebarWorkSpace /></Sspace>
            <Sspace><SidebarChat /></Sspace>
        </navmain>
        <Sarrowbar top = {top}>
            ←
        </Sarrowbar>
    </Snav>
  )
}

export default SidebarMain