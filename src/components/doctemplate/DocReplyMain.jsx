import React, {useState} from 'react'
import styled from 'styled-components'
import ReplyText from './docReplyType/ReplyText'


const SListDiv = styled.ul`
  border-top : 2px solid black;
`



function ReplyList() {

  const [replyList, setReplyList] = useState(
    [
      {
        num : 0,
        type : 'text',
        writer : '성익현',
        data : '첫 번째 댓글입니다.',
      },
      {
        num : 1,
        type : 'text',
        writer : '강도경',
        data : '두 번째 댓글입니다.',
      },
      {
        num : 2,
        type : 'text',
        writer : '홍길동',
        data : '세 번째 댓글입니다.',
      },
    ]
  )

  return (
    <SListDiv>
        {
          replyList.map((data, i)=>{
            if (data.type === 'text') return <ReplyText data={data} key={i} />
          })
        }
    </SListDiv>
  )
}

export default ReplyList