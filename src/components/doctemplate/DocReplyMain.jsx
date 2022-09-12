import React, {useState, useRef, useCallback} from 'react'
import styled from 'styled-components'
import ReplyText from './docReplyType/ReplyText'
import { useRecoilState } from 'recoil'
import { replyList } from '../../Atoms/atom'
import { webPort } from "../../port";


const SListDiv = styled.ul`
  border-top : 2px solid black;
`

const Sform = styled.form`
  width : 100%;
`

const SsubmitLine = styled.div`
  width : 100%;
  position : relative;
`

const Sinput = styled.textarea`
  overflow : hidden;
  resize : none;
  width : 100%;
  padding : 5px;
  font-size : 17px;
  font-family : none;
  margin : 3px;
  border : none;
  border-bottom : 2px solid black;
`

const SSbutton = styled.button`
  padding : 5px;
  position : absolute;
  right : 0px;
`


function ReplyList() {

  const [replyLists, setReplyList] = useRecoilState(replyList)
  const textRef = useRef();
  const [inputValue, setInputValue] = useState('');


  const handleResizeHeight = useCallback(() => {
    textRef.current.style.height = textRef.current.scrollHeight + "px";
  }, []);

  return (
    <SListDiv>
      <Sform action="">
        <Sinput value={inputValue} onInput={handleResizeHeight} onChange={(e)=>{setInputValue(e.target.value)}} ref={textRef} type="text" />
        <SsubmitLine>
          <button>a</button>
          <button>b</button>
          <button>c</button>
          <button>d</button>
          <SSbutton onClick={(e)=>{
            e.preventDefault();
          }}>작성</SSbutton>
        </SsubmitLine>
      </Sform>
        {
          replyLists.map((data, i)=>{
            if (data.type === 'text') return <ReplyText data={data} key={i} />
          })
        }
    </SListDiv>
  )
}

export default ReplyList