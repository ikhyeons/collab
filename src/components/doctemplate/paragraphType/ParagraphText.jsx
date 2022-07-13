import React, {useRef, useState, useCallback, useEffect} from 'react'
import styled from 'styled-components'
import { BsThreeDotsVertical,  } from 'react-icons/bs'
import {MdOutlineCancel, MdOutlineEditNote} from 'react-icons/md'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { templateParagraphF, templateParagraphId } from '../../../Atoms/atom'

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

const SParagraphText = styled.div`
  background : lightyellow;
  border-radius : 5px;
  width : 100%;
  padding : 10px;
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
`

function ParagraphText(prop) {

  const setParagraphId = useSetRecoilState(templateParagraphId)
  const [paragraphs, setParagraphs] = useRecoilState(templateParagraphF(prop.data))

  useEffect(()=>{
    setParagraphs((prev)=>{
      return ({...prev , data : `${prop.data.id+'123'}`})
    })
  }, [])



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

  const textRef = useRef();
  const [inputValue, setInputValue] = useState('');

  const handleResizeHeight = useCallback(() => {
    textRef.current.style.height = textRef.current.scrollHeight + "px";
  }, []);

  return (
    <SParagraphText>
        <SSettingLine>
          <SimoDiv1>
            <BsThreeDotsVertical />
          </SimoDiv1>

          <SimoDiv1
            onClick={()=>{
              setInputValue(paragraphs.data);
              setParagraphs((prev)=>{
                let newData = {
                  ...prev
                }
                // 클릭된 놈이랑 아이디가 같은 객체의 수정을 1로 만들어야 됨.
                newData = {...newData, modify : 1}
                return newData;
              })
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
          {paragraphs.data}  
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
              newData = {...newData, data : inputValue, modify : 0}
              return newData;
            })
            setInputValue('');
          }
        }}
        onBlur = {(e)=>{
          setParagraphs((prev)=>{
            let newData = {
              ...prev
            }
            // 클릭된 놈이랑 아이디가 같은 객체의 수정을 1로 만들어야 됨.
            newData = {...newData, data : inputValue, modify : 0}
            return newData;
          })
          setInputValue('');
        }}
        />
        }
        
    </SParagraphText>
  )
}

export default ParagraphText