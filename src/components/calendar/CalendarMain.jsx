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

const CalendarMain = () => {

    const [selectedDate, setSelectedDate] = useState({start : '', end : ''}); //선택된 날짜
    const [event, setEvent] = useState([{id : 1, title : 'hi', start : '2022-06-04', end : '2022-06-10'}]); //이벤트들
    const [eventSet, setEventSet] = useState(0); // 현재 달력 상태 0 : 기본 / 1 : 이벤트 추가 / 2 : 이벤트 보기 / 3 : 이벤트 수정

    const changeEventDate = (inputDate, addedDate) =>{ // input : 표준시 상태의 입력, 추가할 날자(정수) / output : YYYY-MM-DD
        let date = new Date(inputDate)
        date = new Date(date.setDate(date.getDate() + addedDate));
        let year = date.getFullYear();
        let month = ("0" + (1 + date.getMonth())).slice(-2);
        let day = ("0" + date.getDate()).slice(-2);
    
        return year + "-" + month + "-" + day;
    }

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
        events = {event} // 이벤트들

        dateClick={()=>{
            setEventSet(1);
        }}

        select = {(info)=>{ //날자 드래그 이벤트 핸들러
            setSelectedDate({start : info.startStr, end : info.endStr})
            setEventSet(1);
        }}

        eventClick = {(info)=>{ //이벤트 클릭 핸들러
            setEventSet(2);
        }}

        eventDrop = {(info)=>{ // 이벤트 드래그 핸들러, 이벤트가 끝났을 때 변경 날자만큼 데이터를 이동시킴.
            let changeStart = changeEventDate(info.oldEvent._instance.range.start, info.delta.days);
            let changeEnd = changeEventDate(info.oldEvent._instance.range.end, info.delta.days);
            console.log(changeStart, changeEnd);
        }}

        eventResize = {(info)=>{ //이벤트 기간 확장 및 축소 리사이징
            let changeEnd = changeEventDate(info.oldEvent._instance.range.end, info.endDelta.days);
            console.log(changeEnd);
        }}

        ></FullCalendar>
    {eventSet !== 0? <CalendarEventWrap selectedDate={selectedDate} setEvent={setEvent} eventSet = {eventSet} setEventSet = {setEventSet} /> : null} {/*이벤트셋이 1이아니면 생성*/}
    </FullCalendarWrap>
  )
}

export default CalendarMain