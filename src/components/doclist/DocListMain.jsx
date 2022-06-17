import React, {useState} from 'react'
import styled from 'styled-components'
import DocList from './DocList'
import DocSearchBar from './DocSearchBar'

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
    width : 35%;
    text-align : center;
`

const Swriter = styled.span`
    position : absolute;
    right : 104px;
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

    const [docList, setDocList] = useState([
        {
            num : 1,
            makeDate:'2022-06-16',
            title : '첫번째글제목첫번째글제sdf목',
            writer : '일곱글자닉네임',
        },
        {
            num : 2,
            makeDate:'2022-07-13',
            title : '두번째 글 제목',
            writer : '강도경',
        },
        {
            num : 3,
            makeDate:'2022-07-14',
            title : '세번째 글 제목',
            writer : '성익현',
        },
        {
            num : 4,
            makeDate:'2022-06-16',
            title : '첫번째글제목첫번째글제sdf목',
            writer : '일곱글자닉네임',
        },
        {
            num : 5,
            makeDate:'2022-07-13',
            title : '두번째 글 제목',
            writer : '강도경',
        },
        {
            num : 6,
            makeDate:'2022-07-14',
            title : '세번째 글 제목',
            writer : '성익현',
        },
        {
            num : 7,
            makeDate:'2022-06-16',
            title : '첫번째글제목첫번째글제sdf목',
            writer : '일곱글자닉네임',
        },
        {
            num : 8,
            makeDate:'2022-07-13',
            title : '두번째 글 제목',
            writer : '강도경',
        },
        {
            num : 9,
            makeDate:'2022-07-14',
            title : '세번째 글 제목',
            writer : '성익현',
        },
        {
            num : 11,
            makeDate:'2022-06-16',
            title : '첫번째글제목첫번째글제sdf목',
            writer : '일곱글자닉네임',
        },
        {
            num : 12,
            makeDate:'2022-07-13',
            title : '두번째 글 제목',
            writer : '강도경',
        },
        {
            num : 13,
            makeDate:'2022-07-14',
            title : '세번째 글 제목',
            writer : '성익현',
        },
        {
            num : 14,
            makeDate:'2022-06-16',
            title : '첫번째글제목첫번째글제sdf목',
            writer : '일곱글자닉네임',
        },
        {
            num : 15,
            makeDate:'2022-07-13',
            title : '두번째 글 제목',
            writer : '강도경',
        },
        {
            num : 16,
            makeDate:'2022-07-14',
            title : '세번째 글 제목',
            writer : '성익현',
        },
        {
            num : 17,
            makeDate:'2022-06-16',
            title : '첫번째글제목첫번째글제sdf목',
            writer : '일곱글자닉네임',
        },
        {
            num : 18,
            makeDate:'2022-07-13',
            title : '두번째 글 제목',
            writer : '강도경',
        },
        {
            num : 19,
            makeDate:'2022-07-14',
            title : '세번째 글 제목',
            writer : '성익현',
        },
        {
            num : 21,
            makeDate:'2022-06-16',
            title : '첫번째글제목첫번째글제sdf목',
            writer : '일곱글자닉네임',
        },
        {
            num : 22,
            makeDate:'2022-07-13',
            title : '두번째 글 제목',
            writer : '강도경',
        },
        {
            num : 23,
            makeDate:'2022-07-14',
            title : '세번째 글 제목',
            writer : '성익현',
        },
        {
            num : 24,
            makeDate:'2022-06-16',
            title : '첫번째글제목첫번째글제sdf목',
            writer : '일곱글자닉네임',
        },
        {
            num : 25,
            makeDate:'2022-07-13',
            title : '두번째 글 제목',
            writer : '강도경',
        },
        {
            num : 26,
            makeDate:'2022-07-14',
            title : '세번째 글 제목',
            writer : '성익현',
        },
        {
            num : 27,
            makeDate:'2022-06-16',
            title : '첫번째글제목첫번째글제sdf목',
            writer : '일곱글자닉네임',
        },
        {
            num : 28,
            makeDate:'2022-07-13',
            title : '두번째 글 제목',
            writer : '강도경',
        },
        {
            num : 29,
            makeDate:'2022-07-14',
            title : '세번째 글 제목',
            writer : '성익현',
        },
        {
            num : 30,
            makeDate:'2022-07-14',
            title : '세번째 글 제목',
            writer : '성익현',
        },
    ])

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
            <DocList data = {docList.reverse()} /> {/* 데이터의 순서를 뒤집어서 전달함. */}
        </SdocWrap>
    </SdocListMain>
  )
}

export default DocListMain