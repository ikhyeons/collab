import React from 'react'
import styled from'styled-components'
import { useRecoilState, useRecoilValue } from 'recoil'
import { chatParticipant, currentChatSpaceId } from '../../Atoms/atom'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { webPort } from "../../port";

const Sparticipant = styled.div`
    width: 15%;
    border: 1px solid grey;
`

const Suser = styled.div`

`

const SParticipant = styled.div`
    position : relative;
    padding :1px;
    margin : 1px;
    border : 2px solid purple;
    border-radius : 10px;
    background : rgb(205, 0, 205);
    width : 100px;
    color : white;
    cursor : pointer;
    font-size : 20px;
    
    :hover{
        background : rgb(235, 0, 235);
    }
`

const SuserTitle = styled.h4`
`
const Sspan = styled.div`
font-weight : bold;
  font-size : 20px;
`

const Sform = styled.div`
  font-size : 20px;
  background : white;
  margin-left : 3px;
  border : 1px solid gray;
  height : 41px;
  width : 320px;
  border-radius : 17px;
`

const Sinput = styled.input`
  padding : 5px;
  font-size : 20px;
  border : none;
  border-radius : 15px;
`

const Sbutton = styled.button`
  font-size : 20px;
  padding : 3px;
  border : 1px solid gray;
  border-radius : 15px;
  transform : translate(8px, 2px);
`
const SObutton = styled.button`
    position : absolute;
    bottom : 40px;
    padding : 5px;
`

function ChatUser() {
  const {chatSpaceNum, projectNum} = useParams()
  const [chatParticipants, setChatParticipants] = useRecoilState(chatParticipant)
  const [userEmail, setUserEmail] = useState('')
  const [acurrentChatSpaceId, setCurrentChatSpaceId] = useRecoilState(currentChatSpaceId)
  const [rerender, setRerender] = useState(0);

  useEffect(()=>{
    axios({
      url: `http://${webPort.express}/readChatParticipant/${chatSpaceNum}`, // 통신할 웹문서
      method: 'get', // 통신할 방식
      withCredentials : true,
    }).then((res)=>{setChatParticipants(res.data.data)})
  }, [acurrentChatSpaceId, rerender])
  return (
    <Sparticipant>
      <Sspan>초대 보내기</Sspan> 
      <Sform>
        <Sinput type="text" value={userEmail} onChange={(e)=>{setUserEmail(e.target.value)}}/> 
        <Sbutton onClick={()=>{
          axios({
            url: `http://${webPort.express}/createChatParticipant`, // 통신할 웹문서
            method: 'post', // 통신할 방식
            data : {
              chatSpaceNum : chatSpaceNum,
              userEmail : userEmail,
              projectNum : projectNum,
            },
            withCredentials : true,
          }).then((res)=>{
            if(res.data.success === 0){
              setRerender(prev=>prev===0? 1:0)
              setUserEmail('')
            } else if (res.data.success === 1){alert("프로젝트에 없는 사람입니다.")} else if(res.data.success === 2){setUserEmail(''); alert("이미 가입된 사람입니다.")}
          })
        }}>전송</Sbutton>
      </Sform>
        <SuserTitle>참여자 목록</SuserTitle>
        <Suser>
            {chatParticipants.map((data, i)=>{
              return <SParticipant key={i}>@{data.nickName}</SParticipant>
            })}
        </Suser>
        <SObutton onClick={()=>{
          axios({
            url: `http://${webPort.express}/delChatParticipant`, // 통신할 웹문서
            method: 'delete', // 통신할 방식
            data : {
              chatSpaceNum : chatSpaceNum,
            },
            withCredentials : true,
          }).then(()=>{
            window.location.replace(`/main/${projectNum}/calendar`)
          })
        }}>이탈하기</SObutton>
    </Sparticipant>
  )
}

export default ChatUser