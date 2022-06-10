import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import CalendarViewModal from './CalendarViewModal'
import CalendarAddModal from './CalendarAddModal'

import styled from 'styled-components'
import { useState } from 'react'


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
    const [selectedDate, setSelectedDate] = useState({start : null, end : null, cleanStart : null, cleanEnd : null})
    //이벤트 들
    const [events, setEvents] = useState([]);
    //이벤트 저장소
    const [eventsBox, setEventsBox] = useState([])
    //이벤트 정보 모달창 온오프
    const [modalview, setModalview] = useState(false);
    //이벤트 추가 모달창 온오프
    const [modaladd, setModalAdd] = useState(false);
    //마우스 위치 이벤트 추가 버튼

  return (
    <FullCalendarWrap 

    onMouseDown={(e)=>{ // 날자에서 마우스가 내려갔을 경우 실행됨
        console.log(eventsBox)
        if(e.target.classList[0] == 'fc-daygrid-day-frame') { //div가 섞여 있어서 -frame의 div를 클릭했을 때 이벤트 발생
            //이벤트 창 제거
            setEventsBox(events);
            setEvents([]);
            let cleanDate = e.target.children[0].children[0].getAttribute('aria-label') // 해당 날자의 데이터 스트링을 얻음
            let makedData = new Date(cleanDate.slice(0, 4), cleanDate.split('년')[1].split('월')[0]-1, cleanDate.slice(9, -1)); // 얻은 날자 데이터를 사용 가능하게 가공
            let cleanMonth = cleanDate.split('년')[1].split('월')[0].trim().length==1?'0'+cleanDate.split('년')[1].split('월')[0].trim() : cleanDate.split('년')[1].split('월')[0].trim();
            let cleanDay = cleanDate.slice(9, -1).trim().length==1? "0"+cleanDate.slice(9, -1).trim() : cleanDate.slice(9, -1).trim();
            let makedcleanData = `${cleanDate.slice(0, 4)}-${cleanMonth}-${cleanDay}`; // 얻은 날자 데이터를 사용 가능하게 가공
            setSelectedDate(prev => { // state에 업데이트 함
                let dateSet = {
                    ...prev,
                    start : makedData,
                    cleanStart : makedcleanData,
                }
                return dateSet;
            });
        }

        if(e.target.classList[0] == 'fc-daygrid-day-events') { //div가 섞여 있어서 -events의 div를 클릭했을 경우 발생
            //이벤트 창 제거
            setEventsBox(events);
            setEvents([]);
            let cleanDate = e.target.parentNode.children[0].children[0].getAttribute('aria-label') // 해당 날자의 데이터 스트링을 얻음
            let makedData = new Date(cleanDate.slice(0, 4), cleanDate.split('년')[1].split('월')[0]-1, cleanDate.slice(9, -1)); // 얻은 날자 데이터를 사용 가능하게 가공
            let cleanMonth = cleanDate.split('년')[1].split('월')[0].trim().length==1?'0'+cleanDate.split('년')[1].split('월')[0].trim() : cleanDate.split('년')[1].split('월')[0].trim();
            let cleanDay = cleanDate.slice(9, -1).trim().length==1? "0"+cleanDate.slice(9, -1).trim() : cleanDate.slice(9, -1).trim();
            let makedcleanData = `${cleanDate.slice(0, 4)}-${cleanMonth}-${cleanDay}`; // 얻은 날자 데이터를 사용 가능하게 가공
            setSelectedDate(prev => { // state에 업데이트 함
                let dateSet = {
                    ...prev,
                    start : makedData,
                    cleanStart : makedcleanData,
                }
                console.log(dateSet);
                return dateSet;
            });
        }
        
    }}
    onMouseUp={(e)=>{ // 날자에서 마우스가 올라갔을 때 실행 됨
        //이벤트 되돌리기
        console.log(eventsBox)
        if(e.target.classList[0] == 'fc-daygrid-day-frame') { 
            setEvents(()=>{
                return eventsBox;
            });
            let cleanDate = e.target.children[0].children[0].getAttribute('aria-label')
            let makedData = new Date(cleanDate.slice(0, 4), cleanDate.split('년')[1].split('월')[0]-1, cleanDate.slice(9, -1));
            let cleanMonth = cleanDate.split('년')[1].split('월')[0].trim().length==1?'0'+cleanDate.split('년')[1].split('월')[0].trim() : cleanDate.split('년')[1].split('월')[0].trim();
            let cleanDay = cleanDate.slice(9, -1).trim().length==1? "0"+cleanDate.slice(9, -1).trim() : cleanDate.slice(9, -1).trim();
            let makedcleanData = `${cleanDate.slice(0, 4)}-${cleanMonth}-${cleanDay}`; // 얻은 날자 데이터를 사용 가능하게 가공
            setSelectedDate(prev => {
                let dateSet = {
                    ...prev,
                    end : makedData,
                    cleanEnd : makedcleanData,
                }
                console.log(dateSet);
                return dateSet;
            })
        }

        if(e.target.classList[0] == 'fc-daygrid-day-events') {
            setEvents(()=>{
                return eventsBox;
            });
            let cleanDate = e.target.parentNode.children[0].children[0].getAttribute('aria-label')
            let makedData = new Date(cleanDate.slice(0, 4), cleanDate.split('년')[1].split('월')[0]-1, cleanDate.slice(9, -1));
            let cleanMonth = cleanDate.split('년')[1].split('월')[0].trim().length==1?'0'+cleanDate.split('년')[1].split('월')[0].trim() : cleanDate.split('년')[1].split('월')[0].trim();
            let cleanDay = cleanDate.slice(9, -1).trim().length==1? "0"+cleanDate.slice(9, -1).trim() : cleanDate.slice(9, -1).trim();
            let makedcleanData = `${cleanDate.slice(0, 4)}-${cleanMonth}-${cleanDay}`; // 얻은 날자 데이터를 사용 가능하게 가공
            setSelectedDate(prev => {
                let dateSet = {
                    ...prev,
                    end : makedData,
                    cleanEnd : makedcleanData,
                }
                console.log(dateSet);
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
        <SaddEventBtn onClick={()=>{
            if ((selectedDate.start - selectedDate.end)> 0 && selectedDate.end!=null){//날자가 선택될 때 마다 실행, 시작날자가 끝날자보다 뒤일 경우 둘의 자리를 바꿈
                setSelectedDate(prev => {
                    let newData = {
                        start : prev.end,
                        end : prev.start,
                        cleanStart : prev.cleanEnd, 
                        cleanEnd : prev.cleanStart,
                    }
                    console.log(newData);
                    return newData;
                }
                )
            }
            if(selectedDate.start==null){
                alert('날자를 선택해 주세요');
            } else {
                setModalAdd(true);
            };
        }
        }>이벤트 추가</SaddEventBtn>
        {modaladd&&<CalendarAddModal eventsBox={eventsBox} setEventsBox={setEventsBox} events={events} setEvents={setEvents} view={setModalAdd} setSelectedDate={setSelectedDate} selectedDate={selectedDate}/>} {/* 이벤트 추가창을 엶 */}
        {modalview&&<CalendarViewModal view={setModalview} setSelectedDate={setSelectedDate} selectedDate={selectedDate}/>} {/* 이벤트 정보창을 엶 */}
    </FullCalendarWrap>
  )
}

export default CalendarMain