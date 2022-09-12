import React, {useState} from 'react'
import styled from 'styled-components'
import { calendarSelectedDate, calendarModalState, calendarEventData } from '../../Atoms/atom'
import { useRecoilValue, useRecoilState } from 'recoil'
import { useEffect } from 'react'
import axios from 'axios'
import { webPort } from "../../port";

const UpdateEventModal = styled.div`
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
const Stitle = styled.input`
  font-family : none;
  border-radius : 10px;
  font-size : 30px;
  width : 100%;
  height : 10%;
  margin : 5px auto;
  padding : 5px;
  padding-bottom : 8px;
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

const Scontent = styled.textarea`
  font-family : none;
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

function CalendarUpdateEventModal() {

  const [eventSet, setEventSet] = useRecoilState(calendarModalState); // 현재 달력 상태 0 : 기본 / 1 : 이벤트 추가 / 2 : 이벤트 보기 / 3 : 이벤트 수정
  const [eventData, setEventData] = useRecoilState(calendarEventData)
  const [eventTitle, setEventTitle] = useState('');
  const [eventContent, setEventContent] = useState('');

  useEffect(()=>{
    setEventTitle(eventData.title)
    setEventContent(eventData.content)
  }, [])
  const updateEventData = ()=>{
    console.log("gd")
    axios({
      url: `http://${webPort.express}/changeCalendarEvent`, // 통신할 웹문서
      method: 'put', // 통신할 방식
      data : {
        eventNum : eventData.id,
        eventTitle : eventTitle,
        eventContent : eventContent,
      },
      withCredentials : true,
    })
  }
  return (
    <UpdateEventModal>
        <SselectedDate>{eventData.start} ~ {eventData.end}</SselectedDate>
      <Stitle value={eventTitle} onChange={(e)=>{setEventTitle(e.target.value)}} type="text" />
      <Sline/>
      <Scontent value={eventContent} onChange={(e)=>{setEventContent(e.target.value)}} name="" id="" cols="30" rows="10"></Scontent>
      <Sbutton onClick={()=>{
        updateEventData();
        setEventSet(0)
        }}>수정 완료</Sbutton>
      <Sbutton onClick={()=>{setEventSet(0)}}>취소</Sbutton>


    </UpdateEventModal>
  )
}

export default CalendarUpdateEventModal