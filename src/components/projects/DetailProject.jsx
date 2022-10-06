import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { useDrag, useDrop } from 'react-dnd';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { projectForceRerender, projectName } from '../../Atoms/atom';
import { webPort } from '../../port';
import { useEffect } from 'react';

// 프로젝트 들어가는 div

// 프로젝트 바깥 div
const InnerProject = styled.div`
    margin-left: 20px;    
`;

// 프로젝트 div
const DisplayProject = styled.div`
    height:100%;
    width:300px;
    border-radius:5%;
    background-color:lightgrey;
    align-items:flex-end;
    display:flex;
    :hover{
        background-color: grey;
    }
`;

const Projectname = styled.span`
    height: 20px;
`;  


const DetailProject = ({index, data}) => {
    const [aprojectForceRerender,setProjectForceRerender] = useRecoilState(projectForceRerender);
    const [name, setName] = useRecoilState(projectName);

    const [{ isDragging }, dragRef, previewRef] = useDrag(
    () => ({
      type: 'project',
      item: { index },
      collect: (monitor) => ({ // 드래그 되었을 때
        isDragging: monitor.isDragging(),
      }),
      end: (item) => {
        axios({
            url: `http://${webPort.express}/changeMyProjectOrder`,
            method: 'put',
            withCredentials: true,
            data: {
                order: item.index,
                targetOrder: index,
            }
        }).then(()=>{
            setProjectForceRerender(prev=>prev+1)
        })
      },
    })
  )

  const [{isOver}, drop] = useDrop({
    accept: 'project',
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

    return(
        <InnerProject ref={node => dragRef(drop(node))}>
            <Link onClick={()=>{setName(data.projectTitle)}} style={{ textDecoration: 'none', color : 'black' }} to={`/main/${data.projectNum}/calendar`}>
            <DisplayProject>
                    <Projectname>
                        &nbsp;{data.projectTitle}
                    </Projectname>
            </DisplayProject>
            </Link>
        </InnerProject>
    )

};

export default DetailProject;