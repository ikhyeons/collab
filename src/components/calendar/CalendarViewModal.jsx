import React from 'react'
import { useState, useRef } from 'react'
import styled from 'styled-components'
import CalendarEventInfo from './CalendarEventInfo'
import CalendarEventModify from './CalendarEventModify'

const SmodalWrap = styled.div`
    position : fixed;
    left: 0;
    top : 0;
    background : rgba(100, 100, 100, 0.3);
    height : 100vh;
    width : 100vw;
    z-index : 5;
`

const CalendarViewModal = (prop) => {
    //수정상태 구분을 위한 변수
    const [modify, setModify] = useState(false);
    //모달창 외부 클릭이벤트를 위한 Ref
    const onlyWrap = useRef()
    //모달창 내부 정보
    const [modalInfo, setModalInfo] = useState({
        title : '성익현 생일',
        content : '성익현 생일입니다.'
    })

  return (
    <SmodalWrap ref={onlyWrap} onClick={(e)=>{ {/* 모달창 외부 */}
        if(onlyWrap.current == e.target){ //현재 클릭된 놈이 모달의 외부창일 경우
            prop.view(false); //모달 창을 닫음
            setModify(false);
        }
    }}> 
        {
            modify == false? 
            <CalendarEventInfo modalInfo={modalInfo} setModify={setModify} view = {prop.view}/> 
            : 
            <CalendarEventModify setModalInfo={setModalInfo} modalInfo={modalInfo} setModify={setModify} view={prop.view}/>
        }
    </SmodalWrap>
  )
}

export default CalendarViewModal