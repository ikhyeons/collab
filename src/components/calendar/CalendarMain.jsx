import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import CalendarEventWrap from './CalendarEventWrap'
import { calendarModalState, calendarSelectedDate, calendarEvents } from '../../Atoms/atom'
import { useRecoilState } from 'recoil'
import axios from 'axios'



import styled from 'styled-components'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'


//풀캘린더의 크기는 상위 태그의 크기에 맞춰서 변경됨
const FullCalendarWrap = styled.div`
    width : 65%;
    min-width : 750px;
    position : relative;
`

const CalendarMain = () => {

    const [selectedDate, setSelectedDate] = useRecoilState(calendarSelectedDate); //선택된 날짜
    const [event, setEvent] = useRecoilState(calendarEvents); //이벤트들
    const [eventSet, setEventSet] = useRecoilState(calendarModalState); // 현재 달력 상태 0 : 기본 / 1 : 이벤트 추가 / 2 : 이벤트 보기 / 3 : 이벤트 수정
    const {projectNum} = useParams();

    const changeEventDate = (inputDate, addedDate) =>{ // input : 표준시 상태의 입력, 추가할 날자(정수) / output : YYYY-MM-DD
        let date = new Date(inputDate)
        date = new Date(date.setDate(date.getDate() + addedDate));
        let year = date.getFullYear();
        let month = ("0" + (1 + date.getMonth())).slice(-2);
        let day = ("0" + date.getDate()).slice(-2);
    
        return year + "-" + month + "-" + day;
    }

    useEffect(()=>{
        console.log("gd");
        axios({
            url: `http://localhost:1004/readEventList/${projectNum}`, // 통신할 웹문서
            method: 'get', // 통신할 방식
            withCredentials : true,
          }).then(res=>{
            let newArray = [];
            res.data.data.map((data)=>(
                newArray.push({
                    id : data.eventNum, 
                    title : data.eventTitle, 
                    content : data.eventContent, 
                    start : data.startDate ,
                    end : data.endDate,
                })
            ))
            setEvent(newArray);
        })
    }, [eventSet])

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
            console.log(info);
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
    {eventSet !== 0? <CalendarEventWrap setEventSet = {setEventSet} /> : null} {/*이벤트셋이 1이아니면 생성*/}
    </FullCalendarWrap>
  )
}

export default CalendarMain