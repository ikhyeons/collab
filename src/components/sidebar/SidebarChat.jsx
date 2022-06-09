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
  const [hidden, setHidden] = useState(0);
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

  const addChat = () => {
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
        <Stitle onClick={()=>{
          if (hidden ==0) setHidden(1)
          else setHidden(0)
        }}>채팅</Stitle>
        <Sul hidden = {hidden}>
        {chatList.map((data , i )=>{
            return <Link to={`/chat/${i}`}  key = {i} style={{ textDecoration: 'none', color : 'black'}}><Sli>{data.name}</Sli></Link>
          })}
          <SaddBtn onClick={()=>{addChat()}}>+</SaddBtn>
        </Sul>
    </div>
  )
}

export default SidebarChat