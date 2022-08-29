import React,{useEffect, useState} from 'react'
import styled from 'styled-components'
import { useRecoilState } from 'recoil'
import {sidebarWorkSpace, projectUrl} from '../../Atoms/atom'
import SidebarWorkSpaceLi from './SidebarWorkSpaceLi'
import axios from 'axios'
import { useParams } from 'react-router-dom'

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
  const [forceRerender, setForceRerender] = useState(0);
  const {projectNum} = useParams();
  useEffect(()=>{
    axios({
      url: `http://localhost:1004/readWorkSpaceList/${projectNum}`, // 통신할 웹문서
      method: 'get', // 통신할 방식
      withCredentials : true,
    }).then((res)=>{
      let NewArray = res.data.data.map((data, i)=>data.workSpaceNum)
      setWorkSpaceList(NewArray);
    })
  }, [forceRerender]);

  const moveFunction = (targetIndex, sourceIndex)=> {
    setWorkSpaceList((prev)=>{
      let newArray = [...prev];
      let innerData = newArray[sourceIndex];
      console.log(`input data is ${innerData}`)
      newArray.splice(sourceIndex, 1);
      newArray.splice(targetIndex, 0, innerData);
      console.log(newArray);
      return newArray
    })
  }

  //워크스페이스 리스트 추가하는 함수
  const addWorkSpaceList = () => {
    axios({
      url: `http://localhost:1004/createWorkSpace`,
      method: 'post',
      withCredentials : true,
      data:{
        projectNum: projectNum,
      }
    }).then((res)=>{
      setForceRerender((prev)=>{if(prev==1){return 0} else return 1});
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
            return <SidebarWorkSpaceLi key={i} index={i} id={data} moveFunction={moveFunction}></SidebarWorkSpaceLi>
          })}
          <SaddBtn onClick={()=>{addWorkSpaceList()}}>+</SaddBtn>
        </Sul>
    </div>
  )
}

export default SidebarWorkSpace