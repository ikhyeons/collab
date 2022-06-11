import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import CalendarEventWrap from './CalendarEventWrap'


import styled from 'styled-components'
import { useState, useEffect } from 'react'


//풀캘린더의 크기는 상위 태그의 크기에 맞춰서 변경됨
const FullCalendarWrap = styled.div`
    width : 55%;
    min-width : 750px;
    position : relative;
`

const SaddEventBtn = styled.button`
    background : skyblue;
    font-size : 25px;
    padding : 3px 9px;
    margin : 7px;
    cursor : pointer;
    border : 2px solid rgb(200, 200, 200);
    border-radius : 10px;
    :hover{
        background : rgb(150, 150, 200);
        color : skyblue;
    }
`

const CalendarMain = () => {

    const [event, setEvent] = useState([{id : 1, title : 'hi', start : '2022-06-04', end : '2022-06-10'}]); //이벤트들
    const [selectedDate, setSelectedDate] = useState({start : '', end : ''});

    const [eventSet, setEventSet] = useState(0); // 0 : 기본 / 1 : 추가 / 2 : 보기 / 3 : 수정



    useEffect(()=>{
        console.log(selectedDate);
    }, [selectedDate])

  return (
    <FullCalendarWrap>
        <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]} //달력모양 및 상호작용 플러그인
        editable ='true' // 이벤트 수정 허용
        selectable = 'true' // 클릭 및 드래그 허용
        locale = 'ko' // 한국어 설정

        dateClick={(info)=>{
            setEventSet(1);
        }}

        select = {(info)=>{ //날자 드래그 이벤트 핸들러
            setSelectedDate({start : info.startStr, end : info.endStr})
            setEventSet(1);
        }}

        eventClick = {(info)=>{ //이벤트 클릭 핸들러
            setEventSet(2);
        }}

        eventDragStart = {(info)=>{ // 이벤트 드래그 시작 핸들러
            console.log(info);
        }}

        eventDragStop = {(info)=>{ // 이벤트 드래그 종료 핸들러
            console.log(info);
        }}

        
        events = {event}

        ></FullCalendar>
    {eventSet !== 0? <CalendarEventWrap selectedDate={selectedDate} setEvent={setEvent} eventSet = {eventSet} setEventSet = {setEventSet} /> : null}
    </FullCalendarWrap>
  )
}

export default CalendarMain