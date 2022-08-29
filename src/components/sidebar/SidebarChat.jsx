import React, {useState, useEffect} from 'react'
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
  useEffect(()=>{
    axios({
      url: `http://localhost:1004/readChatSpaceList/${projectNum}`, // 통신할 웹문서
      method: 'get', // 통신할 방식
      withCredentials : true,
    }).then((res)=>{
      let NewArray = res.data.data.map((data, i)=>data.chatSpaceNum)
      setChatList(NewArray);
      console.log(chatList);
    })
  }, []);
  const addChat = () => { //채팅 리스트 추가하는 함수
    setChatList((prev)=>{let newList = [...prev, prev.length,]; return newList;})
    // addchat 부분 머지하면서 날아가서 다시 해야합니다 ~~ 
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