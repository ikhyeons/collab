import React from 'react'
import { useRecoilState } from 'recoil'
import {sidebarWorkSpaceLi, sidebarForceRerender} from '../../Atoms/atom'
import styled from 'styled-components'
import { MdOutlineCancel } from 'react-icons/md'
import axios from 'axios'
import { webPort } from '../../port'
import { useParams } from 'react-router-dom'

const SdelButton = styled.button`
  background : rgba(0, 0, 0, 0);
  cursor : pointer;
  border : none;
  :hover{
    background : rgba(0, 0, 0, 0.2);
  }
`


function WorkSpaceLi(prop) {
    const {projectNum} = useParams()
    const [myData, setMyData] = useRecoilState(sidebarWorkSpaceLi({id : prop.id}))
    const [, setSidebarForceRerender] = useRecoilState(sidebarForceRerender);
    
    const deleteWorkSpace = (workSpaceNum) => {
        axios({
          url: `http://${webPort.express}/delWorkSpace`,
          method: 'delete',
          withCredentials: true,
          data: {
            workSpaceNum: workSpaceNum,
            projectNum : projectNum,
          }
        }).then((res)=>{
            if(res.data.success===2){alert("권한이 없습니다.")}
          setSidebarForceRerender((prev)=>{if(prev==1){return 0} else return 1})
        })
      };
    return (
    <div>
        {myData.spaceTitle}
        <SdelButton onClick={(e)=>{e.stopPropagation(); deleteWorkSpace(myData.workSpaceNum);}}>
            <MdOutlineCancel style={{cursor : 'pointer'}} /> 
        </SdelButton>
    </div>
  )
}

export default WorkSpaceLi