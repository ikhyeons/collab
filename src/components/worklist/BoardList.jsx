import React from "react";
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import InnerList from "./InnerList";
import axios from "axios";
import { MdOutlineCancel } from "react-icons/md";
import { useRecoilState } from "recoil";
import { forceRerender } from "../../Atoms/atom";
import { useDrag, useDrop } from "react-dnd";

import { boardList } from "../../Atoms/atom";
import { webPort } from "../../port";
import { useParams } from "react-router-dom";

const Sinput = styled.input`
    width:300px;
    background : lightyellow;
    margin : 4px;
    padding : 5px;
    border : 1px solid black;
    border-radius : 5px;
    font-size : 16px;
`
const SlistContainor = styled.div`
    min-width:300px;
    margin-right:5px;
`
const Sbutton = styled.button`
    width:300px;
    background : lightyellow;
    margin : 4px;
    padding : 5px;
    border : 1px solid black;
    border-radius : 5px;
    cursor : pointer;
    :hover{
        background : rgb(245, 245, 180)
    }
`

const Wtitle = styled.div`
    padding-left: 12px;
    border-bottom: 1px solid grey;
    min-height: 21px;
    width:283px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
`;
const Sboard = styled.div`
    min-width:150px;
    margin-right:5px;
    display:flex;
`

const Scontainor = styled.div`
`

const SdelButton = styled.button`
`

const BoardList = (props) =>{
    const { i, data, index } = props;
    const [listName, setListName] = useState("");
    const [addButton, setAddButton] = useState(0);
    const [list, setList] = useRecoilState(boardList(props.data.boardNum));
    const [render, setRender] = useRecoilState(forceRerender);
    const {workSpaceNum} = useParams()

    const [{ isDragging }, dragRef, previewRef] = useDrag(
        () => ({
          type: 'board',
          item: { index, },
          collect: (monitor) => ({
            isDragging: monitor.isDragging(),
          }),
                    end: (item,) => {
                        console.log(index, item.index)
                        axios({
                            url: `http://${webPort.express}/changeBoardOrder`,
                            method: 'put',
                            withCredentials: true,
                            data: {
                                workSpaceNum : workSpaceNum,
                                order: item.index,
                                targetOrder: index,
                            }
                        }).then(()=>{
                            setRender(prev=>prev+1)
                        })
                    },
        }),
      )
    
      const [{isOver}, drop] = useDrop({
        accept: 'board',
        hover: (item) => {
          if (item.index === index) {
            return null
          }
        //item.index = 집은놈의 인덱스 index = 올라간 놈의 인덱스
        item.index = index;
        },
        collect : (monitor)=>({
          isOver : monitor.isOver()
        }),
      })
    



    useEffect(()=>{
        axios({
            url: `http://${webPort.express}/readList/${data.boardNum}`,
            method:'get',
            withCredentials: true,
        }).then((res)=>{
            console.log(res)
            setList(res.data.data);
        })
    },[render])

    const addList= ()=>{
        axios({
            url: `http://${webPort.express}/createList`,
            method:'post',
            withCredentials: true,
            data:{
                boardNum:data.boardNum,
                listTitle: listName,
            }
        }).then(()=>{setAddButton(0); setRender(prev=>prev+1)})
    };

    const inputList = (e)=>{
        setListName(e.target.value);
    }

    const inputRef = useRef();

    useEffect(() => {
        document.addEventListener('mousedown', clickInputOutside);

        return () => {
            document.removeEventListener('mousedown', clickInputOutside);
        };
    });

    const clickInputOutside = e =>{
        if (addButton && !inputRef.current.contains(e.target)){
            setAddButton(0);
            addList();
            setListName('');
            setRender(prev=>prev+1)
        }
    }

    const delBoard = (boardNum)=>{
        axios({
            url: `http://${webPort.express}/delBoard`,
            method: 'delete',
            withCredentials: true,
            data: {
                boardNum : boardNum
            }
        }).then((res)=>{
            setRender(prev=>prev+1);
        })
    }

    return(
        <Scontainor>
            <Sboard key={i}>
                <Wtitle ref={node => dragRef(drop(node))} key={i}>{data.boardTitle}</Wtitle>
                <SdelButton onClick={()=>{delBoard(data.boardNum)}}>
                <MdOutlineCancel /> 
                </SdelButton>
            </Sboard>
            <SlistContainor>
                {list.map((data, i)=>{
                    return(
                        props.data.boardNum===data.boardNum?<InnerList key={i} index={data.sequent} bNum={data.boardNum} data={data} />:null
                    )
                })}
                {addButton === 1 && <Sinput type="text" placeholder="내용 추가"
                ref={inputRef}
                value={listName}
                onChange={(e)=>{
                    inputList(e);
                }}
                onKeyPress={(e)=>{
                    if(e.key === 'Enter'){
                        addList(index);
                    }
                }}
                autoFocus
                />}
                {addButton === 0 &&
                                                <Sbutton type="submit" onClick={()=>{
                                                    setAddButton(1)
                                                }}>+</Sbutton>}
            </SlistContainor>
        </Scontainor>
    )
}

export default BoardList;