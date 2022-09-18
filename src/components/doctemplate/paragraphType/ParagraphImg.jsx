import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { BsThreeDotsVertical,  } from 'react-icons/bs'
import {MdOutlineCancel, MdOutlineEditNote} from 'react-icons/md'
import { useDrag, useDrop } from 'react-dnd'
import { useRecoilState, useSetRecoilState, useResetRecoilState } from 'recoil'
import { templateParagraph, templateParagraphId, currentDocId, paragraphListForceRerender } from '../../../Atoms/atom'
import axios from 'axios'
import { webPort } from '../../../port'
import InputImg from './InputImg'
import ImgModal from './ImgModal'

const SInnerDataV = styled.div`
  padding-left : 25px;
  width : 100%;
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

const SParagraphImg = styled.div`
  background : lightyellow;
  border-radius : 5px;
  width : 100%;
  display : flex;
  position : relative;
  min-height : 80px;
  margin : 5px 0;
  :hover{
    background : rgba(255, 255, 200, 0.3);
  }
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

const SImageBox = styled.div`
  background : lightyellow;
  display : flex;
  width : 100%;
  overflow-X : scroll;

  &::-webkit-scrollbar{
    height : 8px;
    background : rgba(240,240,150,0.3);
  }

  &::-webkit-scrollbar-thumb{
    height: 4%;
    background-color: rgba(215,215,150,1);
    border : 1px solid yellow;
    border-radius: 5px;    
  }
`

const SImage = styled.img`
  max-height : 400px;
  min-height : 400px;
  margin-right : 7px;
`

const SImageWrap = styled.div`
  position : relative;
  z-index : 1;
`

const xStyle = {
  position : 'absolute', 
  top : '5px', 
  left : '0',
  cursor : 'pointer',
  color : 'yellow',
  fontSize : '25px',
}

function ParagraphImg(prop) {
  const {id, sequent, data} = prop;
  const setParagraphId = useSetRecoilState(templateParagraphId);
  const [paragraphs, setParagraphs] = useRecoilState(templateParagraph(data))
  const [docId, setDocId] = useRecoilState(currentDocId);
  const [aparagraphListForceRerender, setParagraphListForceRerender] = useRecoilState(paragraphListForceRerender);
  const resetState2 = useResetRecoilState(templateParagraphId);
  const [edit, setEdit] = useState(0);
  const [imgModal, setImgModal] = useState({on : 0, src : ''})

  useEffect(()=>{
    axios({
      url: `http://${webPort.express}/readDocPic/${paragraphs.paragraphNum}`,
      method: 'get',
      withCredentials : true,
    }).then((res)=>{
      setParagraphs((prev)=>{
        let newData = {...prev}
        newData.imgs = {...prev.url}
        newData.imgs = res.data.data
        return newData
      })
    })
  }, [aparagraphListForceRerender])

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
        item: { id, sequent : sequent },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
        end: (item) => {
          //index = 집은 놈의 인덱스  item.index = 떨어진 놈의 인덱스  id = 집은 놈의 아이디
          axios({
            url: `http://${webPort.express}/changeParagraphOrder`,
            method: 'put',
            withCredentials : true,
            data:{
              docNum: docId,
              order : item.sequent,
              targetOrder : sequent,
            }
          }).then(()=>{
            setParagraphListForceRerender((prev)=>prev+1);
          })
        },
      })
    )
  
    const [{isOver}, drop] = useDrop({
      accept: 'paragraphList',
      hover: (item, monitor) => {
        console.log(item.sequent, sequent)
        if (item.sequent === sequent) {
          return null
        }
        //item.index = 집은놈의 인덱스 index = 올라간 놈의 인덱스
        item.sequent = sequent;
      },
      collect : monitor => ({
        isOver : monitor.isOver(),
      })
    })

  return (
    <SParagraphImg ref = {previewRef}>
        {imgModal.on===1?<ImgModal imgModal={imgModal} setImgModal={setImgModal} setMouseOnImg={prop.setMouseOnImg} src={data.url} /> : null}
        <SSettingLine isOver = {isOver} ref = {node => drop(node)}>
          <SimoDiv1 ref={node => dragRef(drop(node))}>
            <BsThreeDotsVertical />
          </SimoDiv1>

          <SimoDiv1>
            <MdOutlineEditNote onClick={()=>{edit===0? setEdit(1) : setEdit(0)}} />
          </SimoDiv1>

          <SimoDiv2 onClick={()=>{delParagraph()}}>
            <MdOutlineCancel />
          </SimoDiv2>
        </SSettingLine>

        <SInnerDataV >
          <SImageBox 
            onClick={(e)=>{prop.setMouseOnImg(1)}}
            onMouseLeave={(e)=>{prop.setMouseOnImg(0)}}
            onWheel={(e)=>{if(prop.mouseOnImg===1 && e.deltaY>0)e.currentTarget.scrollLeft+=600; else if(prop.mouseOnImg===1 && e.deltaY<0) e.currentTarget.scrollLeft-=600;setTimeout(()=>{ }, 1500)}}
          >
              {edit===1?<InputImg setParagraphListForceRerender={setParagraphListForceRerender} id={data.paragraphNum}/> : null}
              {paragraphs.imgs.map((data, i)=> {return <SImageWrap key={i}><SImage onClick={()=>{
                if(prop.mouseOnImg === 1){
                  setImgModal((prev)=>({on:1, src : data.url}));
                }
              }} src={data.url} />{edit===1?<MdOutlineCancel onClick={()=>{console.log(data.pPicNum)}} style={xStyle} /> : null}</SImageWrap>})}
          </SImageBox>
          
        </SInnerDataV>
        
    </SParagraphImg>
  )
}

export default ParagraphImg