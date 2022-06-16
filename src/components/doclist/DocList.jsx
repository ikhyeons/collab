import React from 'react'
import styled from 'styled-components'

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
    width : 45%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

const Swriterwrap = styled.span`
    position : absolute;
    right : 105px;
    width : 22%;
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
    text-overflow : ellipsis; 
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


function DocList(prop) {
    return (
        <Sul>
            {
                prop.data.map((data)=>{
                    return (<Sli key={data.num}>
                            <Snum>{data.num}</Snum>
                            <Stitle num={data.num}>{data.title}</Stitle>
                            <Swriterwrap><Swriter>{data.writer}</Swriter></Swriterwrap>
                            <Sdate>{data.makeDate}</Sdate>
                        </Sli>)
                    }
                )
            }
            loading...
        </Sul>
    )
}


export default DocList