import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'

const SmodalWrap = styled.div`
    position : fixed;
    left: 0;
    top : 0;
    background : rgba(100, 100, 100, 0.3);
    height : 100vh;
    width : 100vw;
    z-index : 5;
`

const Smodal = styled.form`
    background : rgba(250, 250, 250, 0.9);
    position : absolute;
    top : 10%;
    left : 25%;
    z-index : 100;
    height : 50%;
    min-height : 600px;
    width : 50%;
    max-width : 700px;
    padding : 20px;
`

const SeventTime = styled.div`
    font-size : 25px;
`
const SeventTitle = styled.div`
    font-size : 35px;
    padding : 20px 0;
    margin-bottom : 20px;
    border-bottom : 1px solid black;
`
const SeventContent = styled.div`
    font-size : 25px;
`
const SBtnLine = styled.div`
    position : absolute;
    bottom : 30px;
    font-size : 25px;
`

const SeventBtn = styled.button`
    font-size : 25px;
    padding : 0 20px;
    margin : 0 10px;
`

const Sinput = styled.input`
    width: 20px;
    height: 20px;
`

const CalendarModal = () => {

  return (
    <SmodalWrap>
        <Smodal>
            <SeventTime>2022.11.23 ~ 2022.11.23</SeventTime>
            <SeventTitle>성익현 생일</SeventTitle>
            <SeventContent>성익현 생일입니다.</SeventContent>
            <SBtnLine>
                <SeventBtn onClick={(e)=>{
                    e.preventDefault()
                }}>등록</SeventBtn>
                <SeventBtn onClick={(e)=>{
                    e.preventDefault()
                }}>취소</SeventBtn> <Sinput id='hidden' type={'checkbox'} /> <label htmlFor='hidden'>비공개</label>
            </SBtnLine>
        </Smodal>
    </SmodalWrap>
  )
}

export default CalendarModal