import React, {useState} from 'react'
import styled from 'styled-components'
import DocList from './DocList'
import DocSearchBar from './DocSearchBar'
import { webPort } from "../../port";


const SdocWrap = styled.div`
    height : 94%;
`

const Snum = styled.span`
    width : 12%;
    text-align : center;
    display : inline-block;
`

const Stitle = styled.span`
    position : absolute;
    width : 40%;
    text-align : center;
`

const Swriter = styled.span`
    position : absolute;
    right : 130px;
    width : 21%;
    text-align : center;
    border-radius : 5px;
`

const Sdate = styled.span`
    position : absolute;
    right : 0px;
    width : 21%;
    max-width : 100px;
    text-align : center;
`

const Slitag = styled.li`
    list-style : none;
    height : 3%;
    min-height : 27px;
    font-size : 17px;
    position : relative;
    width : 100%;
    border : 1px solid rgb(200, 200, 100);
`


const SdocListMain = styled.div`
    height : 100vh;
    background : lightyellow;
    width : 40%;
    min-width : 500px;
    min-height : 410px;
`

function DocListMain() {


  return (
    <SdocListMain>
        <DocSearchBar></DocSearchBar>
        <SdocWrap>
            <Slitag>
                <Snum>글번호</Snum>
                <Stitle>제목</Stitle>
                <Swriter>작성자</Swriter>
                <Sdate>작성날자</Sdate>
            </Slitag>

            <DocList /> {/* 데이터의 순서를 뒤집어서 전달함. */}
        </SdocWrap>
    </SdocListMain>
  )
}

export default DocListMain