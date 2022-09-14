import React, { useState } from 'react'
import styled from 'styled-components'
import ParagraphText from './paragraphType/ParagraphText';
import ParagraphImg from './paragraphType/ParagraphImg';
import ParagraphVideo from './paragraphType/ParagraphVideo';
import ParagraphLink from './paragraphType/ParagraphLink';
import { useRecoilState } from 'recoil';
import { templateParagraphId, templateParagraph, currentDocId, paragraphListForceRerender } from '../../Atoms/atom';
import { webPort } from "../../port";
import axios from 'axios';
import { useEffect } from 'react';

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
  const [docId, setDocId] = useRecoilState(currentDocId);
  const [aparagraphListForceRerender, setParagraphListForceRerender] = useRecoilState(paragraphListForceRerender);
  const addParagraphs = ()=>{ //아이디를 추가하는걸로 바꿈 (타입은 text기본)
    axios({
      url: `http://${webPort.express}/createTextParagraph`,
      method: 'post',
      data : {docNum : docId,},
      withCredentials : true,
    }).then((res)=>{console.log(res)}).then(()=>{
      setParagraphListForceRerender((prev)=>prev+1);
    })
  }

  useEffect(()=>{
    axios({
      url: `http://${webPort.express}/readParagraphList/${docId}`,
      method: 'get',
      withCredentials : true,
    }).then((res)=>{
      console.log(res);
      setParagraphId(res.data.data)
    })
  }, [aparagraphListForceRerender, docId])

  return (
    <SParagraphList>
        <SAddParagraph onClick={()=>{addParagraphs()}}>+ 문단추가</SAddParagraph>
        {paragraphId.map((data, i)=>{
          if (data.paragraphType === 'text') return <ParagraphText key={i} index={data.sequent} data={data}/>
          else if (data.paragraphType === 'image') return <ParagraphImg mouseOnImg={prop.mouseOnImg} index={data.sequent} setMouseOnImg={prop.setMouseOnImg} key={i} data={data} />
          else if (data.paragraphType === 'video') return <ParagraphVideo key={i} index={data.sequent} data={data} />
          else if (data.paragraphType === 'link') return <ParagraphLink key={i} index={data.sequent} data={data} />
        })}
    </SParagraphList>
  )
}

export default ParagraphList