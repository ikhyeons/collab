import React, {useState, useEffect, useRef} from 'react'
import {Mention, MentionsInput} from 'react-mentions'
import defaultStyle from './defaultStyle.js'
import styled from 'styled-components';

const Licensers = styled.div`
    margin-bottom : 3px;
    :hover{
        background : rgba(0, 0, 0, 0.1);
        cursor : pointer;
    }
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

const Sx = styled.span`

`

function Licenser() {

  const [inputValue, setInputValue] = useState('');
  const [isAdd, setIsAdd] = useState(0);
  const [namePool, setNamePool] = useState([
      {
          id : '성익현',
          display : '@성익현',
      },
      {
          id : '강도경',
          display : '@강도경',
      },
  ])
  const [mentionList, setMentionList] = useState([

  ])
  const lineRef = useRef(null);
  useEffect(()=>{console.log(mentionList)},[mentionList])

  return (
    <div>
        <Licensers
            ref={lineRef}
            onClick={(e)=>{
                console.log(lineRef.current, e.target)
                if(lineRef.current === e.target){
                    setIsAdd((prev)=>{
                        return prev ==1 ? 0:1
                    })
                    setInputValue('');
                }
            }}
        >허가자 : {mentionList.map((data, i)=>{
            return <Sname key={i}>@{data} <Sx
            onClick={()=>{
                setMentionList((prev)=>{
                    let newData = prev.filter((fdata)=>!(fdata==data))
                    return newData
                })
                
            }}
            >X</Sx></Sname>
            
        })}</Licensers>
        {isAdd == 1 && <MentionsInput 
            placeholder='다시눌러 닫기, @이름입력'
            style={defaultStyle}
            value={inputValue}
            singleLine
            onChange={(e)=>{
                setInputValue(e.target.value);
            }}
        >
            <Mention 
            appendSpaceOnAdd
            style={{ backgroundColor: '#cee4e5' }} 
            data={namePool} 
            onAdd = {(id, display)=>{
                setMentionList((prev)=>{
                    if(mentionList.includes(id)) return prev;
                    return [
                        ...prev,
                        id,
                    ]
                })
            }}
            />
        </MentionsInput>}
    </div>
  )
}

export default Licenser