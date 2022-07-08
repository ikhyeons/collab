import React, {useRef} from 'react'
import styled from 'styled-components'
import CalendarAddEventModal from './CalendarAddEventModal'
import CalendarViewEventModal from './CalendarViewEventModal'
import CalendarUpdateEventModal from './CalendarUpdateEventModal'
import { useRecoilState } from 'recoil'
import {calendarModalState} from '../../Atoms/atom'


const AddEventWrap = styled.div`
  width : 100vw;
  height : 100vh;
  position : fixed;
  top : 0;
  left : 0;
  background : rgba(100, 100, 100, 0.3);
  z-index : 1;
`

function CalendarEventWrap() {

    const Wrap = useRef(); //클릭된 컴포넌트
    const closeModal = (e)=>{ if (e.target === Wrap.current) setEventSet(0)}; //모달창 닫는 함수
    const [eventSet, setEventSet] = useRecoilState(calendarModalState);

  return (
    <AddEventWrap ref={Wrap} onClick={(e)=>{closeModal(e)}}>   
      {/*각 상태마다 다른 모달을 렌더링*/}
      {eventSet === 1 ? <CalendarAddEventModal /> : null}
      {eventSet === 2 ? <CalendarViewEventModal /> : null}
      {eventSet === 3 ? <CalendarUpdateEventModal /> : null}
    </AddEventWrap>
  )
}

export default CalendarEventWrap