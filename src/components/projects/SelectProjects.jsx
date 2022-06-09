import React, {useState} from "react";
import styled from 'styled-components';
import DetailProject from './DetailProject'
import ModalName from "./NameModal";

//화면 상단 로고 부분 div
const Logodiv = styled.div`
    height: 34vh;
    width: 95vw;
    display:flex;
    justify-content:space-between;
`;

// 로고 h1
const Logoname = styled.h1`
    margin-left:50px;
    margin-top:20px;
`;

//프로젝트 목록 div
const Namediv = styled.div`
    border-bottom:1px solid grey;
    width: 130px;
    margin-left:70px;
`;

//화면하단 프로젝트  div
const Projectdiv = styled.div`
    margin-bottom: 10px;
    width: 95vw;
    overflow:scroll;
    text-align:center;
    background : white;
    height : 55vh;
    overflow-y:hidden;
    ::-webkit-scrollbar {
        height: 5px;
    }
    ::-webkit-scrollbar-thumb{
        background-color: grey;
        border-radius:10px;
    }
    ::-webkit-scrollbar-track{
        background-color: white;
        border-radius:10px;
    }
`;

//프로젝트 추가버튼 
const Addbutton = styled.button`
    width: 20px;
    height: 20px;
    border: 1px solid black;
    border-radius: 20%;
    text-align:center;
    padding:0px;
`;

//프로젝트 목록 span
const Name = styled.span`
`;

//사용자 이름 버튼
const Username = styled.button`
    text-decoration:none;
    margin-top:20px;
    height: 30px;
    font-size:20px;
    background-color:white;
    border: 1px solid white;
`;

const ScrollMenu = styled.div`
    display:flex;
    justify-content:center;
`;

let count = 1;

const SelectProjects = () =>{
    //프로젝트 추가 생성을 위한 변수
    const [project, setProject] = useState([{name:'새 프로젝트1', pic:''}]);
    
    // 팝업창 띄우기위해 사용되는 변수
    const [modalnameOpen, setModalNameOpen] = useState(false);
    // 사용자 이름 변수
    const [name] = useState('이름');

    //프로젝트 추가 함수
    const addProject = () => {
        count+=1;
        setProject((prev)=>{
            let newProject = [
                ...prev,
                {
                    name: `새 프로젝트${count}`,
                    pic:''
                },
            ]
            return newProject;
        })
    };

    return (
        <>
        <ModalName open={modalnameOpen} close={setModalNameOpen}></ModalName>
        <Logodiv>
            <Logoname>로고 자리</Logoname>
            <Username onClick={setModalNameOpen}>
                {name}
            </Username>
        </Logodiv>
        <Namediv>
            <Name>프로젝트 목록</Name>
            <Addbutton onClick={addProject}>
                +
            </Addbutton>
        </Namediv>            
        <ScrollMenu>
            <Projectdiv>
                <br/>
                <DetailProject project={project}/>
            </Projectdiv>
        </ScrollMenu>
        </>
    );
};

export default SelectProjects ;