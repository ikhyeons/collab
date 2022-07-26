import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useDrag, useDrop } from 'react-dnd'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { sidebarChatLi } from '../../Atoms/atom'

const Sli = styled.li`
  width : 100%;
  background : ${prop=> prop.isOver?'rgb(185, 250, 170)':'none'};
  :hover{
    background : rgb(245, 255, 200);
    cursor : pointer;
  }
`

function SidebarChatLi({index, id, moveFunction}) {

    const [chatLi, setChatLi] = useRecoilState(sidebarChatLi({num : id, name : '전체채팅'}))
    const resetLi = useResetRecoilState(sidebarChatLi({num : id, name : '전체채팅'}));

    useEffect(()=>{resetLi()}, [chatLi]);
        
    const [{ isDragging }, dragRef, previewRef] = useDrag(
      () => ({
        type: 'sidebarChatSpaceList',
        item: { index, id },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
        end: (item) => {
          //item.index = 떨어진 놈의 인덱스 index = 집은 놈의 인덱스 id = 집은 놈의 아이디
          moveFunction(item.index, index);
        },
      })
    )

    const [{isOver}, drop] = useDrop({
      accept: 'sidebarChatSpaceList',
      hover: (item) => {
        if (item.index === index) {
          return null
        }
        //item.index = 집은놈의 인덱스 index = 올라간 놈의 인덱스
        item.index = index;
        console.log(index);
      },
      collect : (monitor)=>({
        isOver : monitor.isOver()
      })
    })

  return (
    <Link to={`/main/chat/${chatLi.num}`} style={{ textDecoration: 'none', color : 'black'}}><Sli isOver={isOver} ref={node => dragRef(drop(node))}>-{id}</Sli></Link>//${i}에서 i는 채팅 번호
  )
}

export default SidebarChatLi