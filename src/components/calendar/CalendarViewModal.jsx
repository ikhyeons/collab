import React from 'react'
import { useState, useRef } from 'react'
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

const SMeventTitle = styled.input`
    font-size : 35px;
    padding : 15px 10px;
    margin-bottom : 10px;
    border-bottom : 1px solid black;
    border : none;
    background : rgb(237, 237, 237);
    border-radius : 5px;
    width : 100%;
    :hover{
        background : rgb(230, 230, 230);
    }
    :focus{
        background : lightgray;
    }
`

const SMeventContent = styled.textarea`
    width : 100%;
    height : 370px;
    padding : 10px;
    font-size : 26px;
    border : none;
    background : rgb(237, 237, 237);
    border-radius : 5px;
    resize: none;
    :hover{
        background : rgb(230, 230, 230);
    }
    :focus{
        background : lightgray;
    }
`
const SMBtnLine = styled.div`
    position : absolute;
    bottom : 30px;
    font-size : 25px;
`

const SMeventBtn = styled.button`
    font-size : 25px;
    padding : 0 20px;
    margin : 0 10px;
`

const SMinput = styled.input`
    width: 20px;
    height: 20px;
`
const SLine = styled.div`
    width : 100%;
    border-bottom : 1px solid black;
    margin-bottom : 5px;
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
    <SmodalWrap ref={onlyWrap} onClick={(e)=>{ //클릭 되었을 때
        if(onlyWrap.current == e.target){ //현재 클릭된 놈이 모달의 외부창일 경우
            prop.view(false); //모달 창을 닫음
            setModify(false);
        }
    }}> {/* 모달창 외부 */}
        {
            !modify&&( //수정 상태가 false일 경우 Info를 렌더함
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
            </Smodal>)
        }
        {
            modify&&(//수정 상태가 true일 경우 수정하는 창을 렌더함
                <Smodal> {/* 모달창 내부 */}
                    <SeventTime>2022.11.23 ~ 2022.11.23</SeventTime>
                    <SMeventTitle placeholder='제목을 입력하세요' onChange={(e)=>{
                        setModalInfo(prev=>{
                            let data = {
                                ...prev,
                                title : e.target.value,
                            }
                            return data;
                        })
                    }} value={modalInfo.title} />
                    <SLine />
                    <SMeventContent placeholder='내용을 입력하세요' onChange={(e)=>{
                        setModalInfo(prev=>{
                            let data = {
                                ...prev,
                                content : e.target.value,
                            }
                            return data;
                        })
                    }} value={modalInfo.content}/>
                    <SMBtnLine>
                        <SMeventBtn onClick={(e)=>{ // 수정완료 버튼, 정보창으로 이동
                            e.preventDefault()
                            setModify(false);
                        }}>적용</SMeventBtn>
                        <SMeventBtn onClick={(e)=>{
                            e.preventDefault()
                        }}>삭제</SMeventBtn>
                        <SMeventBtn onClick={(e)=>{
                            e.preventDefault()
                            prop.view(false); //모달 창을 닫음
                        }}>취소</SMeventBtn> <SMinput id='hidden' type={'checkbox'} /> <label htmlFor='hidden'>비공개</label>
                    </SMBtnLine>
                </Smodal>)
        }
    </SmodalWrap>
  )
}

export default CalendarViewModal