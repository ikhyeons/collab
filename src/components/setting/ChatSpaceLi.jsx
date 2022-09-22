import React from 'react'
import { useRecoilState } from 'recoil'
import {sidebarChatLi, sidebarForceRerender} from '../../Atoms/atom'
import styled from 'styled-components'
import { MdOutlineCancel } from 'react-icons/md'
import axios from 'axios'
import { webPort } from '../../port'


const SdelButton = styled.button`
  background : rgba(0, 0, 0, 0);
  cursor : pointer;
  border : none;
  :hover{
    background : rgba(0, 0, 0, 0.2);
  }
`









function ChatSpaceLi(prop) {
    const [myData, setMyData] = useRecoilState(sidebarChatLi({num : prop.id}))
    const [, setSidebarForceRerender] = useRecoilState(sidebarForceRerender);
  
    console.log(myData)
    const deleteChat = (chatSpaceNum) => {
        axios({
          url: `http://${webPort.express}/delChatSpace`,
          method: 'delete',
          withCredentials: true,
          data: {
            chatSpaceNum: chatSpaceNum,
          }
        }).then((res)=>{
          setSidebarForceRerender((prev)=>{if(prev==1){return 0} else return 1})
        })
      };
  
    return (
    <div>
        {myData.spaceTitle}
        <SdelButton onClick={(e)=>{e.stopPropagation(); deleteChat(myData.chatSpaceNum);}}>
            <MdOutlineCancel style={{cursor : 'pointer'}} /> 
        </SdelButton>
    </div>
  )
}

export default ChatSpaceLi