import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useRecoilState } from 'recoil'
import { sidebarWorkSpaceLi } from '../../Atoms/atom'

const Sli = styled.li`
  width : 100%;
  :hover{
    background : yellow;
    cursor : pointer;
  }
`

function SidebarWorkSpaceLi({num}) {
    const [workSpaceLi, setWorkSpaceLi] = useRecoilState(sidebarWorkSpaceLi({num : num, type : 'li', name : '회의록'}))
    console.log(workSpaceLi);

  return (
        <Link to={`/main/workspace/${workSpaceLi.type}/${workSpaceLi.num}`} style={{ textDecoration: 'none', color : 'black'}}><Sli>{workSpaceLi.name}</Sli></Link>
  )
}

export default SidebarWorkSpaceLi