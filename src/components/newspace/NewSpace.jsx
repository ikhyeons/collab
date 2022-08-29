import axios from "axios";
import React from "react";
import styled from "styled-components";

const Scontainor = styled.div`
    width: 100%;
    height: 100vh;
`
const Sselectdiv = styled.div`
    display:flex;
    width: 30%;
    border: 4px solid yellow;
    border-radius: 10px;
    flex-direction:column;
    text-align:center;
    margin-top:30vh;
    margin-left:20vw;
    align-items:center;
    font-size : 20px;
`

const Sh3 = styled.div`
    margin-bottom : 15px;
    font-weight : bold;
`

const Sbtn = styled.button`
    background : lightyellow;
    margin-bottom : 5px;
    padding : 5px;
    border-radius : 5px;
    border : 1.5px solid black;
    cursor : pointer;
    width:80%;
    :hover {
        background : rgb(230, 230, 200);
    }

`
const NewSpace = ()=>{
    const changeTypeWorkList = ()=>{
        axios({
            url: `http://localhost:1004/changeWorkSpaceType`,
            method: 'put',
            withCredentials : true,
            data:{
                projectNum: window.location.pathname.split('/')[3],
                workSpaceNum: window.location.pathname.split('/')[5],
                changeType: 'board',
                changeTitle: '작업공간',
            }
          }).then((res)=>{
            window.location.reload();
            console.log(res);
        })
    };

    const changeTypeList = ()=>{
        axios({
            url: `http://localhost:1004/changeWorkSpaceType`,
            method: 'put',
            withCredentials : true,
            data:{
                projectNum: window.location.pathname.split('/')[3],
                workSpaceNum: window.location.pathname.split('/')[5],
                changeType: 'li',
                changeTitle: '문서',
            }
          }).then((res)=>{
            window.location.reload();
            console.log(res);
        })
    };
    
    return(
        <Scontainor>
            <Sselectdiv>
                <Sh3>어떤 타입을 추가하시겠습니까?</Sh3>
                <Sbtn onClick={()=>{changeTypeWorkList()}}>작업목록</Sbtn>
                <Sbtn onClick={()=>{changeTypeList()}}>문서</Sbtn>
            </Sselectdiv>
        </Scontainor>
    )
}

export default NewSpace;