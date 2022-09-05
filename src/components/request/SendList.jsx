import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { currentReqId, userNamePool } from "../../Atoms/atom";

const SReqContainor = styled.div`
    display:felx;
    justify-content: flex-start;
`

const Receive = styled.div`
    background-color: red;
    color: white;
    width: 100%;
    border-radius: 10px;
    margin-bottom:10px;
`;

const SDelBtn = styled.button`
    height: 40px;
    width: 40px;
`

const SendList = (props)=>{
    const {data, reqId} = props;
    const [userName] = useRecoilState(userNamePool);
    const [, setSelectedReqId] = useRecoilState(currentReqId);

    const deleteRequest = ()=>{
        axios({
            url: `http://localhost:1004/delRequest`,
            method: 'delete',
            withCredentials: true,
            data:{
                reqNum: reqId,
            }
        }).then((res)=>{
            console.log(res);
        })
    }
    
    return(
        <SReqContainor>
            <Receive onClick={(e)=>{
                e.preventDefault();
                setSelectedReqId(reqId);
            }}>{data.month}월 {data.week}째주 {data.reqContent}
                <br/>
                {userName[data.makeUserNum-1].display} 
            </Receive>
            <SDelBtn onClick={()=>{
                deleteRequest();
            }}
            >X</SDelBtn>
        </SReqContainor>
    )
}
export default SendList;