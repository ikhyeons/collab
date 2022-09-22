import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Table from "./Table";
import {useRecoilState} from 'recoil';
import { currentReqId, currentUserId, forceRerender, receiveRequest, selectedTd, userNameList, userNamePool } from "../../Atoms/atom";
import axios from "axios";
import { useParams } from "react-router-dom";
import ResponseList from "./ResponseList"
import SendList from "./SendList";
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
    resize:none;
`;

const ResTitle = styled.textarea`
    width: 100%;
    height: 40px;
    resize:none;
`


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
    const [resTitle, setResTitle] = useState('');
    const [tableSet] = useRecoilState(selectedTd);
    const [reqId] = useRecoilState(currentReqId);
    
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [selectedWeek, setSelectedWeek] = useState(0);
    const [recRequest, setReceiveRequest] = useRecoilState(receiveRequest);
    const [sid, setSid] = useRecoilState(currentUserId);
    const [userName, setUserName] = useState([]);
    const [render,] = useRecoilState(forceRerender);

    const {projectNum} = useParams();

    const inputResMemo = (e)=>{
        setResMemo(e.target.value);
    }

    const inputResTitle = (e)=>{
        setResTitle(e.target.value);
    }

    // 테이블 시간표 보내는 함수
    const timeResponse = ()=>{
        if(tableSet !== ''){
            console.log('timeResponse');
            axios({
                method: 'post',
                url: `http://${webPort.express}/addTimeResponse`,
                withCredentials : true,
                data: {
                    reqNum: reqId,
                    innerData: tableSet,
                }
            }).then((res)=>{
                console.log(res);
                if(res.data.return === 0){alert("전송에 성공했습니다!")}
                else if(res.data.return === 3){alert("미로그인 상태입니다!")}
            })
        }
    }

    //받은 요청 불러오는 함수
    useEffect(()=>{
        axios({
            url: `http://${webPort.express}/readRequestList/${projectNum}`,
            method: 'get',
            withCredentials: true,
        }).then((res)=>{
            setReceiveRequest(res.data.data);
            setSid(res.data.user);
        })

        
        axios({
            url: `http://${webPort.express}/readUser`,
            method: 'get',
            withCredentials: true,
        }).then((res)=>{
            setUserName(res.data.data)
            console.log(res.data);
        })
    },[render])

    const changeMonth = (e)=>{
        setSelectedMonth(e.target.value);
    }
    const changeWeek = (e)=>{
        setSelectedWeek(e.target.value);
    }

    //요청 보내는 함수
    const createTimeRequest = () =>{
        axios({
            url: `http://${webPort.express}/createTimeRequest`,
            method: 'post',
            withCredentials: true,
            data:{
                month: selectedMonth,
                week: selectedWeek,
                reqTitle: resTitle,
                reqContent: resMemo,
                projectNum: projectNum,
            }
        }).then((res)=>{
            console.log(res);
        })
    }

    return(
        <RequestDiv>    
            {
                request === 0 && response === 0 &&
                <Rdiv>
                    <Sb>받은 요청</Sb>
                    <ul>
                        {recRequest.filter(a => a.makeUserNum !== sid).map((data, i)=>{
                            return (<ResponseList key={i} data={data} setResponse={setResponse} userName={userName} />)
                        })}
                    </ul>
                    <Sb>보낸 요청</Sb>
                    <ul>
                        {recRequest.filter(a => a.makeUserNum === sid).map((data, i)=>{
                            return (<SendList key={i} data={data} userName={userName}/>)
                        })}
                    </ul>
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
                    <b>제목 입력</b>
                    <ResTitle type="text" placeholder="제목을 입력하세요"
                    value={resTitle} onChange={(e)=>{
                        inputResTitle(e);
                    }}/>
                    <b>월 선택</b>
                    <RSelMon type='number' onChange={(e)=>{changeMonth(e)}}>
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
                    <RSelWeek type='number' onChange={(e)=>{changeWeek(e)}}> 
                        <option value="1">1</option> 
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option> 
                    </RSelWeek>

                    <ResText type="text" placeholder="내용을 입력하세요."  // 텍스트 입력 공간
                    value={resMemo} onChange={(e)=>{
                        inputResMemo(e);
                    }}/>

                    <RBtn type="submit" onClick={(e)=>{
                        e.preventDefault()
                        setRequest(0);
                        createTimeRequest();
                    }}>요청하기</RBtn>

                    <Sbtn type="submit" onClick={(e)=>{
                        e.preventDefault()
                        setRequest(0);
                    }}>취소</Sbtn>
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