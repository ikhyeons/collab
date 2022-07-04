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
    width: 85%;
    border: 1px solid grey;
`;

const Sparticipant = styled.div`
    width: 15%;
    border: 1px solid grey;
`;

const Suser = styled.div``;
const SuserTitle = styled.h4`

`
const Stitle = styled.h3``;

const Schatting = styled.div`
    height: 85%;
    overflow:auto;
    position:relative;
`;

const Smychat = styled.div`
    position:relative;
    margin-right: ${ props => props.my == 1 ? '30px' : null };
    margin-left: ${ props => props.my == 0 ? '30px' : null };
    right:${ props => props.my == 1 ? '0px' : null };
    left: ${ props => props.my == 0 ? '0px' : null };
    padding: 10px;
    width:300px;
    min-height:60px;
    color: #FFF;
    border-radius: 10px;
    background-color: grey;
    word-wrap:break-word;
    :after{
        content:"";
        position:absolute;
        top:21px;
        right:${props => props.my == 1 ? '-30px' : '300px'};
        border-left:${props => props.my == 1 ? '30px solid grey' : null};
        border-right:${props => props.my == 0 ? '30px solid grey' : null};
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
    }
`

const Snmychat = styled.div`
    position:relative;
    left:0;
    margin-left: 30px;
    padding: 10px;
    width:300px;
    min-height:60px;
    color: #FFF;
    border-radius: 10px;
    background-color: grey;
    word-wrap:break-word;
    
    :after{
        content:"";
        position:absolute;
        top:21px;
        right:200px;
        border-right:30px solid grey;
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

const Scell = styled.div`
    display : flex;
    position : relative;
    min-height:62px;
    margin-bottom:20px;
    width : 100%;
    justify-content : ${ props => props.my == 1 ? 'flex-end' : null};
`;

const Chatting = ()=>{
    const [myChat, setMychat] = useState([
        {
            my:0,
            contents:'뭐해',
        },
    ]);
    const [chat, setChat] = useState('');
    const scrollRef = useRef();

    const addChat = () =>{
        setMychat((prev)=>{
            let newchat = [
                ...prev,
                {
                    my:1,
                    contents:chat,
                }
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
                        return <Scell my={data.my} key={i+1}><Smychat key={i} my={data.my}>{data.contents}</Smychat></Scell>;
                        
                    })}
                    <div ref={scrollRef} style={{height:'1px'}}/>
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