import React from 'react'
import styled from 'styled-components'
import { BsThreeDotsVertical,  } from 'react-icons/bs'
import {MdOutlineCancel} from 'react-icons/md'
import { getIsRtlScrollbarOnLeft } from '@fullcalendar/core'
import { useState } from 'react'

const SInnerDataV = styled.div`
  padding-left : 25px;
  width : 100%;
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

const SParagraphImg = styled.div`
  background : lightyellow;
  border-radius : 5px;
  width : 100%;
  padding : 10px;
  display : flex;
  position : relative;
  min-height : 80px;
  margin : 5px 0;
  :hover{
    background : rgba(255, 255, 200, 0.3);
  }
`

const SSettingLine = styled.div`
  display : flex;
  flex-direction: column;
  margin-right : 5px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`

const SImageBox = styled.div`
  background : lightyellow;
  display : flex;
  width : 100%;
  overflow-X : scroll;

  &::-webkit-scrollbar{
    height : 8px;
    background : rgba(240,240,150,1);
  }

  &::-webkit-scrollbar-thumb{
    height: 4%;
    background-color: rgba(255,255,170,1);
    border : 1px solid yellow;
    border-radius: 5px;    
  }
`

const SImage = styled.img`
  max-height : 600px;
  min-height : 600px;
  margin-right : 7px;
`

function ParagraphImg(prop) {

  return (
    <SParagraphImg>
        <SSettingLine>
          <SimoDiv1>
            <BsThreeDotsVertical />
          </SimoDiv1>

          <SimoDiv2>
            <MdOutlineCancel />
          </SimoDiv2>
        </SSettingLine>

        <SInnerDataV >
          <SImageBox 
            onClick={(e)=>{prop.setOnImg(1)}}
            onMouseLeave={(e)=>{prop.setOnImg(0)}}
            onWheel={(e)=>{if(prop.onImg===1 && e.deltaY>0)e.currentTarget.scrollLeft+=300; else if(prop.onImg===1 && e.deltaY<0) e.currentTarget.scrollLeft-=300;}}
          >
              <SImage src="http://www.fintechpost.co.kr/news/photo/201907/46375_27128_0925.jpg" />
              <SImage src="https://cdn.topstarnews.net/news/photo/201908/653630_355016_3125.jpg" />
              <SImage src="http://www.biztribune.co.kr/news/photo/201903/202520_52645_3519.png" />
              <SImage src="http://www.fintechpost.co.kr/news/photo/201907/46375_27128_0925.jpg" />
              <SImage src="https://cdn.topstarnews.net/news/photo/201908/653630_355016_3125.jpg" />
              <SImage src="http://www.biztribune.co.kr/news/photo/201903/202520_52645_3519.png" />
              <SImage src="http://www.fintechpost.co.kr/news/photo/201907/46375_27128_0925.jpg" />
              <SImage src="https://cdn.topstarnews.net/news/photo/201908/653630_355016_3125.jpg" />
              <SImage src="http://www.biztribune.co.kr/news/photo/201903/202520_52645_3519.png" />
              <SImage src="http://www.fintechpost.co.kr/news/photo/201907/46375_27128_0925.jpg" />
              <SImage src="https://cdn.topstarnews.net/news/photo/201908/653630_355016_3125.jpg" />
              <SImage src="http://www.biztribune.co.kr/news/photo/201903/202520_52645_3519.png" />
          </SImageBox>
          
        </SInnerDataV>
        
    </SParagraphImg>
  )
}

export default ParagraphImg