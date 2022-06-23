import React from "react";
import styled from "styled-components";

const Wtitle = styled.div`
    padding-left: 12px;
    border-bottom: 1px solid grey;
`;


const BoardList = (props) =>{
    const { i, data } = props;
    return(
        <div style={{minWidth: '150px', marginRight:'5px'}} key={i}>
            <Wtitle key={i}>{data.bname}</Wtitle>
        </div>
    )
}

export default BoardList;