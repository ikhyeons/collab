import React, {useState, useRef} from 'react'
import {Mention, MentionsInput} from 'react-mentions'
import defaultStyle from './defaultStyle.js'
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { templateMainData, userNamePool } from '../../Atoms/atom.js';

const Participants = styled.div`
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

function Participant() {
    
    const namePool = useRecoilValue(userNamePool);
    const [templateData, setTemplateData] = useRecoilState(templateMainData);

    const [inputValue, setInputValue] = useState('');
    const [isAdd, setIsAdd] = useState(0);


    const lineRef = useRef(null);
    
    const onParticipantMention = (e)=>{
        console.log(lineRef.current, e.target)
        if(lineRef.current === e.target){
            setIsAdd((prev)=>{
                return prev === 1 ? 0:1
            })
            setInputValue('');
        }
    }

  return (
    <div>
        <Participants ref={lineRef} onClick={(e)=>{onParticipantMention(e)}}>
        참여자 : 
        {
            templateData.participant.map((data, i)=>{
                return <Sname key={i}>@{data} <Sx
                onClick={()=>{
                    setTemplateData((prev)=>{
                        let newData = {...prev};
                        newData.participant = newData.participant.filter((fdata)=>!(fdata===data))
                        return newData
                    })
                }}
                >X</Sx></Sname>
            })}</Participants>
            
        {isAdd === 1 && <MentionsInput 
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
                setTemplateData((prev)=>{
                    if(templateData.participant.includes(id)) return prev;
                    let newData = {...prev};
                    newData.participant = [...newData.participant, id];
                    return newData;
                })
            }}
            />
        </MentionsInput>}
    </div>
  )
}

export default Participant