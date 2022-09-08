import React from 'react';
import styled from 'styled-components';
import Request from './Request'
import { webPort } from "../../port";

const RequestContainer = styled.div`
    width : 35%;
    min-width : 400px;
    min-height : 620px;
    height : 94vh;
    justify-content:center;
    align-items:center;
    display:flex;
`;


const RequestMain = ()=>{
    return(
        <RequestContainer>
            <Request />
        </RequestContainer>
    );
};

export default RequestMain;