import React, {useState} from 'react'
import styled from 'styled-components'
import Toggle from './Toggle'
import { useRecoilState } from 'recoil'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'
import { webPort } from "../../port";
import {sidebarWorkSpace, sidebarChat, projectName} from "../../Atoms/atom"
import WorkSpaceLi from './WorkSpaceLi'
import ChatSpaceLi from './ChatSpaceLi'

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

const SPinput = styled.input`
  background : rgba(255, 255, 100, 0.6);
  padding : 5px;
  font-size : 30px;
  border : 1px solid black;
  border-radius : 15px;
  :hover{
    background : rgba(230, 230, 100, 0.6);
  }
  :focus{
    background : rgba(245, 245, 100, 0.6);
  }
`

const STdiv = styled.div`
  display : flex;
  width : 377px;
  height : 46px;
  background : rgba(255, 255, 100, 0.6);
  padding : 5px;
  font-size : 30px;
  border : 1px solid black;
  border-radius : 15px;
  :hover{
    background : rgba(230, 230, 100, 0.6);
  }
  :focus{
    background : rgba(245, 245, 100, 0.6);
  }
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
  const {projectNum} = useParams();
  const [collabEmail, setCollabEmail] = useState('')
  const [collaborator, setCollaborator] = useState([])
  const [forceRerender, setForceRerender] = useState(0);
  const [name, setName] = useRecoilState(projectName);
  const [workSpaceLi, setWorkSpaceLi] = useRecoilState(sidebarWorkSpace)
  const [chatSpaceLi, setChatSpaceLi] = useRecoilState(sidebarChat)
  const [modify, setModify] = useState(0);

  const afterLeaveTeam = () => {
    document.location.assign('/project');
  }

  const deleteProject = ()=>{
    axios({ // 프로젝트 삭제
      url: `http://${webPort.express}/delProject`, // 통신할 웹문서
      method: 'delete', // 통신할 방식
      data : {
        projectNum : projectNum,
      },
      withCredentials : true,
    }).then((res)=>{
      if(res.data.success===2){
        alert("권한이 없습니다.")
      } else {
        afterLeaveTeam()
      }
    })
  }

  const deleteCollaborator = ()=>{
    axios({ // 프로젝트 이탈
      url: `http://${webPort.express}/delCollaborator`, // 통신할 웹문서
      method: 'delete', // 통신할 방식
      data : {
        projectNum : projectNum,
      },
      withCredentials : true,
    }).then(()=>{afterLeaveTeam()})
  }

  const addCollaborator = ()=>{
    axios({ // 프로젝트 추가
      url: `http://${webPort.express}/createCollaborator`, // 통신할 웹문서
      method: 'post', // 통신할 방식
      data : {
        projectNum : projectNum,
        userEmail : collabEmail,
      },
      withCredentials : true,
    }).then((res)=>{
      if(res.data.success === 2){
        alert("이미 존재하는 유저입니다.")
      }
      setForceRerender(prev => prev+1)
    })
  }

  const changeProjectTitle = (e)=>{
    setName(e.target.value);
  }

  useEffect(()=>{
    axios({ // 프로젝트 이름 변경
      url: `http://${webPort.express}/changeProjectName`, // 통신할 웹문서
      method: 'put', // 통신할 방식
      data : {
        projectNum : projectNum,
        name : name,
      },
      withCredentials : true,
    })
  }, [name])
  

  useEffect(()=>{
    axios({//프로젝트 협업자 읽기
      url: `http://${webPort.express}/readProjectCollaborator/${projectNum}`, // 통신할 웹문서
      method: 'get', // 통신할 방식
      withCredentials : true,
    }).then(res=>{setCollaborator(res.data.data)})

    axios({ // 프로젝트 정보 읽기
      url: `http://${webPort.express}/readProjectInfo/${projectNum}`, // 통신할 웹문서
      method: 'get', // 통신할 방식
      withCredentials : true,
    }).then((res)=>{
      setName(res.data.data.projectTitle);
    })
  }, [forceRerender])
  return (
    <SSettingWrap>
        <h1>프로젝트 명</h1>
        {
        modify===0?
          <STdiv onClick={()=>{setModify(1)}}>{name}</STdiv>:
          <SPinput type="text" onKeyDown={(e)=>{if(e.key==='Enter'){if(name!==''){setModify(0)}else{alert("제목은 공백이 될 수 없습니다.")}}}} onChange={(e)=>{changeProjectTitle(e)}} value={name} />
        }
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
        }}>팀 이탈하기</SLeaveBtn> 
        <br />
        <SDelBtn onClick={()=>{
          deleteProject();
        }}>프로젝트 제거</SDelBtn>
        <br />
        <Sspan>워크스페이스 목록</Sspan>
        <SworkListUl>
        {
          workSpaceLi.map((data, i)=>{
            return <WorkSpaceLi key={i} id={data.workSpaceNum}>a</WorkSpaceLi>
          })
        }
        </SworkListUl>
        <Sspan>채팅 방 목록</Sspan>

        <SworkListUl>
        {
          chatSpaceLi.map((data, i)=>{
            return <ChatSpaceLi key={i} id={data.chatSpaceNum}>a</ChatSpaceLi>
          })
        }
        </SworkListUl>
        

    </SSettingWrap>
  )
}

export default Setting