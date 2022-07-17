import React from 'react'
import styled from'styled-components'
import { useRecoilState, useRecoilValue } from 'recoil'
import { chatParticipant } from '../../Atoms/atom'

const Sparticipant = styled.div`
    width: 15%;
    border: 1px solid grey;
`

const Suser = styled.div`

`

const SParticipant = styled.div`
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
function ChatUser() {

  const chatParticipants = useRecoilValue(chatParticipant)

  return (
    <Sparticipant>
        <SuserTitle>참여자 목록</SuserTitle>
        <Suser>
            {chatParticipants.map((data, i)=>{
              return <SParticipant key={i}>@{data}</SParticipant>
            })}
        </Suser>
    </Sparticipant>
  )
}

export default ChatUser