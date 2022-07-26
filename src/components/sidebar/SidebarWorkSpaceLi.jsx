import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useDrag, useDrop } from 'react-dnd'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { sidebarWorkSpaceLi, sidebarWorkSpace } from '../../Atoms/atom'

const Sli = styled.li`
  width : 100%;
  background : ${prop=> prop.isOver?'rgb(185, 250, 170)':'none'};
  :hover{
    background : rgb(245, 255, 200);
    cursor : pointer;
  }
`

function SidebarWorkSpaceLi({index, id, moveFunction}) {

    const [workSpaceLi, setWorkSpaceLi] = useRecoilState(sidebarWorkSpaceLi({id : id}))
    const resetLi = useResetRecoilState(sidebarWorkSpaceLi({id : id}));
  
    useEffect(()=>{resetLi()}, [workSpaceLi]);

    const [{ isDragging }, dragRef, previewRef] = useDrag(
      () => ({
        type: 'sidebarWorkSpaceList',
        item: { index, id },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
        end: (item) => {
          //item.index = 떨어진 놈의 인덱스 index = 집은 놈의 인덱스 id = 집은 놈의 아이디
          moveFunction(item.index, index);
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
        console.log(index);
      },
      collect : (monitor)=>({
        isOver : monitor.isOver()
      })
    })

  return (
    <Link to={`/main/workspace/${workSpaceLi.type}/${workSpaceLi.id}`} style={{ textDecoration: 'none', color : 'black'}}><Sli isOver={isOver} ref={node => dragRef(drop(node))} >-{id}</Sli></Link>
  )
}

export default SidebarWorkSpaceLi