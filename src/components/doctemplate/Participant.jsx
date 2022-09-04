import React, {useState, useRef} from 'react'
import {Mention, MentionsInput} from 'react-mentions'
import defaultStyle from './defaultStyle.js'
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { templateMainData, userNamePool, templateForceRerender, currentDocId } from '../../Atoms/atom.js';
import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
    
    const [namePool, setNamePool]= useRecoilState(userNamePool);
    const [templateData, setTemplateData] = useRecoilState(templateMainData);
    const [templateforceRerender, setTemplateForceRerender] = useRecoilState(templateForceRerender)
    const [docNum, setDocNum] = useRecoilState(currentDocId);

    const [inputValue, setInputValue] = useState('');
    const [isAdd, setIsAdd] = useState(0);
    const lineRef = useRef(null);
    const {projectNum} = useParams()
    
    useEffect(()=>{
        axios({
            url: `http://localhost:1004/readProjectCollaborator/${projectNum}`,
            method: 'get',
            withCredentials : true,
          }).then((res)=>{
            let newArray = res.data.data.map((data, i)=>({id : data.userNum, display : data.nickName}))
            setNamePool(newArray);
          })
        axios({
        url: `http://localhost:1004/readDocParticipant/${docNum}`,
        method: 'get',
        withCredentials : true,
        }).then((res)=>{
            let resArray = res.data.data.map((data)=>{return {pid : data.particiNum, id : data.userNum, display : data.nickName}})
            setTemplateData((prev)=>{
                let newData = {...prev};
                newData.participant = resArray;
                return newData
            })
        })

    }, [templateforceRerender, docNum])

    const onParticipantMention = (e)=>{
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
                return <Sname key={i}>@{data.display} <Sx
                onClick={()=>{
                    setTemplateData((prev)=>{
                        let newData = {...prev};
                        newData.participant = newData.participant.filter((fdata)=>!(fdata.id===data.id))
                        return newData
                    })
                axios({
                    url: `http://localhost:1004/delDocParticipant`,
                    method: 'delete',
                    data : {
                        docNum : docNum,
                        particiNum : data.pid,
                    },
                    withCredentials : true,
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
                    for(let j=0; j<templateData.participant.length;j++) {
                        if(templateData.participant[j].id==id)
                        return prev;
                    }
                    let newData = {...prev};
                    newData.participant = [...newData.participant, {id, name : display}];
                    axios({
                        url: `http://localhost:1004/createDocParticipant`,
                        method: 'post',
                        data : {docNum : docNum, selectedUserNum : id},
                        withCredentials : true,
                      }).then(()=>{
                        setTemplateForceRerender((prev)=>prev===0? 1 : 0);
                      });
                    return newData;
                })
            }}
            />
        </MentionsInput>}
    </div>
  )
}

export default Participant