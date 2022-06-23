import React from "react";
import { useState, memo } from "react";
import styled from "styled-components";

const Slistbody = styled.div`
    display:flex;
    overflow:auto;
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

    return(
        <div style={{minWidth: '150px', marginRight: '5px'}}>
            {list[index] && list[index].map((data, index)=>{
                return(
                    <div key={index} style={{maxWidth:'150px',overflow:'auto'}}>{data}</div>
                )
            })}
            {addButton === 1 && <input type="text" placeholder="내용 추가"
            style={{width: '150px'}}
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
            <button style={{width:'150px'}} type="submit" onClick={()=>{setAddButton(1)}}>+</button>}
        </div>
    )
})

export default InnerList;