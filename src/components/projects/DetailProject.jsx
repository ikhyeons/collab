import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';

// 프로젝트 들어가는 div
const Detaildiv = styled.div`
    height: 90%;
    
    margin-left: 20px;
    margin-right:20px;
    display:flex;
`;

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
    const { project } = props;
    console.log('생성됨');
    console.log(project);
    return(
        <Detaildiv className='gd'>
            {props.project && props.project.map((item, i)=>(
                    <InnerProject key={i}>
                        <Link style={{ textDecoration: 'none', color : 'black' }} to="/main/calendar">
                        <DisplayProject>
                                <Projectname>
                                    &nbsp;새 프로젝트{i+1}
                                </Projectname>
                        </DisplayProject>
                        </Link>
                    </InnerProject>
            ))}
        </Detaildiv>
        
    )

};

export default DetailProject;