import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { chatList, currentChatSpaceId } from "../../Atoms/atom";
import ChatUser from './ChatUser'
import axios from "axios";
import io from 'socket.io-client'
import { webPort } from "../../port";

const Scontainor = styled.div`
    width: 80%;
    height:97vh;
    display:flex;
`;

const Schatcon = styled.div`
    width: 85%;
    border: 1px solid grey;
`;

const Stitle = styled.h3``;

const Schatting = styled.div`
    height: 85%;
    overflow:auto;
    position:relative;
`;

const Smychat = styled.div`
    position:relative;
    margin-right: ${ props => props.my === 1 ? '30px' : null };
    margin-left: ${ props => props.my === 0 ? '30px' : null };
    right:${ props => props.my === 1 ? '0px' : null };
    left: ${ props => props.my === 0 ? '0px' : null };
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
        right:${props => props.my === 1 ? '-30px' : '300px'};
        border-left:${props => props.my === 1 ? '30px solid grey' : null};
        border-right:${props => props.my === 0 ? '30px solid grey' : null};
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
    }
`

const Schatdiv = styled.div`
    border-top: 1px solid grey;
    position : relative;
`;

const SchatName = styled.div`
    
`

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
    justify-content : ${ props => props.my === 1 ? 'flex-end' : null};
`;

 const socket = io.connect(`http://${webPort.webSocket}`, {transports : ['websocket']})

const Chatting = ()=>{
    const {chatSpaceNum} = useParams()
    const [allChat, setAllchat] = useRecoilState(chatList);
    const [chat, setChat] = useState('');
    const scrollRef = useRef();
    const [forceRerender, setForceRerender] = useState(0)
    const [acurrentChatSpaceId, setCurrentChatSpaceId] = useRecoilState(currentChatSpaceId);

    const addChat = () =>{
         axios({
             url: `http://${webPort.express}/writeChat`, // 통신할 웹문서
             method: 'post', // 통신할 방식
             data : {
                 chatSpaceNum : chatSpaceNum,
                 innerData : chat,
             },
             withCredentials : true,
           }).then(()=>{
             setChat('');
              socket.emit('message', {chat})})
           .then(()=>{setForceRerender(prev=>{
             if(prev === 0) return 1;
             else if (prev === 1) return 2;
             else return 0;
             })
        })
    }

     useEffect(()=>{
          socket.on("newChat", ()=>{
             setForceRerender(prev=>{
                 return prev+1;
             })
         })
     }, [])

    useEffect(()=>{
        axios({
            url: `http://${webPort.express}/readChatData/${chatSpaceNum}`, // 통신할 웹문서
            method: 'get', // 통신할 방식
            withCredentials : true,
          }).then(res=>{console.log(res); setAllchat(res.data.data)})
    }, [forceRerender, acurrentChatSpaceId])

    useEffect(()=>{
        console.log('ㅎㅇ');
        scrollRef.current.scrollIntoView({behavior:'smooth', block:'end'});
    }, [allChat])

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
                    {allChat.map((data, i)=>{
                        return <Scell my={data.my} key={i+1}>
                                <SchatName>{data.my===1? '나' : data.nickName}</SchatName>
                                <Smychat key={i} my={data.my}>{data.innerData}</Smychat>
                                </Scell>;
                        
                    })}
                    <div ref={scrollRef} style={{height:'1px'}}/>
                </Schatting>
                <Schatdiv>
                    <Sinput
                        placeholder="내용을 입력해주세요"
                        onChange={(e)=>{
                            if(e.key !== 'Enter'){
                                setChat(e.target.value);
                                console.log('hererererere')
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