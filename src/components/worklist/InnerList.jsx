import React from "react";
import { useState, memo } from "react";
import styled from "styled-components";

const Slistbody = styled.div`
    display:flex;
    overflow:auto;
`

const InnerList = memo((props) =>{
    const { board, list, setList } = props;
    const [listName, setListName] = useState('');
    
    const addList= (i)=>{
        setList((prev)=>{
            let newList = [
                ...prev,
            ]
            if(listName){
                newList[i].push(listName)
            }else{
                return newList;
            }
            return newList;
        });
        setListName('');
    };

    const inputList = (e)=>{
        setListName(e.target.value);
    }

    return(
        <Slistbody>
            {list.map((data, i)=>{
                return(
                    <div style={{minWidth: '150px', marginRight: '5px'}} key={i}>
                        {list[i].map((data, index)=>{
                            return(
                                <div key={index} style={{maxWidth:'150px',overflow:'auto'}}>{data}</div>
                            )
                        })}
                        <input type="text" placeholder="내용 추가"
                        style={{width: '130px'}}
                        onChange={(e)=>{
                            inputList(e);
                        }}
                        />
                        <button style={{width:'20px'}} type="submit" onClick={()=>{addList(i)}}>+</button>
                    </div>
                )
            })}
        </Slistbody>
    )
})

export default InnerList;