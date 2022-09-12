import React, {useState, useEffect, useRef} from 'react'
import {Mention, MentionsInput} from 'react-mentions'
import defaultStyle from './defaultStyle.js'
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { templateMainData, userNamePool, currentDocId, templateForceRerender } from '../../Atoms/atom.js';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { webPort } from "../../port";

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

  
  const [namePool, setNamePool]= useRecoilState(userNamePool);
  const [templateData, setTemplateData] = useRecoilState(templateMainData)
  const [docNum, setDocNum] = useRecoilState(currentDocId);
  const [templateforceRerender, setTemplateForceRerender] = useRecoilState(templateForceRerender)
  const [isAdd, setIsAdd] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const lineRef = useRef(null);
  const {projectNum} = useParams()

    useEffect(()=>{
        axios({
            url: `http://${webPort.express}/readProjectCollaborator/${projectNum}`,
            method: 'get',
            withCredentials : true,
          }).then((res)=>{
            let newArray = res.data.data.map((data, i)=>({id : data.userNum, display : data.nickName}))
            setNamePool(newArray);
          })
        axios({
        url: `http://${webPort.express}/readDocLicenser/${docNum}`,
        method: 'get',
        withCredentials : true,
        }).then((res)=>{
            let resArray = res.data.data.map((data)=>{return {pid : data.licenserNum, id : data.userNum, display : data.nickName}})
            setTemplateData((prev)=>{
                let newData = {...prev};
                newData.licenser = resArray;
                return newData
            })
        })
    }, [templateforceRerender, docNum])

  const onLicenserModal = (e)=>{
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
        <Licensers ref={lineRef} onClick={(e)=>{onLicenserModal(e)}}>
            허가자 : 
            {
            templateData.licenser.map((data, i)=>{
                console.log(data)
                return <Sname key={i}>@{data.display} <Sx
                onClick={()=>{
                    setTemplateData((prev)=>{
                        let newData = {...prev};
                        newData.licenser = newData.licenser.filter((fdata)=>!(fdata.id===data.id))
                        return newData
                    })
                axios({
                    url: `http://${webPort.express}/delDocLicenser`,
                    method: 'delete',
                    data : {
                        docNum : docNum,
                        licenserNum : data.pid,
                    },
                    withCredentials : true,
                })
                }}
            >X</Sx></Sname>
        })}</Licensers>
        
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
                    for(let j=0; j<templateData.licenser.length;j++) {
                        if(templateData.licenser[j].id==id)
                        return prev;
                    }
                    let newData = {...prev};
                    newData.licenser = [...newData.licenser, {id, name : display}];
                    axios({
                        url: `http://${webPort.express}/createDocLicenser`,
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

export default Licenser