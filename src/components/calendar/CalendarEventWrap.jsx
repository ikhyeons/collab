import React, {useRef} from 'react'
import styled from 'styled-components'
import CalendarAddEventModal from './CalendarAddEventModal'
import CalendarViewEventModal from './CalendarViewEventModal'
import CalendarUpdateEventModal from './CalendarUpdateEventModal'

const AddEventWrap = styled.div`
  width : 100vw;
  height : 100vh;
  position : fixed;
  top : 0;
  left : 0;
  background : rgba(100, 100, 100, 0.3);
  z-index : 1;
`

function CalendarEventWrap(prop) {

    const Wrap = useRef(); //클릭된 컴포넌트
    const closeModal = (e)=>{ if (e.target === Wrap.current) prop.setEventSet(0)}; //모달창 닫는 함수

  return (
    <AddEventWrap ref={Wrap} onClick={()=>{closeModal()}}>   
      {/*각 상태마다 다른 모달을 렌더링*/}
      {prop.eventSet === 1 ? <CalendarAddEventModal selectedDate={prop.selectedDate} setEvent={prop.setEvent} setEventSet={prop.setEventSet}/> : null}
      {prop.eventSet === 2 ? <CalendarViewEventModal selectedDate={prop.selectedDate} setEvent={prop.setEvent} setEventSet={prop.setEventSet}/> : null}
      {prop.eventSet === 3 ? <CalendarUpdateEventModal selectedDate={prop.selectedDate} setEvent={prop.setEvent} setEventSet={prop.setEventSet}/> : null}
    </AddEventWrap>
  )
}

export default CalendarEventWrap