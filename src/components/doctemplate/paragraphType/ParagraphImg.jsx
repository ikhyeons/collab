import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { BsThreeDotsVertical,  } from 'react-icons/bs'
import {MdOutlineCancel, MdOutlineEditNote} from 'react-icons/md'
import { useDrag, useDrop } from 'react-dnd'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { templateParagraph, templateParagraphId } from '../../../Atoms/atom'

const SInnerDataV = styled.div`
  padding-left : 25px;
  width : 100%;
`

const SimoDiv1 = styled.span`
  margin : "0 0 10px 0";
  cursor : pointer;
  padding : 3px;
  border-radius : 5px 0 0 5px;
  :hover{
    background : yellow;
  }
`

const SimoDiv2 = styled.span`
  cursor : pointer;
  padding : 3px;
  border-radius : 5px 0 0 5px;
  :hover{
    background : yellow;
  }
`

const SParagraphImg = styled.div`
  background : lightyellow;
  border-radius : 5px;
  width : 100%;
  display : flex;
  position : relative;
  min-height : 80px;
  margin : 5px 0;
  :hover{
    background : rgba(255, 255, 200, 0.3);
  }
`

const SSettingLine = styled.div`
  background : gray;
  display : flex;
  flex-direction: column;
  margin-right : 5px;
  background : ${ prop=>(prop.isOver?'rgb(205, 250, 170)':'rgb(235, 235, 170)')};
  padding-left : 3px;
  border-radius : 5px 0 0 5px;
  padding-top : 10px;
`

const SImageBox = styled.div`
  background : lightyellow;
  display : flex;
  width : 100%;
  overflow-X : scroll;

  &::-webkit-scrollbar{
    height : 8px;
    background : rgba(240,240,150,0.3);
  }

  &::-webkit-scrollbar-thumb{
    height: 4%;
    background-color: rgba(215,215,150,1);
    border : 1px solid yellow;
    border-radius: 5px;    
  }
`

const SImage = styled.img`
  max-height : 400px;
  min-height : 400px;
  margin-right : 7px;
`

const SImageWrap = styled.div`
  position : relative;
  z-index : 2;
`

const xStyle = {
  position : 'absolute', 
  top : '5px', 
  left : '0',
  cursor : 'pointer'
}

function ParagraphImg(prop) {
  const {index, id, moveFunction} = prop;
  const setParagraphId = useSetRecoilState(templateParagraphId);
  const [paragraphs, setParagraphs] = useRecoilState(templateParagraph(prop.data))

  const delParagraph = ()=>{
    setParagraphId((prev)=>{
      let arrayData = [
        ...prev,
      ]
      arrayData = arrayData.filter((list)=>{
        return list.id !== prop.data.id;
      });
      
      console.log(arrayData);
      return arrayData;
    })}

    const [{ isDragging }, dragRef, previewRef] = useDrag(
      () => ({
        type: 'paragraphList',
        item: { index, id },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
        end: (item) => {
          //item.index = 떨어진 놈의 인덱스 index = 집은 놈의 인덱스 id = 집은 놈의 아이디
          moveFunction(item.index, index);
        },
      })
    )
  
    const [{isOver}, drop] = useDrop({
      accept: 'paragraphList',
      hover: (item, monitor) => {
        if (item.index === index) {
          return null
        }
        //item.index = 집은놈의 인덱스 index = 올라간 놈의 인덱스
        item.index = index;
        console.log(index);
      },
      collect : monitor => ({
        isOver : monitor.isOver(),
      })
    })

  return (
    <SParagraphImg ref = {previewRef}>
        <SSettingLine isOver = {isOver} ref = {node => drop(node)}>
          <SimoDiv1 ref={node => dragRef(drop(node))}>
            <BsThreeDotsVertical />
          </SimoDiv1>

          <SimoDiv1>
            <MdOutlineEditNote />
          </SimoDiv1>

          <SimoDiv2 onClick={()=>{delParagraph()}}>
            <MdOutlineCancel />
          </SimoDiv2>
        </SSettingLine>

        <SInnerDataV >
          <SImageBox 
            onClick={(e)=>{prop.setMouseOnImg(1)}}
            onMouseLeave={(e)=>{prop.setMouseOnImg(0)}}
            onWheel={(e)=>{if(prop.mouseOnImg===1 && e.deltaY>0)e.currentTarget.scrollLeft+=600; else if(prop.mouseOnImg===1 && e.deltaY<0) e.currentTarget.scrollLeft-=600;setTimeout(()=>{ }, 1500)}}
          >
              {paragraphs.imgs.map((data, i)=>(<SImageWrap key={i}><SImage  src={data} /><MdOutlineCancel style={xStyle}/></SImageWrap>))}

          </SImageBox>
          
        </SInnerDataV>
        
    </SParagraphImg>
  )
}

export default ParagraphImg