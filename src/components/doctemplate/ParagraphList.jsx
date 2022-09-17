import React, { useState } from 'react'
import styled from 'styled-components'
import ParagraphText from './paragraphType/ParagraphText';
import ParagraphImg from './paragraphType/ParagraphImg';
import ParagraphVideo from './paragraphType/ParagraphVideo';
import ParagraphLink from './paragraphType/ParagraphLink';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { templateParagraphId, templateParagraph, paragraphForceRerender, currentDocId, paragraphListForceRerender } from '../../Atoms/atom';
import { webPort } from "../../port";
import axios from 'axios';
import { useEffect } from 'react';

const SParagraphList = styled.ul`
  border-radius : 5px;
  padding : 4px;
  width : 100%;
`

const SAddParagraph = styled.div`
  background : lightyellow;
  border-radius : 5px;
  width : 100%;
  padding : 15px 10px 5px 15px;
  display : flex;
  position : relative;
  min-height : 40px;
  margin : 5px 0;
  border : 1px solid black;
  font-weight : bold;

  :hover{
    border : 2px solid black;
    padding : 14px 9px 4px 14px;
    cursor : pointer;
  }
`

const SpbuttonWrap = styled.div`
display : flex;
margin-left : 5px;
transform : translateY(-6px);
`

const Spbutton = styled.button`
  background : lightyellow;
  border-radius : 5px;
  padding : 5px;
  border : 1px solid black;
  margin : 3px;
  font-weight : bold;
  :hover{
    border : 2px solid black;
    padding : 4px;
    cursor : pointer;
  }
`

function ParagraphList(prop) {
  
  const [paragraphId, setParagraphId] = useRecoilState(templateParagraphId);
  const [docId, setDocId] = useRecoilState(currentDocId);
  const [aparagraphListForceRerender, setParagraphListForceRerender] = useRecoilState(paragraphListForceRerender);
  const [aparagraphForceRerender, setParagraphForceRerender] = useRecoilState(paragraphForceRerender);
  const resetState = useResetRecoilState(templateParagraphId)
  
  const addTextParagraphs = ()=>{ //아이디를 추가하는걸로 바꿈 (타입은 text기본)
    axios({
      url: `http://${webPort.express}/createTextParagraph`,
      method: 'post',
      data : {docNum : docId,},
      withCredentials : true,
    }).then(()=>{
      axios({
        url: `http://${webPort.express}/readParagraphList/${docId}`,
        method: 'get',
        withCredentials : true,
      }).then((res)=>{
        resetState();
        return res
      }).then((res)=>{setParagraphId(()=>{return res.data.data});setParagraphListForceRerender((prev)=>prev+1);})
    })
  }

  const addImageParagraphs = ()=>{ //아이디를 추가하는걸로 바꿈 (타입은 text기본)
    axios({
      url: `http://${webPort.express}/createImageParagraph`,
      method: 'post',
      data : {docNum : docId,},
      withCredentials : true,
    }).then(()=>{
      axios({
        url: `http://${webPort.express}/readParagraphList/${docId}`,
        method: 'get',
        withCredentials : true,
      }).then((res)=>{
        resetState();
        return res
      }).then((res)=>{setParagraphId(()=>{return res.data.data});setParagraphListForceRerender((prev)=>prev+1);})
    })
  }

  const addVideoParagraphs = ()=>{ //아이디를 추가하는걸로 바꿈 (타입은 text기본)
    axios({
      url: `http://${webPort.express}/createVideoParagraph`,
      method: 'post',
      data : {docNum : docId,},
      withCredentials : true,
    }).then(()=>{
      axios({
        url: `http://${webPort.express}/readParagraphList/${docId}`,
        method: 'get',
        withCredentials : true,
      }).then((res)=>{
        resetState();
        return res
      }).then((res)=>{setParagraphId(()=>{return res.data.data});setParagraphListForceRerender((prev)=>prev+1);})
    })
  }

  const addFileParagraphs = ()=>{ //아이디를 추가하는걸로 바꿈 (타입은 text기본)
    axios({
      url: `http://${webPort.express}/createFileParagraph`,
      method: 'post',
      data : {docNum : docId,},
      withCredentials : true,
    }).then(()=>{
      axios({
        url: `http://${webPort.express}/readParagraphList/${docId}`,
        method: 'get',
        withCredentials : true,
      }).then((res)=>{
        resetState();
        return res
      }).then((res)=>{setParagraphId(()=>{return res.data.data});setParagraphListForceRerender((prev)=>prev+1);})
    })
  }
  

  useEffect(()=>{
    axios({
      url: `http://${webPort.express}/readParagraphList/${docId}`,
      method: 'get',
      withCredentials : true,
    }).then((res)=>{
      setParagraphId(res.data.data)
      return res
    }).then(()=>{setParagraphForceRerender(prev=>prev+1)})
    .then(()=>{console.log(paragraphId);})
  }, [aparagraphListForceRerender, docId])

  return (
    <SParagraphList>
      <SAddParagraph 
        >+ 문단추가 
        <SpbuttonWrap>
          <Spbutton onClick={()=>{addTextParagraphs()}} >텍스트</Spbutton>
          <Spbutton onClick={()=>{addImageParagraphs()}}>이미지</Spbutton>
          <Spbutton onClick={()=>{addVideoParagraphs()}}>비디오</Spbutton>
          <Spbutton onClick={()=>{addFileParagraphs()}}>파일</Spbutton>
        </SpbuttonWrap>
      </SAddParagraph>
        {paragraphId.map((data, i)=>{
          if (data.paragraphType === 'text') return <ParagraphText key={i} data={data} sequent={data.sequent} num={data.paragraphNum}/>
          else if (data.paragraphType === 'image') return <ParagraphImg mouseOnImg={prop.mouseOnImg} setMouseOnImg={prop.setMouseOnImg} key={i} data={data} sequent={data.sequent} />
          else if (data.paragraphType === 'video') return <ParagraphVideo key={i} data={data} sequent={data.sequent} />
          else if (data.paragraphType === 'link') return <ParagraphLink key={i} data={data} sequent={data.sequent} />
        })}
    </SParagraphList>
  )
}

export default ParagraphList