import React, { memo } from 'react';
import Td from './Td';
import styled from 'styled-components';
const Std = styled.td`
    border: 1px solid black;
    width: 20px;
    text-align:center;
    height: 31px;
`
const Tr = memo((props) =>{
    return(
        <tr style={{border: '1px solid black'}}>
            <Std>{9+props.rowIndex}~{10+props.rowIndex}</Std>
            {Array(7).fill().map((tr, i) =>(
                <Td key={i}  rowIndex={props.rowIndex} cellIndex={i} setSelectedDate={props.setSelectedDate} />
            ))}
        </tr>
    )
})

export default Tr;