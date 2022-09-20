import axios from "axios";
import { useEffect } from "preact/hooks";
import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { forceRerender } from "../../Atoms/atom";
import { webPort } from "../../port";

const Scontainor = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`

const Slist = styled.div`
    max-height:35px;
    width:267px;
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

const SdelButton = styled.button`
`

const InnerList = (props) =>{
    const { data } = props;
    const [render, setRender] = useRecoilState(forceRerender);

    const delList = (listNum)=>{
        axios({
            url: `http://${webPort.express}/delList`,
            method: 'delete',
            withCredentials: true,
            data: {
                listNum: listNum
            }
        }).then((res)=>{
            console.log(res);
            setRender(prev => prev+1);
        })
    }

    return(
        <Scontainor>
            <Slist>{data.listTitle}</Slist>
            <SdelButton onClick={()=>{delList(data.listNum)}}>
                <MdOutlineCancel /> 
            </SdelButton>
        </ Scontainor>
    )
}

export default InnerList;