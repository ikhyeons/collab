import React from 'react'
import styled from 'styled-components'

// 프로젝트 들어가는 div
const Detaildiv = styled.div`
    height: 90%;
    width: height;
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
    height:90%;
    width:250px;
    border-radius:5%;
    background-color:lightgrey;
    align-items:flex-end;
    display:flex;
`;

const Projectname = styled.span`
    height: 20px;
`;  
const DetailProject = (props) => {
    
    return(
            <Detaildiv>
                {props.project && props.project.map((item, i)=>(
                    <InnerProject key={i}>
                        <DisplayProject>
                            <Projectname>&nbsp;프로젝트{i+1}</Projectname>
                        </DisplayProject>
                    </InnerProject>
                ))}
            </Detaildiv>
    )

};

export default DetailProject;