import React from "react";
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import InnerList from "./InnerList";
import axios from "axios";
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
    max-width:300px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
`;
const Sboard = styled.div`
    min-width:150px;
    margin-right:5px;
`

const Scontainor = styled.div`
`
const BoardList = (props) =>{
    const { i, data, index } = props;
    const [listName, setListName] = useState("");
    const [addButton, setAddButton] = useState(0);
    const [list, setList] = useState([]);
    const {workSpaceNum} = useParams();

    //   *** 현재 작동안됨 ***
    const addList= ()=>{
        console.log(workSpaceNum);
        axios({
            url: `http://localhost:1004/createBoard`,
            method:'post',
            withCredentials: true,
            data:{
                workspaceNum:workSpaceNum,
            }
        }).then((res)=>{
            console.log(res);
            setList(res.data.data)
        })
        setAddButton(0);
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
        }
    }

    return(
        <Scontainor>
            <Sboard key={i}>
                <Wtitle key={i}>{data.bname}</Wtitle>
            </Sboard>
            <SlistContainor>
                {list && list.filter((data)=>(data.bnum === index)).map((data, i)=>{
                    return(
                        <InnerList key={i} data={data} />
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