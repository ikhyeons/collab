import React from "react";
import { useRecoilState } from "recoil";
import { listState } from "../../Atoms/atom";
import styled from "styled-components";
import { useDrag, useDrop } from "react-dnd";


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

const InnerList = (props) =>{
    const { data, moveFunction, index} = props;
    const [listStatef, setListStatef] = useRecoilState(listState(data));
    const [, dragRef] = useDrag(
        () => ({
          type :  "list",
          item: listStatef.id,
          collect: (monitor) =>({
            isDragging: monitor.isDragging(),
          }),
          end: (item)=>{
            moveFunction(item.index, index) 
          } ,
        })
    )

    const [ , drop ] = useDrop({
        accept: 'list',
        hover: (item) =>{
            if (item.index === index) {
                return null
            }
            item.index = index;
            console.log(index);
        },
        
    })

    return(
        <Slist ref={item => dragRef(drop(item))}>{listStatef.contents}</Slist>
    )
}

export default InnerList;