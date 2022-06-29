import React, {useState} from 'react'
import styled from 'styled-components'
import Toggle from './Toggle'

const SSettingWrap = styled.div`
    background : lightyellow;
    width : 90%;
    height : 100vh;
    padding : 5px;
`

const Sul = styled.ul`
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
function Setting() {

  const [participant, setParticipant] = useState([
    {
      name : '성익현',
    },
    {
      name : '강도경',
    },
    {
      name : '홍길동',
    },
  ])

  return (
    <SSettingWrap>
        <Sspan>초대 보내기</Sspan> <Sform><Sinput type="text" /> <Sbutton>전송</Sbutton></Sform>
        <Sul>
          <Sspan>참가자 리스트</Sspan>
          {participant.map((data, i)=><Sli key={i}>{data.name}</Sli>)}
        </Sul>
        <Sspan>다크모드</Sspan> <Toggle />

        <br />
        <SLeaveBtn>팀 이탈하기</SLeaveBtn> 
        <br />
        <SDelBtn>프로젝트 제거</SDelBtn>

    </SSettingWrap>
  )
}

export default Setting