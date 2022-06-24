import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState, memo } from "react";
import styled from "styled-components";

const Sinput = styled.input`
    width:300px;
`
const SlistContainor = styled.div`
    min-width:300px;
    margin-right:5px;
`
const Slist = styled.div`
    max-height:21px;
    max-width:300px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
`
const Sbutton = styled.button`
    width:300px;
`

const InnerList = memo((props) =>{
    const { index, list, setList } = props;
    const [listName, setListName] = useState('');
    const [addButton, setAddButton] = useState(0);
    
    const addList= (i)=>{
        setList((prev)=>{
            let newList = [
                ...prev,
            ]
            if(listName){
                console.log(newList, i, listName);
                newList[i].push(listName)
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

    const clickInputOutside = event =>{
        if (addButton && !inputRef.current.contains(event.target)){
            setAddButton(0);
            setListName('');
        }
    }

    return(
        <SlistContainor>
            {list[index] && list[index].map((data, index)=>{
                return(
                    <Slist key={index} >{data}</Slist>
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
                    addList(index)
                }
            }}
            autoFocus
            />}
            {addButton === 0 &&
            <Sbutton type="submit" onClick={()=>{setAddButton(1)}}>+</Sbutton>}
        </SlistContainor>
    )
})

export default InnerList;