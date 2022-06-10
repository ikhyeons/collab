import React from "react";
import Tr from './Tr';

const Table = ({ tableData, dispatch}) => {
    return(
        <table style={{border: '1px solid black'}}>
            <tbody>
                {Array(tableData.length).fill().map((tr,i)=>(
                        <Tr key={i} dispatch = {dispatch} rowIndex={i} rowData={tableData[i]}/>
                ))
                }
            </tbody>
        </table>
    )
}

export default Table;