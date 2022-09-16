import React, {useRef, useState, useCallback, useEffect} from 'react'
import styled from 'styled-components'
import { BsThreeDotsVertical,  } from 'react-icons/bs'
import {MdOutlineCancel, MdOutlineEditNote} from 'react-icons/md'
import { useDrag, useDrop } from 'react-dnd'
import { useRecoilState, useSetRecoilState, useResetRecoilState } from 'recoil'
import { templateParagraph, templateParagraphId, paragraphListForceRerender, currentDocId, paragraphForceRerender } from '../../../Atoms/atom'
import axios from 'axios'
import { webPort } from '../../../port'

const SInnerDataV = styled.div`
  padding-left : 25px;
  width : 100%;
`

const SInnerDataI = styled.textarea`
  margin-left : 25px;
  width : 100%;
  background : ${(prop)=>prop.modify===0?'none' : 'rgba(255, 255, 200, 0.7)'};
  font-size : 16px;
  border : none;
  overflow : hidden;
  font-family : none;
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

const SParagraphText = styled.div`
  background : lightyellow;
  border-radius : 5px;
  width : 100%;
  display : flex;
  position : relative;
  min-height : 100px;
  margin : 5px 0;
  min-width : 380px;
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

function ParagraphText(prop) {

  const {id, data, num, sequent} = prop;
  const [paragraphId, setParagraphId] = useRecoilState(templateParagraphId)
  const [paragraphs, setParagraphs] = useRecoilState(templateParagraph(data));
  const [docId, setDocId] = useRecoilState(currentDocId);
  const [aparagraphListForceRerender, setParagraphListForceRerender] = useRecoilState(paragraphListForceRerender);
  const [aparagraphForceRerender, setParagraphForceRerender] = useRecoilState(paragraphForceRerender);
  const resetState = useResetRecoilState(templateParagraph(data));
  const [forceRerender, setForceRerender] = useState(0);

  const delParagraph = ()=>{
    axios({
      url: `http://${webPort.express}/delParagraph`,
      method: 'delete',
      data : {paragraphNum : paragraphs.paragraphNum, docNum : docId},
      withCredentials : true,
    }).then((res)=>{
      console.log(res)
    }).then(()=>{
      setParagraphListForceRerender((prev)=>prev+1);
    })
  }

  useEffect(()=>{
    axios({
      url: `http://${webPort.express}/readParagraphInfo/${num}`,
      method: 'get',
      withCredentials : true,
    }).then((res)=>{
      setParagraphs({...res.data.data, modify : 0, sequent : sequent});
    })
    return resetState()
  }, [paragraphId, forceRerender, aparagraphForceRerender, data])

  const textRef = useRef();
  const [inputValue, setInputValue] = useState('');

  const handleResizeHeight = useCallback(() => {
    textRef.current.style.height = textRef.current.scrollHeight + "px";
  }, []);

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
          setForceRerender(prev=>prev+1);
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
    <SParagraphText ref = {previewRef}>
        <SSettingLine isOver = {isOver} ref = {node => drop(node)}>
          <SimoDiv1 ref={node => dragRef(drop(node))}>
            <BsThreeDotsVertical />
          </SimoDiv1>

          <SimoDiv1
            onClick={()=>{
              setInputValue(paragraphs.innerData);
              setParagraphs((prev)=>{
                let newData = {
                  ...prev
                }
                // 클릭된 놈이랑 아이디가 같은 객체의 수정을 1로 만들어야 됨.
                newData = {...newData, modify : 1}
                return newData;
              }).then(()=>{setForceRerender(prev=>prev===0? 1 : 0);setInputValue('');})
            }}
          >
            <MdOutlineEditNote />
          </SimoDiv1>

          <SimoDiv2 onClick={()=>{delParagraph()}}>
            <MdOutlineCancel />
          </SimoDiv2>
        </SSettingLine>

        {
        paragraphs.modify === 0?
        <SInnerDataV>
          {paragraphs.innerData}
        </SInnerDataV>
        :
        <SInnerDataI modify = {paragraphs.modify} value={inputValue} 
        ref={textRef}
        onInput={handleResizeHeight}
        onChange={(e)=>{setInputValue(e.target.value)}}
        onKeyDown={(e)=>{
          if(e.key === 'Enter' && !e.shiftKey){
            setParagraphs((prev)=>{
              let newData = {
                ...prev
              }
              // 클릭된 놈이랑 아이디가 같은 객체의 수정을 1로 만들어야 됨.
              newData = {...newData, innerData : inputValue, modify : 0}
              console.log(newData)
              return newData;
            })
            axios({
              url: `http://${webPort.express}/changeParagraph`,
              method: 'put',
              withCredentials : true,
              data:{
                paragraphNum : num,
                innerData : inputValue,
              }
            }).then(()=>{setForceRerender(prev=>prev===0? 1 : 0);setInputValue('');})
          }
        }}
        onBlur = {(e)=>{
          setParagraphs((prev)=>{
            let newData = {
              ...prev
            }
            // 클릭된 놈이랑 아이디가 같은 객체의 수정을 1로 만들어야 됨.
            newData = {...newData, innerData : inputValue, modify : 0}
            return newData;
          })
          axios({
            url: `http://${webPort.express}/changeParagraph`,
            method: 'put',
            withCredentials : true,
            data:{
              paragraphNum : num,
              innerData : inputValue,
            }
          }).then(()=>{setForceRerender(prev=>prev===0? 1 : 0);setInputValue('');})
        }}
        />
        }
        
    </SParagraphText>
  )
}

export default ParagraphText