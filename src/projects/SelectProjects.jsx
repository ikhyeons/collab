import React, {useState} from "react";
import styled from 'styled-components';
import DetailProject from './DetailProject'
import Modal from './Modal'
import ModalName from "./NameModal";
import { ScrollMenu } from "react-horizontal-scrolling-menu";

//화면 상단 로고 부분 div
const Logodiv = styled.div`
    height: 50vh;
    width: 90vw;
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
    margin-left:37px;
`;

//화면하단 프로젝트  div
const Projectdiv = styled.div`
    margin-bottom: 10px;
    width: 90vw;
    overflow:scroll;
    background : white;
    height : 40vh;
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
    background-color:none;
`;


//  react-horizontal-scrolling-menu 동작을 위한 onWheel 함수
function onWheel(apiObj, ev) {
    const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;
  
    if (isThouchpad) {
      ev.stopPropagation();
      return;
    }
  
    if (ev.deltaY < 0) {
      apiObj.scrollNext();
    } else if (ev.deltaY > 0) {
      apiObj.scrollPrev();
    }
  }

const SelectProjects = () =>{
    //프로젝트 추가 생성을 위한 변수
    const [project, setProject] = useState([0]);
    // 팝업창 띄우기위해 사용되는 변수
    const [modalOpen, setModalOpen] = useState(false);
    const [modalnameOpen, setModalNameOpen] = useState(false);
    // 사용자 이름 변수
    const [name] = useState('이름');

    // 팝업창 켜지는 여부에 따른 함수
    const openNameModal = ()=>{
        setModalNameOpen(true);
    }

    const closeNameModal = () =>{
        setModalNameOpen(false);
    }

    const openModal = () => {
        setModalOpen(true);
    }

    const closeModal = () =>{
        setModalOpen(false);
    }

    //프로젝트 추가 함수
    const addProject = () => {
        let countProject = [...project];
        let counter = countProject.slice(-1)[0];
        counter+=1;
        countProject.push(counter);
        setProject(countProject);
        closeModal();
    };

    return (
        <>
        <ModalName open={modalnameOpen} close={closeNameModal}></ModalName>
        <Logodiv>
            <Logoname>로고 자리</Logoname>
            <Username onClick={openNameModal}>{name}</Username>
        </Logodiv>
        <Namediv>
            <Name>프로젝트 목록</Name>
            <Addbutton onClick={openModal}>
                +
            </Addbutton>
        </Namediv>
            <Modal open={modalOpen} close={closeModal} addProject={addProject}></Modal>
            
        <ScrollMenu // 작동을 안함
            onWheel={onWheel}
        >
            <Projectdiv>
                <br/>
                <DetailProject project={project} />
            </Projectdiv>
        </ScrollMenu>
        </>
    );
};

export default SelectProjects ;