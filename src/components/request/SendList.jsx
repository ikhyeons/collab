import axios from "axios";
import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { currentReqId, forceRerender } from "../../Atoms/atom";
import { webPort } from "../../port";

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
    const {data} = props;
    const [, setSelectedReqId] = useRecoilState(currentReqId);
    const [, setRender] = useRecoilState(forceRerender);

    const deleteRequest = ()=>{
        axios({
            url: `http://${webPort.express}/delRequest`,
            method: 'delete',
            withCredentials: true,
            data:{
                reqNum: data.reqNum,
            }
        }).then((res)=>{
            console.log(res, 'deleteSendList');
            setRender(prev => prev + 1);
        })
    }
    
    return(
        <SReqContainor>
            <Receive onClick={(e)=>{
                e.preventDefault();
                setSelectedReqId(data.reqNum);
            }}>{data.month}월 {data.week}째주 {data.reqContent}
                <br/>
                From.{data.nickName}
            </Receive>
            <SDelBtn onClick={()=>{
                deleteRequest();
            }}
            >X</SDelBtn>
        </SReqContainor>
    )
}
export default SendList;