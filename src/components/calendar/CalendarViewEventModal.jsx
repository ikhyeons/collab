import React from 'react'
import styled from 'styled-components'

const EventViewModal = styled.div`
  width : 35vw;
  min-width : 520px;
  height : 60vh;
  min-height : 400px;
  background : rgba(250, 250, 250, 0.95);
  position : absolute;
  left : 32vw;
  top : 10vh;
  z-index : 2;
  padding : 15px;
  border-radius : 15px;
`

const SselectedDate = styled.div`
  font-size : 37px;
  width : 100%;
  height : 10%;
`
const Stitle = styled.div`
  border-radius : 10px;
  font-size : 30px;
  width : 100%;
  height : 10%;
  margin : 5px auto;
  padding : 5px;
  background : none;
  border : none;
  :hover{
    background : rgba(240, 240, 240, 1);
  }
  :focus{
    border : 1px solid rgba(223, 223, 223, 1);
    background : rgba(230, 230, 230, 1);
  }
`

const Scontent = styled.div`
  border-radius : 10px;
  font-size : 27px;
  width : 100%;
  height : 65%;
  margin : 5px auto;
  padding : 5px;
  background : none;
  border : none;
  resize: none;
  :hover{
    background : rgba(240, 240, 240, 1);
  }
  :focus{
    border : 1px solid rgba(223, 223, 223, 1);
    background : rgba(230, 230, 230, 1);
  }
`

const Sbutton = styled.button`
  width : 150px;
  height : 10%;
  margin : 5px;
  font-size : 20px;
  border-radius : 10px;
  cursor : pointer;
  :hover{
    background : rgba(240, 240, 240, 1);
  }
  :active{
    border : 1px solid rgba(223, 223, 223, 1);
    background : rgba(230, 230, 230, 1);
  }
`
const Sline = styled.div`
  width : 100%;
  border : 1px solid black;
`

function CalendarViewEventModal(prop) {
  return (
    <EventViewModal>
      <SselectedDate>2022-06-01 ~ 2022-06-10</SselectedDate>
      <Stitle>이벤트 제목이랍니다.</Stitle>
      <Sline/>
      <Scontent>이벤트 내용입니다.</Scontent>
      <Sbutton
        onClick={()=>{prop.setEventSet(3)}}>수정</Sbutton> {/*수정 페이지로 넘어감*/}

      <Sbutton
        onClick={()=>{prop.setEventSet(0)}}>삭제</Sbutton> {/*아이디 값을 받아서 삭제*/}

      <Sbutton onClick={()=>{prop.setEventSet(0)}}>취소</Sbutton> {/*모달을 닫음*/}


    </EventViewModal>
  )
}

export default CalendarViewEventModal