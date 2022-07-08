import React from 'react'
import styled from 'styled-components'
import { calendarSelectedDate, calendarModalState } from '../../Atoms/atom'
import { useRecoilValue, useRecoilState } from 'recoil'

const UpdateEventModal = styled.div`
  width : 35vw;
  min-width : 530px;
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
const Stitle = styled.input`
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

const Scontent = styled.textarea`
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

function CalendarUpdateEventModal() {

  const [eventSet, setEventSet] = useRecoilState(calendarModalState); // 현재 달력 상태 0 : 기본 / 1 : 이벤트 추가 / 2 : 이벤트 보기 / 3 : 이벤트 수정
  
  return (
    <UpdateEventModal>
        <SselectedDate>2022-06-01 ~ 2022-06-10</SselectedDate>
      <Stitle placeholder='제목을 입력하세요' type="text" />
      <Sline/>
      <Scontent name="" id="" cols="30" rows="10"></Scontent>
      <Sbutton onClick={()=>{setEventSet(0)}}>수정 완료</Sbutton>
      <Sbutton onClick={()=>{setEventSet(0)}}>취소</Sbutton>


    </UpdateEventModal>
  )
}

export default CalendarUpdateEventModal