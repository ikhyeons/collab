import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useEffect } from "react";
import axios from "axios";
import { projectState, projectUrl } from "../../Atoms/atom";
import { webPort } from "../../port";

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

const DetailProject = () => {
    const [project, setProject] = useRecoilState(projectState);
    useEffect(()=>{
        axios({
            url: `http://${webPort.express}/readMyProjectList`,
            withCredentials : true,
            method: 'get',
          }).then((res)=>{setProject(res.data.data)});
    }, [])
    return(
        <Detaildiv className='gd'>
            {project && project.map((item, i)=>(
                    <InnerProject key={i}>
                        <Link style={{ textDecoration: 'none', color : 'black' }} to={`/main/${item.projectNum}/calendar`}>
                        <DisplayProject>
                                <Projectname>
                                    &nbsp;{item.projectTitle}
                                </Projectname>
                        </DisplayProject>
                        </Link>
                    </InnerProject>
            ))}
        </Detaildiv>
        
    )

};

export default DetailProject;