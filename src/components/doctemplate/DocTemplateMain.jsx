import React, {useState} from 'react'
import styled from 'styled-components'
import ParagraphList from './ParagraphList'
import DocReplyMain from './DocReplyMain'
import Participant from './Participant'
import Licenser from './Licenser'
import { useRecoilState } from 'recoil'
import { templateMainData } from '../../Atoms/atom'

const STemplateMain = styled.div`
    
    width : 50%;
    background : rgb(245, 245, 230);
    border : 4px solid rgb(240, 240, 220);
    height : 100vh;
    overflow-Y : ${prop=>prop.mouseOnImg === 1? 'hidden' : 'auto'};
    overflow-X : hidden;
    min-width : 600px;

    &::-webkit-scrollbar{
        width: 7px;
        background : rgba(240,240,150,1);
    }

    &::-webkit-scrollbar-thumb{
        height: 17%;
        background-color: rgba(255,255,170,1);
        border : 1px solid yellow;
        border-radius: 5px;    
    }
`

const Stitle = styled.div`
    width : 100%;
    font-size : 40px;
    font-weight : bold;
    margin-bottom : 10px;
    border-bottom : 2px solid black;
    padding : 10px;
`

const SsetMain = styled.div`
    width : 100%;
    font-size : 19px;
    margin : 0 0 0 10px;
    background : none;
    padding : 10px 10px 0 10px;
`

const Sname = styled.span`
    text-align : center;
    border : 1px solid purple;
    border-radius : 10px;
    padding : 2px;
    background : rgb(205, 0, 205);
    color : white;
    cursor : pointer;
    margin : 2px;
    font-size : 15px;
    :hover{
        background : rgb(235, 0, 235);
    }
`

const Ssets = styled.div`
    margin-bottom : 3px;
`

function DocTemplateMain() {
    const [templateData, setTemplateData] = useRecoilState(templateMainData);
    const [mouseOnImg, setMouseOnImg] = useState(0);
    
  return (
    <STemplateMain mouseOnImg={mouseOnImg} >
        <Stitle>    {/* 제목 */}
            {'세번째 글 제목'}
        </Stitle> 

        <SsetMain>
            <Ssets>작성일 : {templateData.makeDate}</Ssets> {/* 작성일 */}
            <Ssets>수정일 : {templateData.modifyDate}</Ssets> {/* 수정일 */}
            <Ssets>작성자 : <Sname>{templateData.maker}</Sname></Ssets> {/* 작성자 */}
            
            <Participant /> {/* 참여자 */}
            <Licenser />    {/* 허가자 */}
        </SsetMain>
        
        <ParagraphList mouseOnImg={mouseOnImg} setMouseOnImg={setMouseOnImg} />   {/* 문단들 */}

        <DocReplyMain />   {/* 댓글 */}

    </STemplateMain>
  )
}

export default DocTemplateMain