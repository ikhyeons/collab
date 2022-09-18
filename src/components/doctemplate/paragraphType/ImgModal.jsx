import React from 'react'
import styled from 'styled-components'

const Sdiv = styled.div`
    background : rgba(0, 0, 0, 0.1);
    width : 100vw;
    height : 100vh;
    z-index : 100;
    position : fixed;
    left : 0;
    top : 0;
    text-align : center;
`

const Simg = styled.img`
    width : 80%;
    height : 80%;
    margin-top : 20px;
`

function ImgModal(prop) {
    const {setImgModal, imgModal, setMouseOnImg} = prop;
    console.log(imgModal)
  return (
    <Sdiv onClick={()=>{
        setImgModal((prev)=>({on:0, url : ''}))
        setMouseOnImg(1)
    }}>
        <Simg src={imgModal.src} />
    </Sdiv>
  )
}

export default ImgModal