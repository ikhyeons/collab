import React from 'react'
import styled from 'styled-components'
import ParagraphList from './ParagraphList'
import ReplyList from './ReplyList'

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
`

const SsetMain = styled.div`
    width : 100%;
    font-size : 19px;
    margin : 0 0 10px 10px;
    background : none;
`

const Ssets = styled.div`
    
`

function DocTemplateMain() {
    
  return (
    <STemplateMain>
        <Stitle>    {/* 제목 */}
            세번째 글 제목
        </Stitle> 

        <SsetMain>
            <Ssets>작성자 : @성익현</Ssets> {/* 작성자 */}
            <Ssets>참여자 : @강도경</Ssets> {/* 참여자 */}
            <Ssets>허가자 : @강도경</Ssets>   {/* 허가자 */}
            <Ssets>작성일 : 2022-07-14</Ssets> {/* 작성일 */}
            <Ssets>수정일 : 2022-07-14</Ssets> {/* 수정일 */}
        </SsetMain>
        
        <ParagraphList />   {/* 문단들 */}

        <ReplyList />   {/* 댓글 */}

    </STemplateMain>
  )
}

export default DocTemplateMain