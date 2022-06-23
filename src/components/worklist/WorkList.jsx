import React, { useState } from "react";
import styled from 'styled-components';
import BoardList from "./BoardList";


const Wnav = styled.nav`
    width: 80%;
`;

const Wlogo = styled.h2`
    width: 100%;
    height: 25vh;
`;

const SworkList = styled.div`
    width: 100%;
    height: 70vh;
`;

const Sboard = styled.div`
    overflow:auto;
`;

const SboardName = styled.div`
    display:flex;
    overflow:auto;
`

const Saddiv = styled.div`
    display: ${props => props.boardClicked === 1 ? 'contents' : 'none'};
    width: 100%;
`


const WorkList = ()=>{
    const [boardClicked, setBoardClicked] = useState(0);
    const [boardName, setBoardName] = useState('');
    const [board, setBoard] = useState([
        {
            bnum: 1,
            bname: '할 일',
        },
        {
            bnum: 2,
            bname: '진행 중',
        },
        {
            bnum: 3,
            bname: '완료',
        },
    ])
    const [list, setList] = useState([
        [],
        [],
        [],
    ]);
    const addBoard = () =>{
        setBoard((prev) =>{
            let newBoard = [
                ...prev,
                {
                    bnum: prev.length+1,
                    bname: boardName,
                },
            ]
            console.log(newBoard);
            return newBoard;
        })
        setList((prev)=>{
            let newList = [
                ...prev,
                [],
            ]
            return newList;
        })
        setBoardClicked(0);
        setBoardName('');
    };

    const inputBoard= (e)=>{
        setBoardName(e.target.value)
    };

    return(
        <Wnav>
            <Wlogo>작업 목록</Wlogo>
            <SworkList>
                <Sboard>
                    <SboardName>
                        {board.map((data, i) =>{
                            return (
                                <BoardList data={data} key={i} i={i} index={board.bnum} list={list} setList={setList}/>
                            )
                        })}
                        <button style={{minWidth:'70px', height:'20px'}} onClick={()=>{setBoardClicked(1)}}>보드 추가+</button>
                        <Saddiv boardClicked ={boardClicked}>
                            <input type="text" placeholder="제목 입력"
                                style={{maxHeight:'20px', minHeight:'20px'}}
                                value={boardName}
                                onChange={(e)=>{
                                inputBoard(e);
                                }}
                            />
                            <button style={{maxHeight:'20px', minWidth:'20px'}} type="submit" onClick={()=>{addBoard()}}>+</button>
                        </Saddiv>
                        
                    </SboardName>
                </Sboard>
            </SworkList>
        </Wnav>
    )
}

export default WorkList;