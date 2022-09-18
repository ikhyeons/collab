import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { BsThreeDotsVertical,  } from 'react-icons/bs'
import {MdOutlineCancel, MdOutlineEditNote} from 'react-icons/md'
import ReactPlayer from 'react-player'
import { useDrag, useDrop } from 'react-dnd'
import { useRecoilState, useSetRecoilState, useResetRecoilState } from 'recoil'
import {templateParagraphId, templateParagraph, currentDocId, paragraphListForceRerender} from '../../../Atoms/atom'
import axios from 'axios'
import {webPort} from '../../../port'

const SInnerDataV = styled.div`
  padding-left : 25px;
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

const SParagraphVideo = styled.div`
  background : lightyellow;
  border-radius : 5px;
  width : 100%;
  display : flex;
  position : relative;
  min-height : 80px;
  margin : 5px 0;
`

const SSettingLine = styled.div`
  display : flex;
  flex-direction: column;
  margin-right : 5px;
  background : ${ prop=>(prop.isOver?'rgb(205, 250, 170)':'rgb(235, 235, 170)')};
  padding-left : 3px;
  border-radius : 5px 0 0 5px;
  padding-top : 10px;
`

const SVideoTitle = styled.div`
  
`
function ParagraphVideo(prop) {

  const {index, id, moveFunction} = prop;
  const [docId, setDocId] = useRecoilState(currentDocId);
  const setParagraphId = useSetRecoilState(templateParagraphId)
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
    <SParagraphVideo ref = {previewRef}>
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
          <SVideoTitle>{paragraphs.data}</SVideoTitle>
          <ReactPlayer
                    className='react-player'
                    url={paragraphs.url}    // 플레이어 url
                    width='450px'         // 플레이어 크기 (가로)
                    height='300px'        // 플레이어 크기 (세로)
                    playing={false}        // 자동 재생 on
                    muted={true}          // 자동 재생 on
                    controls={true}       // 플레이어 컨트롤 노출 여부
                    light={false}         // 플레이어 모드
                    pip={true}            // pip 모드 설정 여부
                    poster={'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg'}   // 플레이어 초기 포스터 사진
                    onEnded={() => {}}  // 플레이어 끝났을 때 이벤트
                />
        </SInnerDataV>
        
    </SParagraphVideo>
  )
}

export default ParagraphVideo