import React from 'react'
import styled from'styled-components'

const Sparticipant = styled.div`
    width: 15%;
    border: 1px solid grey;
`

const Suser = styled.div`

`
const SuserTitle = styled.h4`

`
function ChatUser() {
  return (
    <Sparticipant>
        <SuserTitle>참여자 목록</SuserTitle>
        <Suser>
            @강도경
            @성익현
        </Suser>
    </Sparticipant>
  )
}

export default ChatUser