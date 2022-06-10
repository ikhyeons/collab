import React, { useState, createContext, useCallback, useEffect} from "react";
import { useReducer } from "react";
import styled from "styled-components";
import Table from "./Table";

const RequestDiv = styled.div`
    width: 95%;
    height : 95%;
    background-color: lightgrey;
    flex-wrap:wrap;
    align-content:space-between;
    display:flex;
`;
const Rdiv = styled.div`
    width: 93%;
    display:flex;
    flex-direction:column;
    flex-wrap:wrap;
    align-content:flex-start;
`
const Resdiv = styled.div`
width: 93%;
display:flex;
flex-direction:column;
flex-wrap:nonewrap;
align-content:flex-start;
`
const Rul = styled.ul`
    list-style:none;
`;

const RBtn = styled.button`
    height: 25px;
    border: 1px solid rgb(0, 200, 255);
    background-color: rgb(0, 200, 255);
    color: white;
    border-radius:15%;
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
`

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
`

const ResBtn = styled.button`
    width: 100%;
    height: 70px;
`;

const ResText = styled.textarea`
    width: 100%;
    height: 200px;
`

const initialState = {
    tableData:[
        ['시간', '일', '월', '화', '수', '목', '금', '토'],
        ['9~10', '', '', '', '', '', '', ''],
        ['10~11', '', '', '', '', '', '', ''],
        ['11~12', '', '', '', '', '', '', ''],
        ['12~1', '', '', '', '', '', '', ''],
        ['1~2', '', '', '', '', '', '', ''],
        ['2~3', '', '', '', '', '', '', ''],
        ['3~4', '', '', '', '', '', '', ''],
        ['4~5', '', '', '', '', '', '', ''],
        ['5~6', '', '', '', '', '', '', ''],
    ],
    clicked:'O',
    recentCell:[-1,-1],
};

export const CLICK_CELL = 'CLICK_CELL'

const reducer = (state, action)=>{
    switch (action.type) {
        case CLICK_CELL:{
            const tableData = [...state.tableData];
            tableData[action.row] = [...tableData[action.row]];
            if (tableData[action.row][action.cell] == '') {
                tableData[action.row][action.cell] = state.clicked;
            }
            else if (tableData[action.row][action.cell] == state.clicked) {
                tableData[action.row][action.cell] = '';
            }
            return{
                ...state,
                tableData,
                recentCell:[action.row, action.cell]
            }}
        default:
            break;
    }
}
const Request = () =>{
    const [request, setRequest] = useState(0);
    const [state, dispatch] = useReducer(reducer, initialState);
    const {tableData, recentCell} = state;
    const [response, setResponse] = useState(0);
    const [resMemo, setResMemo] = useState('');
    
    const inputResMemo = (e)=>{
        setResMemo(e.target.value);
    }

    const onClickTable = useCallback(()=>{
        dispatch({type: CLICK_CELL})
    }, [])

    useEffect(()=>{
        const [row, cell] = recentCell;
        if(row<0){
            return;
        }
        console.log(row, cell, tableData);
    }, [recentCell])

    return(
        <RequestDiv>
            {
                request===0 && response === 0 &&
                <Rdiv>
                    <b>받은 요청</b>
                    <ResBtn onClick={(e)=>{
                        e.preventDefault();
                        setResponse(1);

                    }}>요청 왔습니다</ResBtn>
                    <RBtn type="submit" onClick={(e)=>{
                        e.preventDefault()
                        setRequest(1);
                    }}
                    >요청하기</RBtn>
                </Rdiv>
            }
            {
                request===1 && response === 0 &&
                <Rdiv>
                    <b>요청하기</b>
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
                    <ResText type="text" placeholder="내용을 입력하세요." value={resMemo} onChange={(e)=>{
                        inputResMemo(e);
                    }}/>
                    <RBtn type="submit" onClick={(e)=>{
                        e.preventDefault()
                        setRequest(0);
                    }}
                    >요청하기</RBtn>
                </Rdiv>
            }
            {
                request === 0 && response === 1 &&
                <Resdiv>
                    <b>날짜입력</b>
                    <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch} style={{width: '100%', marginLeft:'10px'}}/>
                    <button onClick={(e)=>{
                        e.preventDefault();
                        setResponse(0);
                    }}>확인</button>
                </Resdiv>
            }
        </RequestDiv>
    )
};

export default Request;