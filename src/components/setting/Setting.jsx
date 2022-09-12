import React, {useState} from 'react'
import styled from 'styled-components'
import Toggle from './Toggle'
import { sidebarWorkSpace } from '../../Atoms/atom'
import { useRecoilState } from 'recoil'
import SetWorkSpaceLi from './SetWorkSpaceLi'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'
import { webPort } from "../../port";

const SSettingWrap = styled.div`
    background : lightyellow;
    width : 90%;
    height : 100vh;
    padding : 5px;
`

const Sul = styled.ul`-
  margin : 5px;
`
const Sli = styled.li`
  font-size : 18px;
  list-style : none;
`
const SLeaveBtn = styled.button`
  padding : 5px;
  color : blue;
  font-weight : bold;
  background : rgba(200, 200, 255, 0.5);
  font-size : 18px;
  border-radius : 13px;
  cursor : pointer;
  border : 1px solid blue;
  :hover{
    background : rgba(200, 200, 255, 0.9);
  }
`

const SDelBtn = styled.button`
  padding : 5px;
  color : red;
  font-weight : bold;
  background : rgba(255, 200, 200, 0.5);
  font-size : 18px;
  border-radius : 13px;
  cursor : pointer;
  border : 1px solid red;
  :hover{
    background : rgba(255, 200, 200, 0.9);
  }
`

const Sspan = styled.div`
font-weight : bold;
  font-size : 20px;
`

const Sform = styled.div`
  font-size : 20px;
  background : white;
  margin-left : 3px;
  border : 1px solid gray;
  height : 41px;
  width : 320px;
  border-radius : 17px;
`

const Sinput = styled.input`
  padding : 5px;
  font-size : 20px;
  border : none;
  border-radius : 15px;
`

const Sbutton = styled.button`
  font-size : 20px;
  padding : 3px;
  border : 1px solid gray;
  border-radius : 15px;
  transform : translate(8px, 2px);
`

const SworkListUl = styled.ul`

`

function Setting() {
  const [workSpaceList] = useRecoilState(sidebarWorkSpace);
  const {projectNum} = useParams();
  const [collabEmail, setCollabEmail] = useState('')
  const [collaborator, setCollaborator] = useState([])

  const afterLeaveTeam = () => {
    document.location.assign('/project');
  }

  const deleteProject = ()=>{
    axios({
      url: `http://${webPort.express}/delProject`, // 통신할 웹문서
      method: 'delete', // 통신할 방식
      data : {
        projectNum : projectNum,
      },
      withCredentials : true,
    }).then(res=>{console.log(res)})
  }

  const deleteCollaborator = ()=>{
    axios({
      url: `http://${webPort.express}/delCollaborator`, // 통신할 웹문서
      method: 'delete', // 통신할 방식
      data : {
        projectNum : projectNum,
      },
      withCredentials : true,
    }).then(res=>{console.log(res)})
  }

  const addCollaborator = ()=>{
    axios({
      url: `http://${webPort.express}/createCollaborator`, // 통신할 웹문서
      method: 'post', // 통신할 방식
      data : {
        projectNum : projectNum,
        userEmail : collabEmail,
      },
      withCredentials : true,
    })
  }

  useEffect(()=>{
    axios({
      url: `http://${webPort.express}/readProjectCollaborator/${projectNum}`, // 통신할 웹문서
      method: 'get', // 통신할 방식
      withCredentials : true,
    }).then(res=>{console.log(res.data.data); setCollaborator(res.data.data)})
  }, [])
  return (
    <SSettingWrap>
        <Sspan>초대 보내기</Sspan> 
        <Sform>
          <Sinput type="text" onChange={(e)=>{setCollabEmail(e.target.value)}} value={collabEmail}/> 
          <Sbutton onClick={()=>{addCollaborator(); setCollabEmail('')}}>전송</Sbutton>
        </Sform>
        <Sul>
          <Sspan>참가자 리스트</Sspan>
          {collaborator.map((data, i)=><Sli key={i}>{data.nickName}</Sli>)}
        </Sul>
        <Sspan>다크모드</Sspan> <Toggle />
        
        <br />
        <SLeaveBtn onClick={()=>{
          deleteCollaborator()
          afterLeaveTeam()
        }}>팀 이탈하기</SLeaveBtn> 
        <br />
        <SDelBtn onClick={()=>{
          deleteProject();
          afterLeaveTeam()
        }}>프로젝트 제거</SDelBtn>
        <br />
        <Sspan>워크스페이스 목록</Sspan>
        <SworkListUl>
          {workSpaceList.map((data, i)=>{
            return <SetWorkSpaceLi key={i} index={i} id={data}></SetWorkSpaceLi>
          })}
        </SworkListUl>
        

    </SSettingWrap>
  )
}

export default Setting