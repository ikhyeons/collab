import React from 'react'
import styled from 'styled-components'
import ParagraphList from './ParagraphList'
import ReplyList from './ReplyList'
import Participant from './Participant'
import Licenser from './Licenser'

const STemplateMain = styled.div`
    width : 50%;
    background : rgb(245, 245, 230);
    border : 4px solid rgb(240, 240, 220);
    padding : 0px 20px;
`

const Stitle = styled.div`
    width : 100%;
    font-size : 40px;
    font-weight : bold;
    margin-bottom : 10px;
    border-bottom : 2px solid black;
`

const SsetMain = styled.div`
    width : 100%;
    font-size : 19px;
    margin : 0 0 10px 10px;
    background : none;
`

const Sname = styled.span`
    text-align : center;
    border : 1px solid purple;
    border-radius : 10px;
    padding : 2px;
    background : rgb(205, 0, 205);
    color : white;
    cursor : pointer;
    margin : 2px;
    font-size : 15px;
    :hover{
        background : rgb(235, 0, 235);
    }
`

const Ssets = styled.div`
    margin-bottom : 3px;
`

function DocTemplateMain() {
    
  return (
    <STemplateMain>
        <Stitle>    {/* 제목 */}
            세번째 글 제목
        </Stitle> 

        <SsetMain>
            <Ssets>작성일 : 2022-07-14</Ssets> {/* 작성일 */}
            <Ssets>수정일 : 2022-07-14</Ssets> {/* 수정일 */}
            <Ssets>작성자 : <Sname>@성익현</Sname></Ssets> {/* 작성자 */}

            <Participant /> {/* 참여자 */}
            <Licenser />    {/* 허가자 */}
        </SsetMain>
        
        <ParagraphList />   {/* 문단들 */}

        <ReplyList />   {/* 댓글 */}

    </STemplateMain>
  )
}

export default DocTemplateMain