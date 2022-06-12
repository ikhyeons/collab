import React, { useState } from "react";
import styled from "styled-components";

const Std = styled.td`
    background-color : ${ (props) => props.checked == 1 ? 'lightgreen': null};
    border: 1px solid black;
    width: 20px;
    text-align:center;
    height: 31px;
`
const Td = ({rowIndex, cellIndex, setSelectedDate})=>{
    const [checked, setChecked] = useState(0);
    const onClickTd = ()=>{
        setChecked(()=>{
            if (checked == 0) {
                return 1;
            } else {
                return 0;
            }
        });
       setSelectedDate((prev)=>{
        if (checked == 0) {
            const selDate = [
                ...prev,
                {
                row: rowIndex,
                cell: cellIndex,
            }]
            return selDate;
        } else {
            let selDate = [...prev];
            selDate = selDate.filter((e)=>(e.row != rowIndex || e.cell != cellIndex));
            return selDate;
        }
       })
       
       console.log(rowIndex, cellIndex);
    }
    return(
        <Std checked ={checked}onClick={onClickTd} />
    )
}

export default Td;