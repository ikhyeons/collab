import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState, memo } from "react";
import styled from "styled-components";

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
const Slist = styled.div`
    max-height:35px;
    max-width:300px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
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

const InnerList = memo((props) =>{
    const { index, list, setList } = props;
    const [listName, setListName] = useState("");
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

    const clickInputOutside = e =>{
        if (addButton && !inputRef.current.contains(e.target)){
            setAddButton(0);
            if(listName===''){
                setList((prev)=>{
                    console.log('gd');
                    let newList = [...prev];
                    newList[index].push('디폴트');
                    return newList;
                });
            } else {
                setList((prev)=>{
                    console.log('gd');
                    let newList = [...prev];
                    newList[index].push(listName);
                    return newList;
                });
            }
            
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
    )
})

export default InnerList;