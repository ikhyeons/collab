import React from 'react'
import styled from 'styled-components'
import { FaSearch } from 'react-icons/fa'

const SdocSearchBar = styled.div`
    padding : 8px 10px 10px 6px;
    width : 100%;
    display : flex;
    height : 6%;
    position : relative;
    min-height : 57px;
`

const SinputWrap = styled.div`
  width : 350px;
  border : 1px solid black;
  border-radius : 15px;
  background : white;
  align-item : center;  
  padding : 2px 5px 5px 5px;
  display : flex;
  justify-content : space-between;
`

const Sinput = styled.input`
  width : 300px;
  font-size : 20px;
  height : 30px;
  border-radius : 10px;
  border : none;
`

const Sbutton = styled.button`
  height : 40px;
  width : 100px;
  font-size : 20px;
  position : absolute;
  right : 5px;
`

function DocSearchBar() {
  return (
    <SdocSearchBar>
      <SinputWrap>
        <Sinput placeholder='검색! @태그검색' type="text" />
        <FaSearch style={{fontSize : '20px', color : 'red', margin : '5px auto'}}/>
      </SinputWrap>
      <Sbutton>문서 작성</Sbutton>
    </SdocSearchBar>
  )
}

export default DocSearchBar