import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { useRecoilState } from 'recoil';
import { forceRerender } from "../../Atoms/atom";
import { webPort } from "../../port";

const Scontainor = styled.div`
    width: 100%;
    height: 100vh;
`
const Sselectdiv = styled.div`
    display:flex;
    width: 30%;
    border: 4px solid yellow;
    border-radius: 10px;
    flex-direction:column;
    text-align:center;
    margin-top:30vh;
    margin-left:20vw;
    align-items:center;
    font-size : 20px;
`

const Sh3 = styled.div`
    margin-bottom : 15px;
    font-weight : bold;
`

const Sbtn = styled.button`
    background : lightyellow;
    margin-bottom : 5px;
    padding : 5px;
    border-radius : 5px;
    border : 1.5px solid black;
    cursor : pointer;
    width:80%;
    :hover {
        background : rgb(230, 230, 200);
    }

`
const NewSpace = ()=>{
    const {workSpaceNum} = useParams();
    const [Rerender, setRerender] = useRecoilState(forceRerender);
    const {projectNum} = useParams();

    const changeTypeWorkList = ()=>{
        axios({//보드로 타입을 바꿈
            url: `http://${webPort.express}/changeWorkSpaceType`,
            method: 'put',
            withCredentials : true,
            data:{
                workSpaceNum: workSpaceNum,
                changeType: 'board',
            }
          }).then(()=>{
            setRerender(prev=> prev+1);
        })
    };

    const changeTypeList = ()=>{
        axios({//리스트로 타입을 바꿈
            url: `http://${webPort.express}/changeWorkSpaceType`,
            method: 'put',
            withCredentials : true,
            data:{
                workSpaceNum: workSpaceNum,
                changeType: 'li',
            }
          }).then(()=>{
            setRerender(prev => prev+1);
        })
    };
    
    return(
        <Scontainor>
            <Sselectdiv>
                <Sh3>어떤 타입을 추가하시겠습니까?</Sh3>
                <Link to={`/main/${projectNum}/calendar`} style={{ textDecoration: 'none', color : 'black', width: '100%' }}>
                    <Sbtn onClick={()=>{changeTypeWorkList()}}>작업목록</Sbtn>
                </Link> 
                <Link to={`/main/${projectNum}/calendar`} style={{ textDecoration: 'none', color : 'black', width: '100%' }}>
                    <Sbtn onClick={()=>{changeTypeList()}}>문서</Sbtn>
                </Link>
            </Sselectdiv>
        </Scontainor>
    )
}

export default NewSpace;