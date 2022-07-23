import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { sidebarWorkSpaceLi, sidebarWorkSpace } from '../../Atoms/atom'

import { useDrag, useDrop } from 'react-dnd'

const Sli = styled.li`
  width : 100%;
  :hover{
    background : yellow;
    cursor : pointer;
  }

  ::before {
    color : black;
    position : absolute;
    left : 15px;
    content : '*';
    font-size : 28px;
    transition: all 0.2s ease-in-out;
  }
`

function SidebarWorkSpaceLi({index, id, moveFunction}) {

    const [workSpaceLi, setWorkSpaceLi] = useRecoilState(sidebarWorkSpaceLi({id : id}))
    const resetLi = useResetRecoilState(sidebarWorkSpaceLi({id : id}));
  
    useEffect(()=>{resetLi()}, [workSpaceLi]);

    const [{ isDragging }, dragRef, previewRef] = useDrag(
      () => ({
        type: 'List',
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

    const [, drop] = useDrop({
      accept: 'List',
      hover: (item) => {
        if (item.index === index) {
          return null
        }
        //item.index = 집은놈의 인덱스 index = 올라간 놈의 인덱스
        item.index = index;
        console.log(index);
      },
    })

  return (
    <Link to={`/main/workspace/${workSpaceLi.type}/${workSpaceLi.id}`} style={{ textDecoration: 'none', color : 'black'}}><Sli ref={node => dragRef(drop(node))} >{id}</Sli></Link>
  )
}

export default SidebarWorkSpaceLi