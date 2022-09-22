import axios from "axios";
import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { forceRerender } from "../../Atoms/atom";
import { webPort } from "../../port";
import { useDrag, useDrop } from "react-dnd";

const Scontainor = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`

const Slist = styled.div`
    max-height:35px;
    width:267px;
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

const SdelButton = styled.button`
`

const InnerList = (props) =>{
    const { bNum, index, data } = props;
    const [, setRender] = useRecoilState(forceRerender);
    const [{ isDragging }, dragRef, previewRef] = useDrag(
        () => ({
          type: 'list',
          item: { index, bNum },
          collect: (monitor) => ({
            isDragging: monitor.isDragging(),
          }),
          end: (item) => {
            axios({
                url: `http://${webPort.express}/changeListOrder`,
                method: 'put',
                withCredentials: true,
                data: {
                    sourceBNum : bNum,
                    targetBNum : item.bNum,
                    order: index,
                    targetOrder: item.index,
                }
            }).then(()=>{
                setRender(prev=>prev+1)
            })
          },
        })
      )
    
      const [{isOver}, drop] = useDrop({
        accept: 'list',
        hover: (item) => {
          if (item.index === index && item.bNum === bNum) {
            return null
          }
          //item.index = 집은놈의 인덱스 index = 올라간 놈의 인덱스
          item.index = index;
          item.bNum = bNum;
        },
        collect : (monitor)=>({
          isOver : monitor.isOver()
        })
      })

    const delList = (listNum)=>{
        axios({
            url: `http://${webPort.express}/delList`,
            method: 'delete',
            withCredentials: true,
            data: {
                boardNum : bNum,
                listNum: listNum
            }
        }).then((res)=>{
            setRender((prev)=>{if(prev===1){return 0} else return 1});
        })
    }

    return(
        <Scontainor>
            <Slist ref={node=>{dragRef(drop(node))}}>{data.listTitle}</Slist>
            <SdelButton onClick={()=>{delList(data.listNum)}}>
                <MdOutlineCancel /> 
            </SdelButton>
        </ Scontainor>
    )
}

export default InnerList;