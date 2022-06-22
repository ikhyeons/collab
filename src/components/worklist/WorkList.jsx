import React, { useState } from "react";
import styled from 'styled-components';


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
`

const Wtitle = styled.div`
    padding-left: 12px;
    border-bottom: 1px solid grey;
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

const Slistbody = styled.div`
    display:flex;
    overflow:auto;
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
    const [list, setList] = useState([]);
    const [listName, setListName] = useState('');
    const addBoard = () =>{
        setBoard((prev) =>{
            let newBoard = [
                ...prev,
                {
                    bnum: prev.length,
                    bname: boardName,
                }
            ]
            return newBoard;
        })
        setBoardClicked(0);
        setBoardName('');
    }
    const addList= ()=>{
        setList((prev)=>{
            let newList = [
                ...prev,
                [
                    listName
                ],
            ]
            return newList;
        })
        setListName('');
    }
    const inputBoard= (e)=>{
        setBoardName(e.target.value)
    };

    const inputList = (e)=>{
        setListName(e.target.value)
    };
    
    return(
        <Wnav>
            <Wlogo>작업 목록</Wlogo>
            <SworkList>
                <Sboard>
                    <SboardName>
                        {board.map((data, i) =>{
                            return (
                            <div style={{minWidth: '150px', marginRight:'5px'}}>
                                <Wtitle key={i}>{data.bname}</Wtitle>
                            </div>
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
                    <Slistbody>
                        {board.map((data, i)=>{
                            return(
                                <div style={{minWidth: '150px', marginRight: '5px'}} key={i}>
                                    {list.map((data, i)=>{
                                        return(
                                            <div>{list[i]}</div>
                                        )
                                    })}
                                    <input type="text" placeholder="내용 추가"
                                    value={listName}
                                    onChange={(e)=>{
                                        inputList(e);
                                    }}
                                    />
                                    <button type="submit" onClick={()=>{addList()}}>+</button>
                                </div>
                            )
                        })}
                    </Slistbody>
                </Slist>
            </SworkList>
        </Wnav>
    )
}

export default WorkList;