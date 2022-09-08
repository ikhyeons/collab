import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';

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

const DetailProject = (props) => {
    const {data} = props;

    return(
        <InnerProject >
            <Link style={{ textDecoration: 'none', color : 'black' }} to={`/main/${data.projectNum}/calendar`}>
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