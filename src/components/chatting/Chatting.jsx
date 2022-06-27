import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import styled from "styled-components";

const Scontainor = styled.div`
    width: 80%;
    height:97vh;
    display:flex;
`;

const Schatcon = styled.div`
    width: 80%;
    border: 1px solid grey;
`;

const Sparticipant = styled.div`
    width: 20%;
    border: 1px solid grey;
`;

const Suser = styled.div``;
const SuserTitle = styled.h4`

`
const Stitle = styled.h3``;

const Schatting = styled.div`
    height: 85%;
    overflow:auto;
    align-items:flex-end;
    display:flex;
    flex-direction:column;
`;

const Sinnerchat = styled.div`
    position:relative;
    margin: 30px;
    padding: 20px;
    width:200px;
    height:60px;
    color: #FFF;
    border-radius: 10px;
    background-color: grey;
    :after{
        content:"";
        position:absolute;
        top:21px;
        right:-30px;
        border-left:30px solid grey;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
    }
`

const Schatdiv = styled.div`
    border-top: 1px solid grey;
`;

const Sinput = styled.input`
    border: none;
    width: 90%;
    margin-left: 10px;
    margin-top: 8px;
`;

const Sbutton = styled.button`
    width:70px;
    height:20px;
    margin-bottom:3px;
`;
const Chatting = ()=>{
    const [myChat, setMychat] = useState([]);
    const [chat, setChat] = useState('');
    const scrollRef = useRef();

    const addChat = () =>{
        setMychat((prev)=>{
            let newchat = [
                ...prev,
                chat,
            ]
            return newchat;        
        })
        setChat('');
    }

    const inputchat = (e)=>{
        setChat(e.target.value);
    }

    useEffect(()=>{
        console.log('ㅎㅇ');
        scrollRef.current.scrollIntoView({behavior:'smooth', block:'end'});
    }, [myChat])

    return (
        <Scontainor>
            <Schatcon>
                <Stitle>채팅/전체 채팅</Stitle>
                <Schatting>
                    {myChat.map((data, i)=>{
                        return(
                        <Sinnerchat key={i}>{data}</Sinnerchat>
                        )
                    })}
                    <div ref={scrollRef} />
                </Schatting>
                <Schatdiv>
                    <Sinput
                        placeholder="내용을 입력해주세요"
                        onChange={(e)=>{inputchat(e)}}
                        value={chat}
                        onKeyPress={(e)=>{
                            if(e.key === 'Enter'){
                                addChat();
                            }
                        }}
                    />
                    <Sbutton onClick={()=>{addChat()}}>입력</Sbutton>
                </Schatdiv>
             </Schatcon>
             <Sparticipant>
                <SuserTitle>참여자 목록</SuserTitle>
                <Suser>
                    @강도경
                    @성익현
                </Suser>
             </Sparticipant>
        </Scontainor>
    )
}

export default Chatting;