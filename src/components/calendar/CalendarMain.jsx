import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import CalendarEventWrap from './CalendarEventWrap'
import { calendarModalState, calendarSelectedDate, calendarEvents, calendarEventData } from '../../Atoms/atom'
import { useRecoilState } from 'recoil'
import axios from 'axios'
import { webPort } from "../../port";


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
    const [calendarData, setCalendarData] = useRecoilState(calendarEventData)

    const changeEventDate = (inputDate, addedDate) =>{ // input : 표준시 상태의 입력, 추가할 날자(정수) / output : YYYY-MM-DD
        let date = new Date(inputDate)
        date = new Date(date.setDate(date.getDate() + addedDate));
        let year = date.getFullYear();
        let month = ("0" + (1 + date.getMonth())).slice(-2);
        let day = ("0" + date.getDate()).slice(-2);
    
        return year + "-" + month + "-" + day;
    }

    useEffect(()=>{
        axios({
            url: `http://${webPort.express}/readEventList/${projectNum}`, // 통신할 웹문서
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

    const getCalendarEventData = (eventNum)=>{
        axios({
            url: `http://${webPort.express}/readEventInfo/${eventNum}`, // 통신할 웹문서
            method: 'get', // 통신할 방식
            withCredentials : true,
          }).then((res)=>{setCalendarData({
            id : res.data.data.eventNum,
            title : res.data.data.eventTitle,
            content : res.data.data.eventContent,
            start : res.data.data.startDate,
            end : res.data.data.endDate
            }
        )})
    }

    const updateEventDate = (id, start, end)=>{
        //startDate가 ''이면 확장/축소, ''이 아니면 이동
        axios({
            url: `http://${webPort.express}/changeCalendarEventDate`, // 통신할 웹문서
            method: 'put', // 통신할 방식
            withCredentials : true,
            data : {
                eventNum : id,
                startDate : start,
                endDate : end,
            }
          })
    }

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
            getCalendarEventData(info.event._def.publicId)
            setEventSet(2);
        }}

        eventDrop = {(info)=>{ // 이벤트 드래그 핸들러, 이벤트가 끝났을 때 변경 날자만큼 데이터를 이동시킴.
            let changeStart = changeEventDate(info.oldEvent._instance.range.start, info.delta.days);
            let changeEnd = changeEventDate(info.oldEvent._instance.range.end, info.delta.days);
            updateEventDate(info.event._def.publicId, changeStart, changeEnd)
        }}

        eventResize = {(info)=>{ //이벤트 기간 확장 및 축소 리사이징
            let changeEnd = changeEventDate(info.oldEvent._instance.range.end, info.endDelta.days);
            updateEventDate(info.event._def.publicId, '', changeEnd)
        }}

        ></FullCalendar>
    {eventSet !== 0? <CalendarEventWrap setEventSet = {setEventSet} /> : null} {/*이벤트셋이 1이아니면 생성*/}
    </FullCalendarWrap>
  )
}

export default CalendarMain