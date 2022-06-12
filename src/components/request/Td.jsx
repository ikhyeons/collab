import React, { memo } from "react";
import { CLICK_CELL } from "./Request";

const Td = memo(({rowIndex, cellIndex, dispatch, cellData })=>{

    const onClickTd = ()=>{
        dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex})
    }

    return(
        <td onClick={onClickTd} style={{border: '1px solid black', width: '20px', textAlign:'center', height: '20px'}}>{cellData}</td>
    )
})

export default Td;