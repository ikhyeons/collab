import React, { useState } from "react";
import styled from "styled-components";
import Table from "./Table";

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
    
    const inputResMemo = (e)=>{
        setResMemo(e.target.value);
    }

    return(
        <RequestDiv>    
            {
                request === 0 && response === 0 &&
                <Rdiv>
                    <Sb>?????? ??????</Sb>
                    <Receive alres ={alres} onClick={(e)=>{
                        e.preventDefault();
                        setResponse(1);
                        setAlres(1);
                    }}>
                        <div>
                            6??? 3?????? ?????? ?????? ???????????????
                            <br/>
                            @?????????
                        </div>
                    </Receive>
                    <RBtn type="submit" onClick={(e)=>{
                        e.preventDefault()
                        setRequest(1);
                    }}
                    >????????????</RBtn>
                </Rdiv>
            }
            {
                request === 1 && response === 0 &&
                <Rdiv>
                    <Sb>????????????</Sb>
                    <b>??? ??????</b>
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
                    <b>?????? ??????</b>
                    <RSelWeek type='number'>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </RSelWeek>
                    <ResText type="text" placeholder="????????? ???????????????." 
                    value={resMemo} onChange={(e)=>{
                        inputResMemo(e);
                    }}/>
                    <RBtn type="submit" onClick={(e)=>{
                        e.preventDefault()
                        setRequest(0);
                    }}
                    >????????????</RBtn>
                    <Sbtn type="submit" onClick={(e)=>{
                        e.preventDefault()
                        setRequest(0);
                    }}
                    >??????</Sbtn>
                </Rdiv>
            }
            {
                request === 0 && response === 1 &&
                <Resdiv>
                    <Sb>????????????</Sb>
                    <Table 
                    style={{width: '100%', marginLeft:'10px'}}/>
                    <button onClick={(e)=>{
                        e.preventDefault();
                        setResponse(0);
                    }}>??????</button>
                </Resdiv>
            }
        </RequestDiv>
    )
};

export default Request;