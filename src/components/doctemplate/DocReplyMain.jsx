import React, {useState} from 'react'
import styled from 'styled-components'
import ReplyText from './docReplyType/ReplyText'
import { useRecoilState } from 'recoil'
import { replyList } from '../../Atoms/atom'


const SListDiv = styled.ul`
  border-top : 2px solid black;
`

const Sform = styled.form`
  display : flex;
`

const Sinput = styled.textarea`
  resize : none;
  width : 80%;
  padding : 5px;
  font-size : 17px;
  font-family : none;
  margin : 3px;
`

const Sbutton = styled.button`
  padding : 5px;
  margin : 3px;
  height : 100%;
`


function ReplyList() {

  const [replyLists, setReplyList] = useRecoilState(replyList)

  return (
    <SListDiv>
      <Sform action="">
        <Sinput type="text" />
        <Sbutton onClick={(e)=>{
          e.preventDefault();
        }}>작성</Sbutton>
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