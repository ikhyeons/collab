import React from "react";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { requestLast1Td, requestTable } from "../../Atoms/atom";

const Std = styled.td`
    background-color : ${ (props) => props.checked === 1 ? 'lightgreen': null};
    border: 1px solid black;
    width: 20px;
    text-align:center;
    height: 50px;
`
const Td = ({rowIndex, cellIndex, isMouseDown})=>{

    const [checkedTable, setCheckedTable] = useRecoilState(requestTable)
    const [last1Td, setLast1Td] = useRecoilState(requestLast1Td);
    
    const checked = checkedTable[rowIndex][cellIndex];
    //이전 마우스가 있던 td

    const onMouseDownTd = () => {
        if (checked === 0){
            setCheckedTable((prev)=>{
                let newTable = [...prev];
                newTable[rowIndex] = [...newTable[rowIndex]]
                newTable[rowIndex][cellIndex] = 1;
                return newTable;
            })
        } else {
            setCheckedTable((prev)=>{
                let newTable = [...prev];
                newTable[rowIndex] = [...newTable[rowIndex]]
                newTable[rowIndex][cellIndex] = 0;
                return newTable;
            })
        }
    }

    const onMouseOverTd= ()=>{
//만약에 드래그상태일때, 새로 마주친놈의 체크가 1일때 이전놈의 체크를 0으로 바꿈
        if (isMouseDown === 1){
            if (checked === 0) {
                setCheckedTable((prev)=>{
                    let newTable = [...prev];
                    newTable[rowIndex] = [...newTable[rowIndex]]
                    newTable[rowIndex][cellIndex] = 1;
                    return newTable;
                })
            } else {
                setCheckedTable((prev)=>{
                    let newTable = [...prev];
                    newTable[last1Td.rowIndex] = [...newTable[last1Td.rowIndex]]
                    newTable[last1Td.rowIndex][last1Td.cellIndex] = 0;
                    return newTable;
                })
            }
        }
    }

    const onMouseleaveTd = ()=>{
        if (isMouseDown === 1){
            setLast1Td({
                rowIndex : rowIndex,
                cellIndex : cellIndex,
            })
        }
        
    }

    return(
        <Std checked={checked} onMouseDown={()=>{onMouseDownTd()}} onMouseOver={onMouseOverTd} onMouseLeave={onMouseleaveTd} />
    )
}

export default Td;