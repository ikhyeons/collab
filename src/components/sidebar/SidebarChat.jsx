import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { useRecoilState } from 'recoil'

import {sidebarChat} from '../../Atoms/atom'
import SidebarChatLi from './SidebarChatLi'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { sidebarForceRerender } from '../../Atoms/atom'
import { webPort } from "../../port";

const Stitle = styled.div`
  
  padding-left : 10px;
  :hover{
    background : yellow;
    cursor : pointer;
  }
`

const Sul = styled.ul`
  list-style : none;  
  margin-left : 30px;
  font-size : 23px;
  display : ${prop => prop.hidden === 1? 'none':'block'}
`

const SaddBtn = styled.li`
  width : 100%;
  :hover{
    background : yellow;
    cursor : pointer;
  }
`

const SidebarChat = () => {
  
  //숨김처리를 위한 변수
  const [hidden, setHidden] = useState(0);
  //채팅 리스트
  const [chatList, setChatList] = useRecoilState(sidebarChat)
  const {projectNum} = useParams();
  const [asidebarForceRerender, setSidebarForceRerender] = useRecoilState(sidebarForceRerender)  

  useEffect(()=>{
    axios({
      url: `http://${webPort.express}/readChatSpaceList/${projectNum}`, // 통신할 웹문서
      method: 'get', // 통신할 방식
      withCredentials : true,
    }).then((res)=>{
      let newList = []
      res.data.data.map((data, i)=>{newList.push({ chatSpaceNum : data.chatSpaceNum, sequent : data.sequent})})
      setChatList(newList);
    })
  }, [asidebarForceRerender]);

  const addChat = () => {
    console.log(projectNum);
    axios({
      url: `http://${webPort.express}/createChatSpace`,
      method: 'post',
      withCredentials: true,
      data: {
        projectNum: projectNum,
      }
    }).then((res)=>{
      setSidebarForceRerender((prev)=>{if(prev==1){return 0} else return 1})
      console.log(res);
    })
  }

  const accordion = ()=>{ //클릭했을 경우 숨겨져 있으면 보이게하고, 보이는 상태이면 숨기게함.
    if (hidden === 0 ) setHidden(1)
    else setHidden(0)
  }

  return (
    <div>
        <Stitle onClick={()=>{accordion()}}>채팅</Stitle>
        <Sul hidden = {hidden}>
        {chatList.map((data, i)=>{
            return <SidebarChatLi index= {data.sequent} id={data.chatSpaceNum} key={i} num={data.chatSpaceNum} />
          })}
          <SaddBtn onClick={()=>{addChat()}}>+</SaddBtn>
        </Sul>
    </div>
  )
}

export default SidebarChat