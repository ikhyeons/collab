import React, {useState ,useCallback} from 'react'
import styled, { keyframes } from 'styled-components'
import { Link } from 'react-router-dom'
import { FaSpinner } from 'react-icons/fa'



const Sli = styled.li`
    list-style : none;
    margin : 2px;
    height : 35px;
    font-size : 17px;
    position : relative;
    width : 100%;
    padding-top : 3px;
    border-bottom : 1px solid rgb(205, 205, 205);
`

const Snum = styled.span`
    width : 12%;
    text-align : center;
    display : inline-block;
    border-right : 1px solid rgb(205, 205, 205);
`

const Stitle = styled.span`
    position : absolute;
    width : 44%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color : black;
    :hover{
        text-decoration : underline;
    }
`

const Swriterwrap = styled.span`
    position : absolute;
    right : 105px;
    width : 23%;
    text-align : center;
`

const Swriter = styled.span`
    text-align : center;
    border : 2px solid purple;
    border-radius : 10px;
    background : rgb(205, 0, 205);
    color : white;
    cursor : pointer;
    font-size : 15px;
    :hover{
        background : rgb(235, 0, 235);
    }
`

const Sdate = styled.span`
    position : absolute;
    right : 0px;
    width : 21%;
    max-width : 95px;
`
const Sul = styled.ul`
    overflow-Y : auto;
    overflow-X : hidden;
    height : 97%;

    &::-webkit-scrollbar{
        width: 7px;
        background : rgba(240,240,150,1);
    }

    &::-webkit-scrollbar-thumb{
        height: 17%;
        background-color: rgba(255,255,170,1);
        border : 1px solid yellow;
        border-radius: 5px;    
    }
`

const SloadBox = styled.div`
    height : 80px;
    text-align : center;
`
const rotation = keyframes`
  from{
    transform: rotate(0deg)
  }
  to{
    transform: rotate(360deg)
  }

`;

const opacity = keyframes`
  0%{
    opacity : 1;
  }
  50%{
    opacity : 0;
  }
  100%{
    opacity : 1;
  }
`;

const SloadingSpin = styled.span`
    display : inline-block;
    transform-origin: 50% 70%; 
    width : 50px;
    height : 50px;
    animation: ${rotation} 1.5s linear infinite;
`

const SloadingOpacity = styled.span`
    animation: ${opacity} 2s linear infinite;
`



function DocList(prop) {
    
    const [isBottom, setIsBottom] = useState(0);

    return (
        <Sul
            onScroll={
                useCallback((e)=>{
                    if(e.target.scrollTop + e.target.offsetHeight + 1 == e.currentTarget.scrollHeight){
                        setIsBottom(1);
                    }
                })
            }
        >
            {
                prop.data.map((data)=>{
                    return (
                            <Sli key={data.num}>
                                <Snum>{data.num}</Snum>
                                <Link to = {`./${data.num}`}><Stitle num={data.num}>{data.title}</Stitle></Link>
                                <Swriterwrap><Swriter>{data.writer}</Swriter></Swriterwrap>
                                <Sdate>{data.makeDate}</Sdate>
                            </Sli>
                        )
                    }
                )
            }
            <SloadBox>{isBottom ==1? <SloadingOpacity><SloadingSpin><FaSpinner style={{fontSize : '40px', marginTop : '15px' }}/></SloadingSpin></SloadingOpacity> : null}</SloadBox>
        </Sul>
    )
}


export default DocList