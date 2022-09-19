import React from 'react'
import styled from 'styled-components'

import { calendarEventData, calendarModalState } from '../../Atoms/atom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useEffect } from 'react'
import axios from 'axios'
import { webPort } from "../../port";

const EventViewModal = styled.div`
  width : 35vw;
  min-width : 530px;
  height : 60vh;
  min-height : 400px;
  background : rgba(250, 250, 250, 0.95);
  position : absolute;
  left : 32vw;
  top : 10vh;
  z-index : 2;
  padding : 15px;
  border-radius : 15px;
`

const SselectedDate = styled.div`
  font-size : 37px;
  width : 100%;
  height : 10%;
`
const Stitle = styled.div`
  border-radius : 10px;
  font-size : 30px;
  width : 100%;
  height : 10%;
  margin : 5px auto;
  padding : 5px;
  background : none;
  border : none;
  :hover{
    background : rgba(240, 240, 240, 1);
  }
  :focus{
    border : 1px solid rgba(223, 223, 223, 1);
    background : rgba(230, 230, 230, 1);
  }
`

const Scontent = styled.div`
  border-radius : 10px;
  font-size : 27px;
  width : 100%;
  height : 65%;
  margin : 5px auto;
  padding : 5px;
  background : none;
  border : none;
  resize: none;
  :hover{
    background : rgba(240, 240, 240, 1);
  }
  :focus{
    border : 1px solid rgba(223, 223, 223, 1);
    background : rgba(230, 230, 230, 1);
  }
`

const Sbutton = styled.button`
  width : 150px;
  height : 10%;
  margin : 5px;
  font-size : 20px;
  border-radius : 10px;
  cursor : pointer;
  :hover{
    background : rgba(240, 240, 240, 1);
  }
  :active{
    border : 1px solid rgba(223, 223, 223, 1);
    background : rgba(230, 230, 230, 1);
  }
`
const Sline = styled.div`
  width : 100%;
  border : 1px solid black;
`

function CalendarViewEventModal() {
  
  const [eventData, setEventData] = useRecoilState(calendarEventData);
  const [eventSet, setEventSet] = useRecoilState(calendarModalState); // 현재 달력 상태 0 : 기본 / 1 : 이벤트 추가 / 2 : 이벤트 보기 / 3 : 이벤트 수정

  const delEvent = ( ) => {
    console.log(eventData.id);
    axios({
      url: `http://${webPort.express}/delEvent`, // 통신할 웹문서
      method: 'delete', // 통신할 방식
      data : {
        eventNum : eventData.id,
      },
      withCredentials : true,
    }).then(()=>{setEventData((prev)=>({...prev}))}).then(()=>{setEventSet(0);});
  }
  return (
    <EventViewModal>
      <SselectedDate>{eventData.start} ~ {eventData.end}</SselectedDate>
      <Stitle>{eventData.title}</Stitle>
      <Sline/>
      <Scontent>{eventData.content}</Scontent>
      <Sbutton
        onClick={()=>{setEventSet(3)}}>수정</Sbutton> {/*수정 페이지로 넘어감*/}

      <Sbutton
        onClick={()=>{ delEvent();}}>삭제</Sbutton> {/*아이디 값을 받아서 삭제*/}

      <Sbutton onClick={()=>{setEventSet(0)}}>취소</Sbutton> {/*모달을 닫음*/}


    </EventViewModal>
  )
}

export default CalendarViewEventModal