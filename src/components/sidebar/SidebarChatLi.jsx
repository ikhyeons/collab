import React, {useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useDrag, useDrop } from 'react-dnd'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { sidebarChatLi } from '../../Atoms/atom'
import axios from 'axios'

const Sli = styled.li`
  width : 100%;
  background : ${prop=> prop.isOver?'rgb(185, 250, 170)':'none'};
  :hover{
    background : rgb(245, 255, 200);
    cursor : pointer;
  }
`

function SidebarChatLi({index, id, moveFunction}) {

    const [chatLi, setChatLi] = useRecoilState(sidebarChatLi({num : id}))
    const {projectNum} = useParams()
        
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
      },
      collect : (monitor)=>({
        isOver : monitor.isOver()
      })
    })
    useEffect(()=>{
      axios({
        url: `http://localhost:1004/readChatSpaceInfo/${id}`, // 통신할 웹문서
        method: 'get', // 통신할 방식
        withCredentials : true,
      }).then((res)=>{
        setChatLi({...res.data.data, name : res.data.data.spaceTitle});
      })
    }, [])
    

  return (
    <Link to={`/main/${projectNum}/chat/${chatLi.chatSpaceNum}`} style={{ textDecoration: 'none', color : 'black'}}><Sli isOver={isOver} ref={node => dragRef(drop(node))}>-{chatLi.name}</Sli></Link>//${i}에서 i는 채팅 번호
  )
}

export default SidebarChatLi