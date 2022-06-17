import React,{useState} from 'react'
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
  display : ${prop => prop.hidden === 1? 'none':'block'}
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

  //숨김처리를 위한 변수
  const [hidden, setHidden] = useState(0);

  //워크스페이스 리스트
  const [workSpaceList, setWorkSpaceList] = useState([
    {
      num : 1,
      type : 'li',
      name : '회의록',
    },
    {
      num : 2,
      type : 'li',
      name : '문서',
    },
    {
      num : 3,
      type : 'li',
      name : '작업목록',
    },
    {
      num : 4,
      type : 'board',
      name : '추가된페이지',
    },
  ])

  //워크스페이스 리스트 추가하는 함수
  const addWorkSpaceList = () => {
    setWorkSpaceList((prev)=>{
      let newList = [
        ...prev, 
        {
          num : prev.length,
          type : 'li',
          name : `새로운 공간`,
        },
      ]
      return newList;
    })
  }

  return (
    <div>
        <Stitle onClick={()=>{ //클릭했을 경우 숨겨져 있으면 보이게하고, 보이는 상태이면 숨기게함.
          if (hidden === 0 ) setHidden(1)
          else setHidden(0)
        }}>워크스페이스</Stitle>
        <Sul hidden = {hidden}>
          {workSpaceList.map((data , i )=>{
            return <Link to={`/main/workspace/${data.type}/${i}`} key = {i} style={{ textDecoration: 'none', color : 'black'}}><Sli>{data.name}</Sli></Link>//${i}에서 i는 워크스페이스 번호
          })}
          <SaddBtn onClick={()=>{addWorkSpaceList()}}>+</SaddBtn>
        </Sul>
    </div>
  )
}

export default SidebarWorkSpace