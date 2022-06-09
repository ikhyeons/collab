import React from 'react'
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
    padding : 17px 10px;
    margin-bottom : 5px;
    border-bottom : 1px solid black;
`

const SeventContent = styled.div`
    font-size : 25px;
    padding : 10px;
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

const SLine = styled.div`
    width : 100%;
    border-bottom : 1px solid black;
    margin-bottom : 5px;
`

function CalendarEventInfo(prop) {

    const {modalInfo, setModify} = prop;

  return (
    <Smodal> {/* 모달창 내부 */}
        <SeventTime>2022.11.23 ~ 2022.11.23</SeventTime>
        <SeventTitle>{modalInfo.title}</SeventTitle>
        <SeventContent>{modalInfo.content}</SeventContent>
        <SBtnLine>
            <SeventBtn onClick={(e)=>{ // 수정버튼 수정하기 창으로 이동.
                e.preventDefault()
                setModify(true);
            }}>수정</SeventBtn>
            <SeventBtn onClick={(e)=>{
                e.preventDefault()
            }}>삭제</SeventBtn>
            <SeventBtn onClick={(e)=>{
                e.preventDefault()
                prop.view(false); //모달 창을 닫음
            }}>취소</SeventBtn> <Sinput id='hidden' type={'checkbox'} /> <label htmlFor='hidden'>비공개</label>
        </SBtnLine>
    </Smodal>
  )
}

export default CalendarEventInfo