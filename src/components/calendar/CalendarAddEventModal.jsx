import React, {useState} from 'react'
import styled from 'styled-components'
import { calendarSelectedDate, calendarEvents, calendarModalState } from '../../Atoms/atom'
import { useRecoilValue, useRecoilState } from 'recoil'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import { webPort } from "../../port";

const AddEventModal = styled.div`
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

const Scontent = styled.textarea`
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

function CalendarAddEventModal() {

  const selectedDate = useRecoilValue(calendarSelectedDate);
  const [event, setEvent] = useRecoilState(calendarEvents);
  const [eventSet, setEventSet] = useRecoilState(calendarModalState);
  const {projectNum} = useParams();
  const [eventTitle, setEventTitle] = useState('');
  const [eventContent, setEventContent] = useState('');

  const addEvent = ()=>{
    if(eventTitle === ''){
      alert('제목은 필수로 입력해야 합니다.')
    } else {
      axios({
        url: `http://${webPort.express}/createCalendarEvent`, // 통신할 웹문서
        method: 'post', // 통신할 방식
        withCredentials : true,
        data : {
          projectNum : projectNum,
          startDate : selectedDate.start,
          endDate : selectedDate.end,
          eventTitle : eventTitle,
          eventContent : eventContent,
        }
      }).then(()=>{setEventSet(0)})
    }
  }

  return (
    <AddEventModal>
      <SselectedDate>{selectedDate.start} ~ {selectedDate.end}</SselectedDate>
      <Stitle value={eventTitle} onChange={(e)=>{setEventTitle(e.target.value)}} placeholder='제목을 입력하세요' type="text" />
      <Sline/>
      <Scontent value={eventContent} onChange={(e)=>{setEventContent(e.target.value)}} name="" id="" cols="30" rows="10"></Scontent>
      <Sbutton onClick={()=>{addEvent()}}>추가</Sbutton>
      <Sbutton onClick={()=>{setEventSet(0)}}>취소</Sbutton>
    </AddEventModal>
  )
}

export default CalendarAddEventModal