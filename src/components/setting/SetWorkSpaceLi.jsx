import React, {useState} from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { forceRerender, sidebarWorkSpaceLi } from '../../Atoms/atom'
import { useEffect } from 'react'
import axios from 'axios'
import { MdOutlineCancel } from 'react-icons/md'
import { useParams } from 'react-router-dom'

const Sli = styled.li`
`

const SdelButton = styled.button`
`

const Scontainor = styled.div`
    display:flex;
    weidth: 200px;
    justify-contents:flex-start;
`


const SetWorkSpaceLi = ({id}) =>{
    const [settingWorkSpaceList, setSettingWorkSpaceList] = useRecoilState(sidebarWorkSpaceLi({id: id}))
    const [ReRender, setReRender] = useRecoilState(forceRerender);
    const {projectNum} = useParams();
    
    useEffect(()=>{},[ReRender])

    const deleteWorkSpace = (workSpaceNum) => {
    axios({
        url: `http://localhost:1004/delWorkSpace`,
        method: 'delete',
        withCredentials: true,
        data: {
        workSpaceNum: workSpaceNum,
        projectNum: projectNum,
        }
    }).then((res)=>{
        console.log(res);
        setReRender((prev)=>{if(prev==1){return 0} else return 1});
    })
    };
  
    return (
        <Scontainor>
            <Sli>{settingWorkSpaceList.spaceTitle}</Sli>
            <SdelButton onClick={()=>{deleteWorkSpace(settingWorkSpaceList.workSpaceNum)}}>
            <MdOutlineCancel /> 
            {/* 전체 채팅이 디폴트로 들어가 있어서 채팅 타입이 디폴트 값이면 삭제 버튼이 랜더링 안되게끔하기 */}
            </SdelButton>
        </Scontainor>
    )
}

export default SetWorkSpaceLi