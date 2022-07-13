import React from 'react'
import styled from 'styled-components'
import { BsThreeDotsVertical,  } from 'react-icons/bs'
import {MdOutlineCancel, MdOutlineEditNote} from 'react-icons/md'
import ReactPlayer from 'react-player'
import { useRecoilState, useSetRecoilState } from 'recoil'
import {templateParagraphId, templateParagraphF} from '../../../Atoms/atom'

const SInnerDataV = styled.div`
  padding-left : 25px;
`

const SimoDiv1 = styled.span`
  margin : "0 0 10px 0";
  cursor : pointer;
  padding : 3px;
  border-radius : 5px;
  :hover{
    background : yellow;
  }
`

const SimoDiv2 = styled.span`
  cursor : pointer;
  padding : 3px;
  border-radius : 5px;
  :hover{
    background : yellow;
  }
`

const SParagraphVideo = styled.div`
  background : lightyellow;
  border-radius : 5px;
  width : 100%;
  padding : 10px;
  display : flex;
  position : relative;
  min-height : 80px;
  margin : 5px 0;
`

const SSettingLine = styled.div`
  display : flex;
  flex-direction: column;
  margin-right : 5px;
`

const SVideoTitle = styled.div`
  
`
function ParagraphVideo(prop) {

  const setParagraphId = useSetRecoilState(templateParagraphId)
  const [paragraphs, setParagraphs] = useRecoilState(templateParagraphF(prop.data))

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

  return (
    <SParagraphVideo>
        <SSettingLine>
          <SimoDiv1>
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