import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { useDrag, useDrop } from 'react-dnd';

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
`;

const Projectname = styled.span`
    height: 20px;
`;  
// const [{ isDragging }, dragRef, previewRef] = useDrag(
//     () => ({
//       type: 'sidebarChatSpaceList',
//       item: { index, id },
//       collect: (monitor) => ({
//         isDragging: monitor.isDragging(),
//       }),
//       end: (item) => {
//         //item.index = 떨어진 놈의 인덱스 index = 집은 놈의 인덱스 id = 집은 놈의 아이디
//         moveFunction(item.index, index);
//       },
//     })
//   )

//   const [{isOver}, drop] = useDrop({
//     accept: 'sidebarChatSpaceList',
//     hover: (item) => {
//       if (item.index === index) {
//         return null
//       }
//       //item.index = 집은놈의 인덱스 index = 올라간 놈의 인덱스
//       item.index = index;
//     },
//     collect : (monitor)=>({
//       isOver : monitor.isOver()
//     })
//   })

const DetailProject = (props) => {
    return(
        <InnerProject >
            <Link style={{ textDecoration: 'none', color : 'black' }} to={`/main/${props.data.projectNum}/calendar`}>
            <DisplayProject>
                    <Projectname>
                        &nbsp;{props.data.projectTitle}
                    </Projectname>
            </DisplayProject>
            </Link>
        </InnerProject>
            
        
    )

};

export default DetailProject;