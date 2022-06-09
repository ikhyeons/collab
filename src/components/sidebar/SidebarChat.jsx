import React, {useState} from 'react'
import styled from 'styled-components'

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
        <Stitle>채팅</Stitle>
        <Sul>
        {chatList.map((data , i )=>{
            return <Sli key = {i}>{data.name}</Sli>
          })}
          <SaddBtn onClick={()=>{addChat()}}>+</SaddBtn>
        </Sul>
    </div>
  )
}

export default SidebarChat