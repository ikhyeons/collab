import React, { useState } from 'react'
import styled from 'styled-components'
import ParagraphText from './paragraphType/ParagraphText';
import ParagraphImg from './paragraphType/ParagraphImg';
import ParagraphVideo from './paragraphType/ParagraphVideo';
import ParagraphLink from './paragraphType/ParagraphLink';
import { useRecoilState } from 'recoil';
import { templateParagraphId, templateParagraph } from '../../Atoms/atom';

const SParagraphList = styled.ul`
  border-radius : 5px;
  padding : 4px;
  width : 100%;
`

const SAddParagraph = styled.button`
  background : lightyellow;
  border-radius : 5px;
  width : 100%;
  padding : 14px;
  display : flex;
  position : relative;
  min-height : 50px;
  margin : 5px 0;
  border : 1px solid black;
  
  font-weight : bold;
  :hover{
    border : 2px solid black;
    padding : 13px;
    cursor : pointer;
  }
`

function ParagraphList(prop) {

  const [paragraphId, setParagraphId] = useRecoilState(templateParagraphId);

  const moveFunction = (targetIndex, sourceIndex)=> {
    setParagraphId((prev)=>{
      let newArray = [...prev];
      let innerData = newArray[sourceIndex];
      console.log(`input data is ${innerData}`)
      newArray.splice(sourceIndex, 1);
      newArray.splice(targetIndex, 0, innerData);
      console.log(newArray);
      return newArray
    })
  }

  const addParagraphs = ()=>{ //아이디를 추가하는걸로 바꿈 (타입은 text기본)
    setParagraphId((prev)=>{
      let newArray = [
        ...prev
      ]
      newArray = newArray.map((data)=>{
         return ({
          ...data,
          id : data.id+1,
         })
      })
      return newArray;
    })
    setParagraphId((prev)=>{
      let newArray = [
        ...prev
      ]
      newArray.unshift({
        id : 0,
        type : 'text',
      })
     console.log(newArray);
     return newArray;
    })
  }

  return (
    <SParagraphList>
        <SAddParagraph onClick={()=>{addParagraphs()}}>+ 문단추가</SAddParagraph>
        {paragraphId.map((data, i)=>{
          if (data.type === 'text') return <ParagraphText moveFunction={moveFunction} key={i} index={i} data={data}/>
          else if (data.type === 'image') return <ParagraphImg moveFunction={moveFunction} mouseOnImg={prop.mouseOnImg} index={i} setMouseOnImg={prop.setMouseOnImg} key={i} data={data} />
          else if (data.type === 'video') return <ParagraphVideo moveFunction={moveFunction} key={i} index={i} data={data} />
          else if (data.type === 'link') return <ParagraphLink moveFunction={moveFunction} key={i} index={i} data={data} />
        })}
    </SParagraphList>
  )
}

export default ParagraphList