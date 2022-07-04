import React from 'react'
import styled from 'styled-components'
import { BsThreeDotsVertical,  } from 'react-icons/bs'
import {MdOutlineCancel, MdOutlineEditNote} from 'react-icons/md'

const SReplies = styled.li`
  list-styled : none;
  display : flex;
  border-bottom : 1px solid black;
`

const SReplyMain = styled.div`

`

const SSettingLine = styled.div`
  display : flex;
  flex-direction: column;
  margin-right : 5px;
`

const SimoDiv1 = styled.span`
  margin : "0 0 10px 0";
  cursor : pointer;
  padding : 3px;
  border-radius : 5px;
  z-index : 2;
  :hover{
    background : yellow;
  }
`

const SimoDiv2 = styled.span`
  cursor : pointer;
  padding : 3px;
  border-radius : 5px;
  :hover{
    background : yellow;
  }
`

const SContent = styled.div`
  width : 100%;
`

const SWriter = styled.div`
  border-bottom : 1px solid lightgray;
`

const SData = styled.div`
  margin-left : 5px;
`

function ReplyText(prop) {
  return (
    <SReplies>
          <SSettingLine>
                <SimoDiv1>
                  <BsThreeDotsVertical />
                </SimoDiv1>

                <SimoDiv1>
                  <MdOutlineEditNote />
                </SimoDiv1>

                <SimoDiv2>
                  <MdOutlineCancel />
                </SimoDiv2>
          </SSettingLine>

          <SContent>
            
            <SReplyMain>
              <SWriter>{prop.data.writer} 2022.07.01</SWriter>
              <SData>{prop.data.data}</SData>
            </SReplyMain>
          </SContent>
    </SReplies>
  )
}

export default ReplyText