import React, {useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useDrag, useDrop } from 'react-dnd'
import { useRecoilState } from 'recoil'
import { forceRerender, sidebarChatLi, currentChatSpaceId, sidebarForceRerender } from '../../Atoms/atom'
import axios from 'axios'
import { MdOutlineCancel, MdOutlineEditNote } from 'react-icons/md'
import { webPort } from "../../port";

const Sli = styled.li`
  width : 100%;
  background : ${prop=> prop.isOver?'rgb(185, 250, 170)':'none'};
  :hover{
    background : rgb(245, 255, 200);
    cursor : pointer;
  }
`

const SinputWrap = styled.div`
  width : 100%;
  max-width : 147px;
  background : ${prop=> prop.isOver?'rgb(185, 250, 170)':'none'};
  :hover{
    background : rgb(245, 255, 200);
    cursor : pointer;
  }
`

const Sinput = styled.input`
  width : 100%;
  height : 100%;
`

const SdelButton = styled.button`
  background : rgba(0, 0, 0, 0);
  cursor : pointer;
  border : none;
  :hover{
    background : rgba(0, 0, 0, 0.2);
  }
`

const Sdiv = styled.div`
  display: flex;
  justify-content : flex-start;
`

function SidebarChatLi({index, id}) {

    const [chatLi, setChatLi] = useRecoilState(sidebarChatLi({num : id}));
    const {projectNum} = useParams();
    const [reRender, setReRender] = useRecoilState(forceRerender);
    const [acurrentChatSpaceId, setCurrentChatSpaceId] = useRecoilState(currentChatSpaceId)
    const [asidebarForceRerender, setSidebarForceRerender] = useRecoilState(sidebarForceRerender) 
    const [modify, setModify] = useState(0);   
    const [name, setName] = useState('')

    const [{ isDragging }, dragRef, previewRef] = useDrag(
      () => ({
        type: 'sidebarChatSpaceList',
        item: { index, id },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
        end: (item) => {
          //item.index = 떨어진 놈의 인덱스 index = 집은 놈의 인덱스 id = 집은 놈의 아이디
          axios({
            url: `http://${webPort.express}/changeChatSpaceOrder`,
            method: 'put',
            withCredentials : true,
            data:{
              projectNum: projectNum,
              order : item.index,
              targetOrder : index,
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
      })
    }, [reRender])
    
    const deleteChat = (chatSpaceNum) => {
      axios({
        url: `http://${webPort.express}/delChatSpace`,
        method: 'delete',
        withCredentials: true,
        data: {
          chatSpaceNum: chatSpaceNum,
        }
      }).then((res)=>{
        console.log(res)
        setSidebarForceRerender((prev)=>{if(prev==1){return 0} else return 1})
      })
    };

  return (
    <>
    <Sdiv>
      {modify===0?
      <>
        <Link onClick={()=>{
          setCurrentChatSpaceId(chatLi.chatSpaceNum)
        }} to={`/main/${projectNum}/chat/${chatLi.chatSpaceNum}`} style={{ textDecoration: 'none', color : 'black'}}>
          <Sli isOver={isOver} style={{overflow : 'hidden', width : '135px'}} ref={node => dragRef(drop(node))}>
            -{chatLi.name} 
          </Sli>
        </Link>
        <SdelButton onClick={(e)=>{e.stopPropagation();console.log('gd'); deleteChat(chatLi.chatSpaceNum);}}>
          <MdOutlineCancel style={{cursor : 'pointer'}} /> 
        </SdelButton>
      </>
        :
        <SinputWrap>
          <Sinput value={name} onKeyDown={(e)=>{if(e.key=="Enter"){
            axios({
              url: `http://${webPort.express}/changeChatSpaceName`,
              method: 'put',
              withCredentials: true,
              data: {
                chatSpaceNum : chatLi.chatSpaceNum,
                name : name,
              }
            }).then((res)=>{
              console.log(res)
              setReRender(prev=>prev===0? 1 : 0)
            }).then(()=>{setModify(0);})

          }}} onChange={(e)=>{setName(e.target.value)}} />
          <MdOutlineEditNote onClick={(e)=>{setModify(prev=>prev===0? 1 : 0);e.stopPropagation()}} style={{position : 'absolute', right : '0', cursor : 'pointer'}} />
        </SinputWrap>
      }
      

          <MdOutlineEditNote onClick={(e)=>{setModify(prev=>prev===0? 1 : 0);e.stopPropagation()}} style={{position : 'absolute', right : '0', cursor : 'pointer'}} />
    </Sdiv>
    </>
  )
}

export default SidebarChatLi