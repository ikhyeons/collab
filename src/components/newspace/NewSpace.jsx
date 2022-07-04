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
    
    return(
        <Scontainor>
            <Sselectdiv>
                <Sh3>어떤 타입을 추가하시겠습니까?</Sh3>
                <Sbtn>작업목록</Sbtn>
                <Sbtn>문서</Sbtn>
            </Sselectdiv>
        </Scontainor>
    )
}

export default NewSpace;