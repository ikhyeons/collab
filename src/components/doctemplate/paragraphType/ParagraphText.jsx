import React, {useRef, useState, useCallback} from 'react'
import styled from 'styled-components'
import { BsThreeDotsVertical,  } from 'react-icons/bs'
import {MdOutlineCancel, MdOutlineEditNote} from 'react-icons/md'

const SInnerDataV = styled.div`
  padding-left : 25px;
`

const SInnerDataI = styled.textarea`
  margin-left : 25px;
  width : 100%;
  background : ${(prop)=>prop.modify==0?'none' : 'rgba(255, 255, 200, 0.7)'};
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
`

const SSettingLine = styled.div`
  display : flex;
  flex-direction: column;
  margin-right : 5px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`

function ParagraphText(prop) {

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
              setInputValue(prop.data.data);
              prop.setParagraphs((prev)=>{
                let newList = [
                  ...prev
                ]
                newList[prop.data.id].modify = 1;
                console.log(newList);
                return newList;
              })
            }}
          >
            <MdOutlineEditNote />
          </SimoDiv1>

          <SimoDiv2
            onClick={()=>{
              prop.setParagraphs((prev)=>{
                let arrayData = [
                  ...prev,
                ]
                arrayData = arrayData.filter((list)=>{
                  return list.id !== prop.data.id;
                });
                
                console.log(arrayData);
                return arrayData;
              })}}
          >
            <MdOutlineCancel />
          </SimoDiv2>
        </SSettingLine>

        {
        prop.data.modify === 0?
        <SInnerDataV >
          {prop.data.data}  
        </SInnerDataV>
        :
        <SInnerDataI modify = {prop.data.modify} value={inputValue} 
        ref={textRef}
        onInput={handleResizeHeight}
        onChange={(e)=>{setInputValue(e.target.value)}}
        onKeyDown={(e)=>{
          
          if(e.key === 'Enter' && !e.shiftKey){
            prop.setParagraphs((prev)=>{
              let newList = [
                ...prev
              ]
              newList[prop.data.id].data = inputValue;
              newList[prop.data.id].modify = 0;
              console.log(newList);
              return newList;
            })
            setInputValue('');
          }
        }}
        />
        }
        
    </SParagraphText>
  )
}

export default ParagraphText