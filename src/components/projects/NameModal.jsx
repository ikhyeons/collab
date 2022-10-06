import React from "react";
import styled from "styled-components";
import axios from "axios";
import { webPort } from "../../port";

// 로그아웃 팝업 div
const Modalnamediv = styled.div`
    width: 180px;
    position:absolute;
    z-index: 99;
    text-align:center;
    transform:translate(82vw, 60px);
    font-size:15px;
`;

// 로그아웃 팝업 section
const Modalnamesection = styled.section`
    display:flex;
    flex-direction:column;
`;

// 로그아웃 팝업 버튼
const Modalnamebutton = styled.button`
    width: 50px;
    height: 20px;
`;

// 로그아웃 팝업 내 버튼 들어가는 footer
const Modalnamefooter = styled.footer`
    display:flex;
    justify-content:space-around;
`;

const ModalName = (props) =>{
    const { open, close } = props;
    const logoutf = ()=>{
        axios({
          method: 'post',
          withCredentials : true,
          url: `http://${webPort.express}/logout`,
        }).then((res)=>{
            window.location.replace("/")
        });
      }
    return(
        <>
        {open? (
            <Modalnamediv className={open ? 'openNameModal modal' : 'modal' }>
                <Modalnamesection>
                    <header>
                        로그아웃 하시겠습니까?
                    </header>
                    <br/>
                    <Modalnamefooter>
                        <Modalnamebutton className="check" onClick={()=>{logoutf()}}>
                            yes
                        </Modalnamebutton>
                        <Modalnamebutton className="close" onClick={()=>{close(false)}}>
                            close
                        </Modalnamebutton>
                    </Modalnamefooter>
                </Modalnamesection>
            </Modalnamediv>
            ) : null}
        </>
    );
};
export default ModalName;