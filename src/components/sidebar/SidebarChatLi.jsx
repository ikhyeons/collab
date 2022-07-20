import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useRecoilState } from 'recoil'
import { sidebarChatLi } from '../../Atoms/atom'

const Sli = styled.li`
  width : 100%;
  :hover{
    background : yellow;
    cursor : pointer;
  }
`

function SidebarChatLi({num}) {

    const [chatLi, setChatLi] = useRecoilState(sidebarChatLi({num : num, name : '전체채팅'}))
        
  return (
    <Link to={`/main/chat/${chatLi.num}`} style={{ textDecoration: 'none', color : 'black'}}><Sli>{chatLi.name}</Sli></Link>//${i}에서 i는 채팅 번호
  )
}

export default SidebarChatLi