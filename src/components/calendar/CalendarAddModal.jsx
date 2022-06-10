import React from 'react'
import { useState, useRef, useEffect } from 'react'
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
    margin-bottom : 10px;
`
const SeventTitle = styled.input`
    font-size : 35px;
    padding : 20px 10px;
    margin-bottom : 10px;
    border-bottom : 1px solid black;
    border : none;
    background : none;
    border-radius : 5px;
    width : 100%;
    :hover{
        background : rgb(230, 230, 230);
    }
    :focus{
        background : lightgray;
    }
`
const SeventContent = styled.textarea`
    width : 100%;
    height : 370px;
    padding : 10px;
    font-size : 25px;
    border : none;
    background : rgb(239, 239, 239);
    border-radius : 5px;
    resize: none;
    :hover{
        background : rgb(230, 230, 230);
    }
    :focus{
        background : lightgray;
    }
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


const CalendarAddModal = (prop) => {
    const [title, setTitle] = useState('');
    const onlyWrapPart = useRef()
    console.log(prop.selectedDate)

  return (
    <SmodalWrap ref={onlyWrapPart} onClick={(e)=>{ //클릭 되었을 때
        if(onlyWrapPart.current == e.target){ //현재 클릭된 놈이 모달의 외부창일 경우
            prop.view(false); //모달 창을 닫음
        }
    }}> {/* 모달창 외부 */}
        <Smodal> {/* 모달창 내부 */}
            <SeventTime>{prop.selectedDate.cleanStart +' ~ '+ prop.selectedDate.cleanEnd}</SeventTime>
            <SeventTitle onChange={(e)=>{
                setTitle(e.target.value)}
            } value={title} type={'text'} placeholder={'제목을 입력하세요'}/>
            
            <SeventContent type={'text'}/>
            <SBtnLine>
                <SeventBtn onClick={(e)=>{
                    e.preventDefault();
                    if(title!=""){
                    prop.setEvents((prev)=>{
                        let newData = [
                            ...prev, 
                            {
                                title : title, 
                                start : prop.selectedDate.cleanStart, 
                                end : prop.selectedDate.cleanEnd
                            },
                        ]
                            return newData;
                        });
                        // prop.setEventsBox(prev=>{
                        //     let newData = prop.events;
                        //     return newData;
                        // });
                        console.log(prop.eventsBox);
                        prop.view(false);
                    } else {
                        alert('제목을 입력해 주세요');
                    }
                }}>등록</SeventBtn>
                <SeventBtn onClick={(e)=>{
                    e.preventDefault()
                    prop.view(false); //모달 창을 닫음
                }}>취소</SeventBtn> <Sinput id='hidden' type={'checkbox'} /> <label htmlFor='hidden'>비공개</label>
            </SBtnLine>
        </Smodal>
    </SmodalWrap>
  )
}

export default CalendarAddModal