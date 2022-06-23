import React, { useState } from "react";
import styled from 'styled-components';
import BoardList from "./BoardList";
import InnerList from "./InnerList";


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
    display: flex;
`;

const SboardName = styled.div`
    display:flex;
    overflow:auto;
`

const Saddiv = styled.div`
    display: ${props => props.boardClicked === 1 ? 'contents' : 'none'};
    width: 100%;
`

const Slist = styled.div`
    display:flex;
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
                                <BoardList data={data} i={i} key={i}/>
                            )
                        })}
                        <button onClick={()=>{setBoardClicked(1)}}>보드 추가+</button>
                    </SboardName>
                    <Saddiv boardClicked ={boardClicked}>
                        <input type="text" placeholder="제목 입력"
                            value={boardName}
                            onChange={(e)=>{
                            inputBoard(e);
                            }}
                        />
                        <button type="submit" onClick={()=>{addBoard()}}>+</button>
                    </Saddiv>
                </Sboard>
                <Slist>
                    <InnerList board={board} list={list} setList={setList}/>
                </Slist>
            </SworkList>
        </Wnav>
    )
}

export default WorkList;