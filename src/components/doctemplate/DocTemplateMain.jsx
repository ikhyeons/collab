import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import ParagraphList from './ParagraphList'
import DocReplyMain from './DocReplyMain'
import Participant from './Participant'
import Licenser from './Licenser'
import { useRecoilState } from 'recoil'
import { templateMainData, currentDocId, docForceRerender } from '../../Atoms/atom'
import axios from 'axios'
import { webPort } from "../../port";

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

const Stitle = styled.input`
    width : 100%;
    font-size : 40px;
    font-weight : bold;
    margin-bottom : 10px;
    border-bottom : 2px solid black;
    border-radius : 8px;
    padding : 10px;
    background : rgba(255, 255, 200, 0.3);
    :focus{
        background : rgba(255, 255, 0, 0.1)
    }
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
    const [docId, setDocId] = useRecoilState(currentDocId)
    const [mouseOnImg, setMouseOnImg] = useState(0);
    const [title, setTitle] = useState('')
    const [docforceRerender, setDocForceRerender] = useRecoilState(docForceRerender);
    
    
    useEffect(()=>{
        axios({
            url: `http://${webPort.express}/readDocTitle/${docId}`,
            method: 'get',
            withCredentials : true,
        }).then(res=>{res.data.data && setTitle(res.data.data.docTitle)});
        axios({
        url: `http://${webPort.express}/readDocMakeDate/${docId}`,
        method: 'get',
        withCredentials : true,
        }).then(res=>{res.data.data && setTemplateData((prev)=>{
            let newData = {...prev, makeDate : res.data.data.makeDate.slice(0, 10)}
            return newData
        })});
        axios({
            url: `http://${webPort.express}/readDocMaker/${docId}`,
            method: 'get',
            withCredentials : true,
            }).then(res=>{
                res.data.data && setTemplateData((prev)=>{
                    let newData = {...prev, maker : res.data.data.nickName.slice(0, 10)}
                    return newData
                })
            })
    }, [docId])

    useEffect(()=>{
        if(title!==''){
            axios({
                url: `http://${webPort.express}/changeDocTitle`,
                method: 'put',
                data : {
                    docNum : docId,
                    docTitle : title,
                },
                withCredentials : true,
            }).then(()=>{setDocForceRerender((prev)=>prev===0? 1 : 0);})
        }
    }, [title])

    
  return (
    <STemplateMain mouseOnImg={mouseOnImg} >
        <Stitle onChange={async (e)=>{
            setTitle(e.target.value);
        }} value={title}></Stitle> 

        <SsetMain>
            <Ssets>작성일 : {templateData && templateData.makeDate}</Ssets> {/* 작성일 */}
            <Ssets>수정일 : {templateData && templateData.modifyDate}</Ssets> {/* 수정일 */}
            <Ssets>작성자 : <Sname>{templateData && templateData.maker}</Sname></Ssets> {/* 작성자 */}
            
            <Participant /> {/* 참여자 */}
            <Licenser />    {/* 허가자 */}
        </SsetMain>
        
        <ParagraphList mouseOnImg={mouseOnImg} setMouseOnImg={setMouseOnImg} />   {/* 문단들 */}

        <DocReplyMain />   {/* 댓글 */}

    </STemplateMain>
  )
}

export default DocTemplateMain