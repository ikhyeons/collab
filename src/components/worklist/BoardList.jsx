import React from "react";
import styled from "styled-components";
import InnerList from "./InnerList";

const Wtitle = styled.div`
    padding-left: 12px;
    border-bottom: 1px solid grey;
    min-height: 21px;
`;


const BoardList = (props) =>{
    const { i,index, data, list, setList } = props;
    return(
        <div>
            <div style={{minWidth: '150px', marginRight:'5px'}} key={i}>
                <Wtitle key={i}>{data.bname}</Wtitle>
            </div>
            <InnerList  list={list} setList={setList} index={index}/>
        </div>
    )
}

export default BoardList;