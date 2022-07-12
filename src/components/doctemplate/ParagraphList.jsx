import React, { useState } from 'react'
import styled from 'styled-components'
import ParagraphText from './paragraphType/ParagraphText';
import ParagraphImg from './paragraphType/ParagraphImg';
import ParagraphVideo from './paragraphType/ParagraphVideo';
import ParagraphLink from './paragraphType/ParagraphLink';
import { useRecoilState } from 'recoil';
import { templateParagraph, templateParagraphId } from '../../Atoms/atom';

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
  const [paragraphs, setParagraphs] = useRecoilState(templateParagraph);

  const addParagraphs = ()=>{ //아이디를 추가하는걸로 바꿈 (타입은 text기본)
    setParagraphs((prev)=>{
      let newArray = [
        ...prev
      ]
      newArray = newArray.map((data)=>{
         return ({
          ...data,
          id : data.id+1,
         })
      })
      newArray.unshift({
        id : 0,
        type : 'text',
        data : '',
        modify : 1,
       })
      return newArray;
    })
  }

  return (
    <SParagraphList>
        <SAddParagraph onClick={()=>{addParagraphs()}}>+ 문단추가</SAddParagraph>
        {paragraphs.map((data, i)=>{
          if (data.type === 'text') return <ParagraphText key={i} setParagraphs={setParagraphs} data={data}/>
          else if (data.type === 'image') return <ParagraphImg  mouseOnImg={prop.mouseOnImg} setMouseOnImg={prop.setMouseOnImg} key={i} setParagraphs={setParagraphs} data={data} />
          else if (data.type === 'video') return <ParagraphVideo key={i} setParagraphs={setParagraphs} data={data} />
          else if (data.type === 'link') return <ParagraphLink key={i} setParagraphs={setParagraphs} data={data} />
        })}
    </SParagraphList>
  )
}

export default ParagraphList