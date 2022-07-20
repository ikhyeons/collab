import React from "react";
import { useRecoilState } from "recoil";
import { listState } from "../../Atoms/atom";
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
    const [listStatef, setListStatef] = useRecoilState(listState(props.data));

    return(
        <Slist>{listStatef.contents}</Slist>
    )
}

export default InnerList;