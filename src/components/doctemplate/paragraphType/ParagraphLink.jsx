import React from 'react'
import styled from 'styled-components'
import { BsThreeDotsVertical,  } from 'react-icons/bs'
import {MdOutlineCancel, MdOutlineEditNote} from 'react-icons/md'

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

const SParagraphLink = styled.div`
  background : lightyellow;
  border-radius : 5px;
  width : 100%;
  padding : 10px;
  display : flex;
  position : relative;
  min-height : 100px;
  margin : 5px 0;
`

const SSettingLine = styled.div`
  display : flex;
  flex-direction: column;
  margin-right : 5px;
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

const SLinkLine = styled.div`
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
function ParagraphLink(prop) {

  const delParagraph = ()=>{
    prop.setParagraphs((prev)=>{
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
    <SParagraphLink>
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
          <SLinkLeft>
            <SLinkimg src='https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjAzMDZfMTAz%2FMDAxNjQ2NDk1MTQ1MDcy.CD4dxBXYd_Z8c7ukEUhg-5MZXQw45KxYYw1T4RxhRIcg.j-W-C2tFZ9bS9RwDxMTeH0UkffMN7AfLguaIbvTvKBYg.PNG.ggsone0805%2FCreamCam20220227172215.png&type=a340' />
          </SLinkLeft>
          <SLinkRight>
            <SLinkLine>{prop.data.data}</SLinkLine>
            <SLinkContent>프롭스로 받아온 세부내용 표시</SLinkContent>
          </SLinkRight>
        </SInnerDataV>
        
    </SParagraphLink>
  )
}

export default ParagraphLink