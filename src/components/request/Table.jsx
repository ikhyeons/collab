import React, { useEffect, useState } from "react";
import Tr from './Tr';
import styled from "styled-components";

const Std = styled.td`
    border: 1px solid black;
    width: 30px;
    text-align:center;
    height: 31px;
    background-color:rgb(255, 134, 134);
    color: white;
`
const Stable = styled.table`
    border-collapse: collapse;
    border: 1px solid black;
`

const Table = () => {
    const [selectedDate, setSelectedDate] = useState([]);

    useEffect(()=>{
        console.log(selectedDate);
    },[selectedDate])
    return(
        <Stable>
            <tbody>
                <tr>
                    <Std>시간</Std>
                    <Std>일</Std>
                    <Std>월</Std>
                    <Std>화</Std>
                    <Std>수</Std>
                    <Std>목</Std>
                    <Std>금</Std>
                    <Std>토</Std>
                </tr>
                {Array(15).fill().map((tr,i)=>(
                        <Tr key={i} rowIndex={i} setSelectedDate={setSelectedDate}/>
                ))
                }
            </tbody>
        </Stable>
    )
}

export default Table;