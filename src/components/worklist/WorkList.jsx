import React, { useState } from "react";
import styled from 'styled-components';


const Wnav = styled.nav`
    width: 80%;
`;

const Wlogo = styled.h2`
    width: 100%;
    height: 30vh;
`;

const Wtitle = styled.div`
padding-left: 12px;
border-bottom: 1px solid grey;
`;

const Wul = styled.ul`
    list-style : none;
    mragin-left: 30px;
    font-size: 20px
`;

const Wli = styled.li`
    width: 100%;
    :hover{
        background: lightgrey;
        cursor: pointer;
    }
`;

const WaddBtn = styled.button`
    width: 100%;
    :hover{
        background: lightgrey;
        cursor: pointer;
}`

const WorkList = ()=>{
    const [board, setBoard] = useState([
        {
            bnum: 1,
            bname: '할 일',
            work:[
                {

                }
            ],
        },
    ])
    const addBoard = () =>{
        setBoard((prev) =>{
            let newBoard = [
                ...prev,
                {
                    bnum: prev.length,
                    bname: '추가된 보드',
                    work:[{

                    }],
                }
            ]
            return newBoard;
        })
    }
    const addWorkList = (prev) =>{
        let newList = [
            ...prev,
            {
                num: prev.length,
                name: '새로운 공간',
            }
        ]
        return newList;
    }
    
    return(
        <Wnav>
            <Wlogo>작업 목록</Wlogo>
            <div style={{display:'flex'}}>
                <div style={{width: '200px'}}>
                    {board.map((data, i) =>{
                        return (
                        <div>
                            <Wtitle key={i}>{data.bname}</Wtitle>
                            <Wul key={i+1}>
                                {data.work && data.work.map((data, i) =>{
                                    return <Wli key={i}>{data.name}</Wli>
                                })}
                            <WaddBtn onClick={()=>{addWorkList()}}>추가하기+</WaddBtn>
                            </Wul>
                        </div>
                        )
                    })}
                    <button onClick={()=>{addBoard()}}>보드 추가+</button>
                </div>
            </div>
        </Wnav>
    )
}

export default WorkList;