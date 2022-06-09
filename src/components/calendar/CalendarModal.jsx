import React from 'react'
import styled from 'styled-components'

const Smodal = styled.div`
    background : yellow;
    position : absolute;
    top : 15%;
    left : 40%;
    z-index : 100;
    height : 70%;
    width : 50%;
`


const CalendarModal = () => {
  return (
    <Smodal>
        <p>몇월 며칠 ~ 몇월 며칠</p>
        <p>제목</p>
        <p>내용</p>
        <button>등록</button><button>취소</button><span>비공개</span><input type={'checkbox'}></input>
    </Smodal>
  )
}

export default CalendarModal