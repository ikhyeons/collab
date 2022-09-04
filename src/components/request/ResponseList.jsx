import React, { useState } from "react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { currentReqId, userNamePool } from "../../Atoms/atom";

const Receive = styled.div`
    background-color: red;
    color: white;
    width: 100%;
    border-radius: 10px;
    margin-bottom:10px;
`;


const ResponseList = (props)=>{
    const {data, setResponse} = props;
    const [userName] = useRecoilState(userNamePool);
    const [selectedReqId, setSelectedReqId] = useRecoilState(currentReqId);
    
    return(
        <>
            <Receive onClick={(e)=>{
                e.preventDefault();
                setResponse(1);
            }}>{data.month}월 {data.week}째주 {data.reqContent}
                <br/>
                {userName[data.makeUserNum-1].display} 
            </Receive>
        </>
    )
}
export default ResponseList;