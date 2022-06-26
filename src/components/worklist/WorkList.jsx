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

const SboardButton = styled.button`
    height:20px;
    min-width:70px;
`

const Sinput = styled.input`
    height:20px;
`

const Sbutton = styled.button`
    max-height:20px;
    min-width:20px;
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
                                <BoardList data={data} key={i} i={i} index={data.bnum} list={list} setList={setList}/>
                            )
                        })}
                        <SboardButton onClick={()=>{setBoardClicked(1)}}>보드 추가+</SboardButton>
                        <Saddiv boardClicked ={boardClicked}>
                            <Sinput type="text" placeholder="제목 입력"
                                value={boardName}
                                onChange={(e)=>{
                                inputBoard(e);
                                }}
                            />
                            <Sbutton type="submit" onClick={()=>{addBoard()}}>+</Sbutton>
                        </Saddiv>
                        
                    </SboardName>
                </Sboard>
            </SworkList>
        </Wnav>
    )
}

export default WorkList;