import React,{useState} from 'react'
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

const SidebarWorkSpace = () => {

  const [workSpaceList, setWorkSpaceList] = useState([
    {
      num : 1,
      name : '회의록',
    },
    {
      num : 2,
      name : '문서',
    },
    {
      num : 3,
      name : '작업목록',
    },
    {
      num : 4,
      name : '추가된페이지',
    },
  ])

  const addWorkSpaceList = () => {
    setWorkSpaceList((prev)=>{
      let newList = [
        ...prev, 
        {
          num : prev.length,
          name : `새로운 공간`,
        },
      ]
      return newList;
    })
  }

  return (
    <div>
        <Stitle>워크스페이스</Stitle>
        <Sul>
          {workSpaceList.map((data , i )=>{
            return <Sli key = {i}>{data.name}</Sli>
          })}
          <SaddBtn onClick={()=>{addWorkSpaceList()}}>+</SaddBtn>
        </Sul>
    </div>
  )
}

export default SidebarWorkSpace