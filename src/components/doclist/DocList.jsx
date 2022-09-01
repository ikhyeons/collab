import React, {useState ,useCallback} from 'react'
import styled, { keyframes } from 'styled-components'
import { useParams } from 'react-router-dom'
import { FaSpinner } from 'react-icons/fa'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import { docList, docForceRerender, currentDocId, docTitle } from '../../Atoms/atom'
import { useEffect } from 'react'

const Sli = styled.li`
    list-style : none;
    margin : 2px;
    height : 35px;
    font-size : 17px;
    position : relative;
    width : 100%;
    padding-top : 3px;
    border-bottom : 1px solid rgb(205, 205, 205);
`

const Snum = styled.span`
    width : 12%;
    text-align : center;
    display : inline-block;
    border-right : 1px solid rgb(205, 205, 205);
`

const Stitle = styled.span`
    position : absolute;
    width : 50%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color : black;
    cursor : pointer;
    :hover{
        text-decoration : underline;
    }
`

const Swriterwrap = styled.span`
    position : absolute;
    right : 130px;
    width : 22%;
    text-align : center;
`

const Swriter = styled.span`
    text-align : center;
    border : 2px solid purple;
    border-radius : 10px;
    background : rgb(205, 0, 205);
    color : white;
    cursor : pointer;
    font-size : 15px;
    :hover{
        background : rgb(235, 0, 235);
    }
`
const Sdelbutton = styled.button`
    position : absolute;
    width : 5%;
    right : 100px;
    min-width : 35px;
`

const Sdate = styled.span`
    position : absolute;
    right : 0px;
    width : 20%;
    max-width : 95px;
`
const Sul = styled.ul`
    overflow-Y : auto;
    overflow-X : hidden;
    height : 97%;

    &::-webkit-scrollbar{
        width: 7px;
        background : rgba(240,240,150,1);
    }

    &::-webkit-scrollbar-thumb{
        height: 17%;
        background-color: rgba(255,255,170,1);
        border : 1px solid yellow;
        border-radius: 5px;    
    }
`

const SloadBox = styled.div`
    height : 70px;
    text-align : center;
`



//회전 애니메이션
const rotation = keyframes`
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
`

//투명도 애니메이션
const opacity = keyframes`
  0%{
    opacity : 1;
  }
  50%{
    opacity : 0;
  }
  100%{
    opacity : 1;
  }
`;

//회전 div
const SloadingSpin = styled.span`
    display : inline-block;
    transform-origin: 50% 70%; 
    width : 50px;
    height : 50px;
    animation: ${rotation} 1.5s linear infinite;
`
//투명도 div
const SloadingOpacity = styled.span`
    animation: ${opacity} 2s linear infinite;
`



function DocList() {
    const {workSpaceNum} = useParams();
    const [doclist, setDocList] = useRecoilState(docList);
    const [docforceRerender, setDocForceRerender] = useRecoilState(docForceRerender);
    const [docId, setDocId] = useRecoilState(currentDocId);
    //현재 스크롤량을 확인하여 맨 밑까지 스크롤 되었는지를 확인하는 스테이트
    const [isBottom, setIsBottom] = useState(0);
    
    const scrollBottom = useCallback((e)=>{ //스크롤 되었을 경우에
        if(e.target.scrollTop + e.target.offsetHeight + 1 === e.currentTarget.scrollHeight){
            //만약 스크롤된 량 + 화면의 높이가 해당 div의 전체 높이일때(맨 아래까지 스크롤 되었을 경우) 
            setIsBottom(1); //isBottom을 1로 변경함.
        }
    })
    const deleteDoc = (docNum)=>{
        axios({
            url: `http://localhost:1004/delDoc`,
            data : {
                docNum : docNum,
            },
            method: 'delete',
            withCredentials : true,
          }).then(()=>{
            setDocForceRerender((prev)=>prev===0? 1 : 0);
          })
    }

    useEffect(()=>{
        axios({
            url: `http://localhost:1004/readDocList/${workSpaceNum}`,
            method: 'get',
            withCredentials : true,
          }).then((res)=>{setDocList(res.data.data)});
    }, [docforceRerender])
    return (
        <Sul onScroll={(e)=>{scrollBottom(e)}}>
            {
                doclist.map((data)=>{{/* 부모에서 받은 글 리스트를 렌더함. */}
                    return (
                            <Sli key={data.docNum}>
                                <Snum>{data.docNum}</Snum>
                                <Stitle onClick={()=>{setDocId(data.docNum);}} num={data.docNum}>&nbsp;{data.docTitle}</Stitle>
                                <Swriterwrap><Swriter>{data.nickName}</Swriter></Swriterwrap>
                                <Sdelbutton onClick={()=>{deleteDoc(data.docNum)}}>삭제</Sdelbutton>
                                <Sdate>{data.makeDate.slice(0, 10)}</Sdate>
                            </Sli>
                        )
                    }
                )
            }
            {/* 만약 스크롤이 맨 아래까지 되었다면 로딩창을 띄움. */}
            <SloadBox>{isBottom === 1? <SloadingOpacity><SloadingSpin><FaSpinner style={{fontSize : '40px', marginTop : '15px' }}/></SloadingSpin></SloadingOpacity> : null}</SloadBox>
        </Sul>
    )
}


export default DocList