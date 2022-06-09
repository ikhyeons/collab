import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import CalendarViewModal from './CalendarViewModal'
import CalendarAddModal from './CalendarAddModal'

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
    //선택한 날자 데이터
    const [selectedDate, setSelectedDate] = useState({start : null, end : null})
    //이벤트 들
    const [events, setEvents] = useState([{title : 'event1', start : '2022-06-22', end : '2022-06-25', color : 'gray'},{title : 'event2', start : '2022-06-22', end : '2022-06-27'}]);
    //이벤트 정보 모달창 온오프
    const [modalview, setModalview] = useState(false);
    //이벤트 추가 모달창 온오프
    const [modaladd, setModalAdd] = useState(false);
    //마우스 위치 이벤트 추가 버튼

    useEffect(()=>{ //날자가 선택될 때 마다 실행, 시작일이 끝일보다 뒤일 경우 둘의 자리를 바꿈
        if (selectedDate.start - selectedDate.end>0 && selectedDate.end!=null){
            setSelectedDate({start : selectedDate.end, end : selectedDate.start})
        }
        console.log(selectedDate);
    }, [selectedDate])

  return (
    <FullCalendarWrap 
    onMouseDown={(e)=>{ // 날자에서 마우스가 내려갔을 경우 실행됨
        if(e.target.classList[0] == 'fc-daygrid-day-frame') { //div가 섞여 있어서 -frame의 div를 클릭했을 때 이벤트 발생
            let rawDate = e.target.children[0].children[0].getAttribute('aria-label') // 해당 날자의 데이터 스트링을 얻음
            let makedData = new Date(rawDate.slice(0, 4), rawDate.slice(6, 7)+1, rawDate.slice(9, -1)); // 얻은 날자 데이터를 사용 가능하게 가공
            setSelectedDate(prev => { // state에 업데이트 함
                let dateSet = {
                    ...prev,
                    start : makedData
                }
                return dateSet;
            });
        }

        if(e.target.classList[0] == 'fc-daygrid-day-events') { //div가 섞여 있어서 -events의 div를 클릭했을 경우 발생
            let rawDate = e.target.parentNode.children[0].children[0].getAttribute('aria-label') // 해당 날자의 데이터 스트링을 얻음
            let makedData = new Date(rawDate.slice(0, 4), rawDate.slice(6, 7)-1, rawDate.slice(9, -1)); // 얻은 날자 데이터를 사용 가능하게 가공
            setSelectedDate(prev => { // state에 업데이트 함
                let dateSet = {
                    ...prev,
                    start : makedData
                }
                return dateSet;
            });
        }
        
    }}
    onMouseUp={(e)=>{ // 날자에서 마우스가 올라갔을 때 실행 됨
        if(e.target.classList[0] == 'fc-daygrid-day-frame') { 
            let rawDate = e.target.children[0].children[0].getAttribute('aria-label')
            let makedData = new Date(rawDate.slice(0, 4), rawDate.slice(6, 7)-1, rawDate.slice(9, -1));
            setSelectedDate(prev => {
                let dateSet = {
                    ...prev,
                    end : makedData
                }
                return dateSet;
            })
        }

        if(e.target.classList[0] == 'fc-daygrid-day-events') {
            let rawDate = e.target.parentNode.children[0].children[0].getAttribute('aria-label')
            let makedData = new Date(rawDate.slice(0, 4), rawDate.slice(6, 7)-1, rawDate.slice(9, -1));
            setSelectedDate(prev => {
                let dateSet = {
                    ...prev,
                    end : makedData
                }
                return dateSet;
            })
        } 
    }}
    >
        <FullCalendar 
        plugins={[dayGridPlugin, interactionPlugin]}
        selectable = "true" // 클릭 및 드래그 허용
        locale="ko" // 한국어 설정
        events={events} // 들어가 있는 이벤트들
        eventClick={()=>{setModalview(true)}} // 이벤트를 클릭했을 경우 실행되는 함수
        ></FullCalendar>
        <SaddEventBtn onClick={()=>{setModalAdd(true)}}>이벤트 추가</SaddEventBtn>
        {modaladd&&<CalendarAddModal view={setModalAdd} />} {/* 이벤트 추가창을 엶 */}
        {modalview&&<CalendarViewModal view={setModalview} />} {/* 이벤트 정보창을 엶 */}
    </FullCalendarWrap>
  )
}

export default CalendarMain