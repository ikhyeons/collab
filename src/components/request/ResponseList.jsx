import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { currentReqId, currentUserId, userNameList, userNamePool } from "../../Atoms/atom";

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

const ResponseList = (props)=>{
    const {data, setResponse} = props;
    const [, setSelectedReqId] = useRecoilState(currentReqId);
    return(
        <SReqContainor>
            <Receive onClick={(e)=>{
                e.preventDefault();
                setResponse(1);
                setSelectedReqId(data.reqNum);
            }}>{data.month}월 {data.week}째주 {data.reqContent}
                <br/>
                From.{data.nickName}
            </Receive>
        </SReqContainor>
    )
}
export default ResponseList;