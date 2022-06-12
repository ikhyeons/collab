import React from 'react';
import styled from 'styled-components';
import Request from './Request'

const RequestContainer = styled.div`
    width : 25vw;
    height : 100vh;
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