import React from "react";
import styled from "styled-components";

const Scontainor = styled.div`
    width: 70vw;
    height: 100vh;
`
const Sselectdiv = styled.div`
    display:flex;
    width: 50%;
    border: 1px solid black;
    border-radius: 10px;
    flex-direction:column;
    text-align:center;
    margin-top:30vh;
    margin-left:20vw;
    align-items:center;
`

const Sbtn = styled.button`
    width:70%;
    margin-top:10px;
`
const NewSpace = ()=>{
    
    return(
        <Scontainor>
            <Sselectdiv>
                <h3>어떤 타입을 추가하시겠습니까?</h3>
                <Sbtn>작업목록</Sbtn>
                <Sbtn>문서</Sbtn>
            </Sselectdiv>
        </Scontainor>
    )
}

export default NewSpace;