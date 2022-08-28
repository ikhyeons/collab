import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import { useRecoilState } from 'recoil'

import {sidebarChat} from '../../Atoms/atom'
import SidebarChatLi from './SidebarChatLi'
import { useParams } from 'react-router-dom'
import axios from 'axios'

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

  const addChat = () => {
    console.log(projectNum);
    axios({
      url: `http://localhost:1004/createChatSpace`,
      method: 'post',
      withCredentials : true,
      data:{
        projectNum: projectNum,
      }
    }).then((res)=>{
      window.location.reload(); // 클릭시 바로 적용이 안되서 일단 새로고침 추가      -- 추후 변경해야함 --
      console.log(res);})
  }

  const accordion = ()=>{ //클릭했을 경우 숨겨져 있으면 보이게하고, 보이는 상태이면 숨기게함.
    if (hidden === 0 ) setHidden(1)
    else setHidden(0)
  }

  const moveFunction = (targetIndex, sourceIndex)=> {
    setChatList((prev)=>{
      let newArray = [...prev];
      let innerData = newArray[sourceIndex];
      console.log(`input data is ${innerData}`)
      newArray.splice(sourceIndex, 1);
      newArray.splice(targetIndex, 0, innerData);
      console.log(newArray);
      return newArray
    })
  }

  return (
    <div>
        <Stitle onClick={()=>{accordion()}}>채팅</Stitle>
        <Sul hidden = {hidden}>
        {chatList.map((data, i)=>{
            return <SidebarChatLi moveFunction={moveFunction} index= {i} id={data} key={i} num={data} />
          })}
          <SaddBtn onClick={()=>{addChat()}}>+</SaddBtn>
        </Sul>
    </div>
  )
}

export default SidebarChat