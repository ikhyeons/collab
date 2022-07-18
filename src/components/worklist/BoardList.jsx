import React from "react";
import styled from "styled-components";
import InnerList from "./InnerList";

const Wtitle = styled.div`
    padding-left: 12px;
    border-bottom: 1px solid grey;
    min-height: 21px;
    max-width:300px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
`;
const Sboard = styled.div`
    min-width:150px;
    margin-right:5px;
`

const Scontainor = styled.div`
`
const BoardList = (props) =>{
    const { i, data, index } = props;
    return(
        <Scontainor>
            <Sboard key={i}>
                <Wtitle key={i}>{data.bname}</Wtitle>
            </Sboard>
            <InnerList index={index} />
        </Scontainor>
    )
}

export default BoardList;