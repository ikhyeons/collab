import React from "react";
import { useState, useRef, useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import InnerList from "./InnerList";
import { listStateId, listState } from "../../Atoms/atom";
import { webPort } from "../../port";

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
    const [list, setList] = useRecoilState(listStateId);

    const addList= (i)=>{
        setList((prev)=>{
            let newList = [
                ...prev,
            ]
            if(listName){
                newList.push({id: list.at(-1).id + 1, bnum: index})
            }else{
                return newList;
            }
            return newList;
        });
        setListName('');
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
            if(listName===''){
                setList((prev)=>{
                    console.log('gd');
                    console.log(list.at(-1));
                    let newList = [...prev];
                    newList.push({id: list.at(-1).id + 1, bnum: index});
                    return newList;
                });
            } else {
                setList((prev)=>{
                    console.log('gd');
                    let newList = [...prev];
                    newList.push({id: list.at(-1).id + 1, bnum: index});
                    return newList;
                });
            }
            
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