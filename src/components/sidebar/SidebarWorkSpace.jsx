import React,{useState} from 'react'
import styled from 'styled-components'

import { useRecoilState } from 'recoil'
import {sidebarWorkSpace} from '../../Atoms/atom'
import SidebarWorkSpaceLi from './SidebarWorkSpaceLi'

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
  const [workSpaceList, setWorkSpaceList] = useRecoilState(sidebarWorkSpace);

  //워크스페이스 리스트 추가하는 함수
  const addWorkSpaceList = () => {
    setWorkSpaceList((prev)=>{
      let newList = [...prev, prev.length +1]
      return newList;
    })
  }

  const accordion = ()=>{ //클릭했을 경우 숨겨져 있으면 보이게하고, 보이는 상태이면 숨기게함.
    if (hidden === 0 ) setHidden(1)
    else setHidden(0)
  }

  return (
    <div>
        <Stitle onClick={()=>{accordion()}}>워크스페이스</Stitle>
        <Sul hidden = {hidden}>
          {workSpaceList.map((data , i )=>{
            return <SidebarWorkSpaceLi key={i} num = {data}></SidebarWorkSpaceLi>
          })}
          <SaddBtn onClick={()=>{addWorkSpaceList()}}>+</SaddBtn>
        </Sul>
    </div>
  )
}

export default SidebarWorkSpace