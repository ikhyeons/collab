import React from "react";
import styled from "styled-components";

// 프로젝트 추가 팝업 div
const Modaldiv = styled.div`
    width: 360px;
    position: absolute;
    z-index: 99;
    transform:translate(200px, -23px);
    text-align:center;
`;

// 프로젝트 추가 팝업 section
const Modalsection = styled.section`
    display:flex;
    justify-content:space-between;

`;

// 프로젝트 추가 버튼
const Modalbutton = styled.button`
    width: 50px;
    height: 20px;
    margin-left:5px;
`;

const Modal = (props) =>{
    const { open, close, addProject} = props;

    return(
        <Modaldiv className={open ? 'openModal modal' : 'modal' }>
            {open? (
            <Modalsection>
                <header>
                    새 프로젝트를 생성하시겠습니까?
                </header>
                <footer>
                    <Modalbutton className="check" onClick={addProject}>
                        yes
                    </Modalbutton>
                    <Modalbutton className="close" onClick={close}>
                        close
                    </Modalbutton>
                </footer>
            </Modalsection>
            ) : null}
        </Modaldiv>
    );
};
export default Modal;