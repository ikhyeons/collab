import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { BsThreeDotsVertical,  } from 'react-icons/bs'
import {MdOutlineCancel, MdOutlineEditNote} from 'react-icons/md'
import { useDrag, useDrop } from 'react-dnd'
import { useRecoilState, useSetRecoilState, useResetRecoilState} from 'recoil'
import {templateParagraph, templateParagraphId, currentDocId, paragraphListForceRerender} from '../../../Atoms/atom'
import axios from 'axios'
import {webPort} from '../../../port'

const SInnerDataV = styled.div`
  padding-left : 25px;
  display : flex;
  width : 100%;
  :hover{
    background : rgba(255, 255, 200, 0.3);
  }
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

const SParagraphFile = styled.div`
  background : lightyellow;
  border-radius : 5px;
  width : 100%;
  display : flex;
  position : relative;
  min-height : 100px;
  margin : 5px 0;
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

const SLinkLeft = styled.div`
  display : flex;
  background : none;
  width : 20%;
  border : 1px solid gray;
  border-radius : 15px;
`

const SLinkRight = styled.div`
  background : none;
  width : 80%;
`

const SLinkimg = styled.img`
  width : 100%;
  border-radius : 15px;
  :hover {
    cursor : pointer;
  }
`

const SLinkLine = styled.a`
  padding : 7px;
  width : 100%;
  
  :hover {
    cursor : pointer;
    text-decoration : underline;
  }
`

const SLinkContent = styled.div`
  padding : 7px;
  :hover{
    cursor : pointer;
  }
`
function ParagraphFile(prop) {

  const {index, id, moveFunction} = prop;
  const [docId, setDocId] = useRecoilState(currentDocId);
  const setParagraphId = useSetRecoilState(templateParagraphId);
  const [paragraphs, setParagraphs] = useRecoilState(templateParagraph(prop.data))
  const resetState2 = useResetRecoilState(templateParagraphId);
  const [aparagraphListForceRerender, setParagraphListForceRerender] = useRecoilState(paragraphListForceRerender);

  const delParagraph = ()=>{
    axios({
      url: `http://${webPort.express}/delParagraph`,
      method: 'delete',
      data : {paragraphNum : paragraphs.paragraphNum, docNum : docId},
      withCredentials : true,
    }).then(()=>{
      axios({
        url: `http://${webPort.express}/readParagraphList/${docId}`,
        method: 'get',
        withCredentials : true,
      }).then((res)=>{
        resetState2();
        return res
      }).then((res)=>{setParagraphId(()=>{return res.data.data});setParagraphListForceRerender((prev)=>prev+1);})
    })
  }

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
    <SParagraphFile ref = {previewRef}>
        <SSettingLine isOver = {isOver}  ref = {node => drop(node)}>
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
          <SLinkLeft>
            <SLinkimg src='https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjAzMDZfMTAz%2FMDAxNjQ2NDk1MTQ1MDcy.CD4dxBXYd_Z8c7ukEUhg-5MZXQw45KxYYw1T4RxhRIcg.j-W-C2tFZ9bS9RwDxMTeH0UkffMN7AfLguaIbvTvKBYg.PNG.ggsone0805%2FCreamCam20220227172215.png&type=a340' />
          </SLinkLeft>
          <SLinkRight>
            <SLinkLine target="_blank" href = {paragraphs.data}>{paragraphs.data}</SLinkLine>
            <SLinkContent>프롭스로 받아온 세부내용 표시</SLinkContent>
          </SLinkRight>
        </SInnerDataV>
        
    </SParagraphFile>
  )
}

export default ParagraphFile