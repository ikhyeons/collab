import React, {useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useDrag, useDrop } from 'react-dnd'
import { useRecoilState } from 'recoil'
import { forceRerender, sidebarChatLi, currentChatSpaceId, sidebarForceRerender } from '../../Atoms/atom'
import axios from 'axios'
import { MdOutlineCancel } from 'react-icons/md'
import { webPort } from "../../port";

const Sli = styled.li`
  width : 100%;
  background : ${prop=> prop.isOver?'rgb(185, 250, 170)':'none'};
  :hover{
    background : rgb(245, 255, 200);
    cursor : pointer;
  }
`

const SdelButton = styled.button`
`

const Sdiv = styled.div`
  display: flex;
  justify-content : flex-start;
`

function SidebarChatLi({index, id, moveFunction}) {

    const [chatLi, setChatLi] = useRecoilState(sidebarChatLi({num : id}));
    const {projectNum} = useParams();
    const [reRender, setReRender] = useRecoilState(forceRerender);
    const [acurrentChatSpaceId, setCurrentChatSpaceId] = useRecoilState(currentChatSpaceId)
    const [asidebarForceRerender, setSidebarForceRerender] = useRecoilState(sidebarForceRerender)    
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
          axios({
            url: `http://${webPort.express}/changeChatSpaceOrder`,
            method: 'put',
            withCredentials : true,
            data:{
              projectNum: projectNum,
              order : item.index+1,
              targetOrder : index+1,
            }
          }).then(()=>{setSidebarForceRerender((prev)=>{if(prev==1){return 0} else return 1})})
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
        url: `http://${webPort.express}/readChatSpaceInfo/${id}`, // 통신할 웹문서
        method: 'get', // 통신할 방식
        withCredentials : true,
      }).then((res)=>{
        setChatLi({...res.data.data, name : res.data.data.spaceTitle});
        console.log(chatLi);
      })
    }, [reRender])
    
    const deleteChat = (chatSpaceNum) => {
      console.log(chatLi);
      axios({
        url: `http://${webPort.express}/delChatSpace`,
        method: 'delete',
        withCredentials: true,
        data: {
          chatSpaceNum: chatSpaceNum,
        }
      }).then((res)=>{
        console.log(res);
        setReRender((prev)=>{if(prev==1){return 0} else return 1});
      })
    };

  return (
    <>
    <Sdiv>
      <Link onClick={()=>{
        setCurrentChatSpaceId(chatLi.chatSpaceNum)
      }} to={`/main/${projectNum}/chat/${chatLi.chatSpaceNum}`} style={{ textDecoration: 'none', color : 'black'}}>
        <Sli isOver={isOver} ref={node => dragRef(drop(node))}>
          -{chatLi.name} 
        </Sli>
      </Link>
      <SdelButton onClick={()=>{deleteChat(chatLi.chatSpaceNum)}}>
        <MdOutlineCancel /> 
      </SdelButton>
    </Sdiv>
    </>
  )
}

export default SidebarChatLi