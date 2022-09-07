import React from "react";
import styled from "styled-components";


const Slist = styled.div`
    max-height:35px;
    max-width:300px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    background : lightyellow;
    margin : 4px;
    padding : 5px;
    border : 1px solid black;
    border-radius : 5px;
    cursor : pointer;
    :hover{
        background : rgb(245, 245, 180)
    }
`

const InnerList = (props) =>{
    const { data } = props;

    return(
        <Slist>{data.listTitle}</Slist>
    )
}

export default InnerList;