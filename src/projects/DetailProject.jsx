import React from 'react'
import styled from 'styled-components'
const Detaildiv = styled.div`
    height: 90%;
    width: height;
    margin-left: 20px;
    margin-right:20px;
    display:flex;
    text-align:center;
`;
const InnerProject = styled.div`
    margin-left: 20px;    
`;

const DisplayProject = styled.div`
    height:90%;
    width:200px;
    border-radius:5%;
    background-color:lightgrey;
`;

const DetailProject = (props) => {
    return(
            <Detaildiv>
                {props.project && props.project.map((item, i)=>(
                    <InnerProject key={i}>
                        <DisplayProject/>
                    </InnerProject>
                ))}
            </Detaildiv>
    )

};

export default DetailProject;