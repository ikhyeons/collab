import React, {useState} from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Stitle = styled.div`
  
  padding-left : 10px;
  :hover{
    background : yellow;
    cursor : pointer;
  }
`

const Sul = styled.ul`
  list-style : none;  
  margin-left : 30px;
  font-size : 23px;
  display : ${prop => prop.hidden == 1? 'none':'block'}
`
const Sli = styled.li`
  width : 100%;
  :hover{
    background : yellow;
    cursor : pointer;
  }
`

const SaddBtn = styled.li`
  width : 100%;
  :hover{
    background : yellow;
    cursor : pointer;
  }
`

const SidebarChat = () => {
  //숨김처리를 위한 변수
  const [hidden, setHidden] = useState(0);
  //채팅 리스트
  const [chatList, setChatList] = useState([
    {
      num : 1,
      name : '전체채팅',
    },
    {
      num : 2,
      name : '누구와의채팅',
    },
  ])

  const addChat = () => { //채팅 리스트 추가하는 함수
    setChatList((prev)=>{
      let newList = [
        ...prev, 
        {
          num : prev.length,
          name : `새로운 채팅`,
        },
      ]
      return newList;
    })
  }

  return (
    <div>
        <Stitle onClick={()=>{ // 클릭했을 경우 숨겨져있으면 보이게, 보이고 있으면 숨기기.
          if (hidden ==0) setHidden(1)
          else setHidden(0)
        }}>채팅</Stitle>
        <Sul hidden = {hidden}>
        {chatList.map((data , i )=>{
            return <Link to={`/chat/${i}`}  key = {i} style={{ textDecoration: 'none', color : 'black'}}><Sli>{data.name}</Sli></Link>//${i}에서 i는 채팅 번호
          })}
          <SaddBtn onClick={()=>{addChat()}}>+</SaddBtn>
        </Sul>
    </div>
  )
}

export default SidebarChat