import React from "react";
import styled from "styled-components";

const Modalnamediv = styled.div`
    width: 300px;
    position:absolute;
    z-index: 99;
    text-align:center;
    transform:translate(400px, 60px);
`;

const Modalnamesection = styled.section`
    display:flex;
    justify-content:space-between;
`;

const Modalnamebutton = styled.button`
    width: 50px;
    height: 20px;
    margin-left:5px;
`;

const ModalName = (props) =>{
    const { open, close } = props;

    return(
        <Modalnamediv className={open ? 'openNameModal modal' : 'modal' }>
            {open? (
            <Modalnamesection>
                <header>
                    로그아웃 하시겠습니까?
                </header>
                <footer>
                    <Modalnamebutton className="check" onClick={close}>
                        yes
                    </Modalnamebutton>
                    <Modalnamebutton className="close" onClick={close}>
                        close
                    </Modalnamebutton>
                </footer>
            </Modalnamesection>
            ) : null}
        </Modalnamediv>
    );
};
export default ModalName;