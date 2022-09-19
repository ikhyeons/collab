import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useDrag, useDrop } from 'react-dnd'
import { useRecoilState } from 'recoil'
import { sidebarWorkSpaceLi, currentWorkSpaceId, sidebarForceRerender, forceRerender } from '../../Atoms/atom'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { webPort } from "../../port";
import {MdOutlineEditNote} from 'react-icons/md'

const Sli = styled.li`
  width : 100%;
  background : ${prop=> prop.isOver?'rgb(185, 250, 170)':'none'};
  :hover{
    background : rgb(245, 255, 200);
    cursor : pointer;
  }
`

const SinputWrap = styled.div`
  width : 100%;
  max-width : 147px;
  height : 100%;
  background : ${prop=> prop.isOver?'rgb(185, 250, 170)':'none'};
`

const Sinput = styled.input`
  width : 100%;
  height : 100%;
`


function SidebarWorkSpaceLi({index, id}) {

    const [workSpaceLi, setWorkSpaceLi] = useRecoilState(sidebarWorkSpaceLi({id : id}))
    const {projectNum} = useParams()
    const [acurrentWorkSpaceId, setCurrentWorkSpaceId] = useRecoilState(currentWorkSpaceId)
    const [asidebarForceRerender, setSidebarForceRerender] = useRecoilState(sidebarForceRerender)
    const [modify, setModify] = useState(0);
    const [name, setName] = useState('')
    const [reRender, setReRender] = useRecoilState(forceRerender);

    useEffect(()=>{
      axios({
        url: `http://${webPort.express}/readWorkSpaceInfo/${id}`, // 통신할 웹문서
        method: 'get', // 통신할 방식
        withCredentials : true,
      }).then((res)=>{
        setWorkSpaceLi({...res.data.data, id : res.data.data.workSpaceNum});
      })
    }, [reRender])

    const [{ isDragging }, dragRef, previewRef] = useDrag(
      () => ({
        type: 'sidebarWorkSpaceList',
        item: { index, id },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
        end: (item) => {
          //item.index = 떨어진 놈의 인덱스 index = 집은 놈의 인덱스 id = 집은 놈의 아이디
          axios({
            url: `http://${webPort.express}/changeWorkSpaceOrder`,
            method: 'put',
            withCredentials : true,
            data:{
              projectNum: projectNum,
              order : item.index,
              targetOrder : index,
            }
          }).then(()=>{setSidebarForceRerender((prev)=>{if(prev==1){return 0} else return 1})})
        },
      })
    )

    const [{isOver}, drop] = useDrop({
      accept: 'sidebarWorkSpaceList',
      hover: (item) => {
        if (item.index === index) {
          return null
        }
        //item.index = 집은놈의 인덱스 index = 올라간 놈의 인덱스
        item.index = index;
      },
      collect : (monitor)=>({
        isOver : monitor.isOver()
      })
    })
    
    

  return (
    <div style={{position : 'relative'}}>
      {
        modify===0?
      <Link onClick={()=>{
        setCurrentWorkSpaceId(workSpaceLi.id)
      }} to={`/main/${projectNum}/workspace/${workSpaceLi.type}/${workSpaceLi.id}`} style={{ textDecoration: 'none', color : 'black'}}>
        <Sli isOver={isOver} ref={node => dragRef(drop(node))} >
          -{workSpaceLi.spaceTitle}
          
          </Sli>
      </Link> :
    <SinputWrap>
    <Sinput value={name} onKeyDown={(e)=>{if(e.key=="Enter"){
      axios({
        url: `http://${webPort.express}/changeWorkSpaceName`,
        method: 'put',
        withCredentials: true,
        data: {
          workSpaceNum : workSpaceLi.id,
          name : name,
        }
      }).then((res)=>{
        setReRender(prev=>prev===0? 1 : 0)
      }).then(()=>{setModify(0);})

    }}} onChange={(e)=>{setName(e.target.value)}} />
      <MdOutlineEditNote onClick={(e)=>{setModify(prev=>prev===0? 1 : 0);e.stopPropagation()}} style={{position : 'absolute', right : '0', cursor : 'pointer'}} />
      </SinputWrap>
      
      }
      <MdOutlineEditNote onClick={(e)=>{setModify(prev=>prev===0? 1 : 0);e.stopPropagation();}} style={{position : 'absolute', right : '0', top : '0', cursor : 'pointer'}} />
      </div>
  )
}

export default SidebarWorkSpaceLi