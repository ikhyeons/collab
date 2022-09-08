import React, { useState } from "react";
import styled from "styled-components";
import Table from "./Table";
import {useRecoilState} from 'recoil';
import { selectedTd } from "../../Atoms/atom";
import axios from "axios";
import { webPort } from "../../port";

const RequestDiv = styled.div`
    width: 100%;
    height : 100%;
    flex-wrap:wrap;
    justify-content:space-around;
    display:flex;
    border: 1px solid rgb(232, 232, 232);
    border-radius: 20px;
    margin-left:4px;
    position:relative;
`;
const Rdiv = styled.div`
    width: 100%;
    display:flex;
    flex-direction:column;
    flex-wrap:wrap;
    align-content:flex-start;
`
const Resdiv = styled.div`
width: 100%;
display:flex;
flex-direction:column;
flex-wrap:nonewrap;
align-content:flex-start;
`;

const RBtn = styled.button`
    width: 60px;
    height: 25px;
    border: 1px solid rgb(0, 230, 255);
    background-color: rgb(0, 200, 255);
    color: white;
    position: absolute;
    bottom: 30px;
    border-radius: 10px;
`;

const RSelMon = styled.select`
    width: 40px;
    height: 30px;
    background-color: lightgrey;
    border-radius: 20%;
    color: white;
    :hover{
        background-color:grey;
        cursor: pointer;
    }
`;

const RSelWeek = styled.select`
    width: 40px;
    height: 30px;
    background-color: lightgrey;
    border-radius: 20%;
    color: white;
    :hover{
        background-color:grey;
        cursor: pointer;
    }
`;

const ResText = styled.textarea`
    width: 100%;
    height: 200px;
`;

const Receive = styled.div`
    background-color:${ (props) => props.alres === 1 ? 'lightgreen': 'red'};
    color:${ (props) => props.alres === 1 ? 'black': 'white'};
    width: 100%;
    border-radius: 10px;
    margin-bottom:10px;
`;

const Sbtn = styled.button`
    width: 60px;
    height: 25px;
    border: 1px solid rgb(0, 230, 255);
    background-color: rgb(0, 200, 255);
    color: white;
    position: absolute;
    bottom: 30px;
    border-radius: 10px;
    left:62px;
`
const Sb = styled.b`
    margin-left:12px;
`

const Request = () =>{
    const [request, setRequest] = useState(0);
    const [response, setResponse] = useState(0);
    const [resMemo, setResMemo] = useState('');
    const [alres, setAlres] = useState(0);
    const [tableSet] = useRecoilState(selectedTd);

    const inputResMemo = (e)=>{
        setResMemo(e.target.value);
    }

    const timeResponse = ()=>{
        if(tableSet != ''){
            console.log('timeResponse');
            axios({
                method: 'post',
                url: `http://${webPort.express}/addTimeResponse`,
                withCredentials : true,
                data: {
                    reqNum: 0,
                    innerData: tableSet,
                }
            }).then((res)=>{
                console.log(res);
                if(res.data.return === 0){alert("전송에 성공했습니다!")}
                else if(res.data.return === 3){alert("미로그인 상태입니다!")}
            })
        }
    }


    return(
        <RequestDiv>    
            {
                request === 0 && response === 0 &&
                <Rdiv>
                    <Sb>받은 요청</Sb>
                    <Receive alres ={alres} onClick={(e)=>{
                        e.preventDefault();
                        setResponse(1);
                        setAlres(1);
                    }}>
                        <div>
                            6월 3째주 비는 시간 보내주세요
                            <br/>
                            @강도경
                        </div>
                    </Receive>
                    <RBtn type="submit" onClick={(e)=>{
                        e.preventDefault()
                        setRequest(1);
                    }}
                    >요청하기</RBtn>
                </Rdiv>
            }
            {
                request === 1 && response === 0 &&
                <Rdiv>
                    <Sb>요청하기</Sb>
                    <b>월 선택</b>
                    <RSelMon type='number'>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                    </RSelMon>
                    <b>주차 선택</b>
                    <RSelWeek type='number'>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </RSelWeek>
                    <ResText type="text" placeholder="내용을 입력하세요." 
                    value={resMemo} onChange={(e)=>{
                        inputResMemo(e);
                    }}/>
                    <RBtn type="submit" onClick={(e)=>{
                        e.preventDefault()
                        setRequest(0);
                    }}
                    >요청하기</RBtn>
                    <Sbtn type="submit" onClick={(e)=>{
                        e.preventDefault()
                        setRequest(0);
                    }}
                    >취소</Sbtn>
                </Rdiv>
            }
            {
                request === 0 && response === 1 &&
                <Resdiv>
                    <Sb>날짜입력</Sb>
                    <Table 
                    style={{width: '100%', marginLeft:'10px'}}/>
                    <button onClick={(e)=>{
                        e.preventDefault();
                        setResponse(0);
                        timeResponse();
                    }}>확인</button>
                </Resdiv>
            }
        </RequestDiv>
    )
};

export default Request;