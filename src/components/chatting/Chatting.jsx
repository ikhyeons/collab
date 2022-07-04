import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import styled from "styled-components";
import ChatUser from './ChatUser'

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
    position : relative;
`;

const Sinput = styled.textarea`
    border: none;
    font-size : 20px;
    width: 90%;
    margin-left: 10px;
    margin-top: 8px;
    background : lightyellow;
    padding : 7px;
    resize : none;
`;

const Sbutton = styled.button`
    width:60px;
    height:60px;
    margin-bottom:3px;
    position : absolute;
    top : 5px;
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

    useEffect(()=>{
        console.log('ㅎㅇ');
        scrollRef.current.scrollIntoView({behavior:'smooth', block:'end'});
    }, [myChat])

    useEffect(()=>{
        if(chat==='\n'){
            setChat('');
        }
        scrollRef.current.scrollIntoView({behavior:'smooth', block:'end'});
    }, [chat])

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
                        onChange={(e)=>{
                            console.log(chat);
                            if(e.key !== 'Enter'){
                                setChat(e.target.value);
                            } else {
                                e.preventDefault();
                            }
                        }}
                        value={chat}
                        onKeyPress={(e)=>{
                            if(e.shiftKey && e.key === 'Enter'){
                                setChat(e.target.value);
                            }
                            else if(e.key === 'Enter' && chat !== ''){
                                addChat();
                            }
                        }}
                    />
                    <Sbutton onClick={()=>{if(chat !== ''){addChat()}}}>입력</Sbutton>
                </Schatdiv>
             </Schatcon>
             
             <ChatUser />
        </Scontainor>
    )
}

export default Chatting;