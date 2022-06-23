import React from "react";
import styled from "styled-components";
import InnerList from "./InnerList";

const Wtitle = styled.div`
    padding-left: 12px;
    border-bottom: 1px solid grey;
    min-height: 21px;
`;


const BoardList = (props) =>{
    const { i, data, list, setList } = props;
    const key = i;
    return(
        <div>
            <div style={{minWidth: '150px', marginRight:'5px'}} key={key}>
                <Wtitle key={i}>{data.bname}</Wtitle>
            </div>
            <InnerList  list={list} setList={setList} index={key}/>
        </div>
    )
}

export default BoardList;