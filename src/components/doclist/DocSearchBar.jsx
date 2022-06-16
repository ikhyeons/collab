import React from 'react'
import styled from 'styled-components'

const SdocSearchBar = styled.div`
    padding : 8px 10px 10px 6px;
    width : 100%;
    display : flex;
    height : 6%;
`

const Sinput = styled.input`
  font-size : 30px;
  height : 40px;
`

const Sbutton = styled.button`
  height : 40px;
  width : 45px;
  font-size : 20px;
`

function DocSearchBar() {
  return (
    <SdocSearchBar>
        <Sinput placeholder='검색! @태그검색' type="text" />
        <Sbutton>검색</Sbutton>
    </SdocSearchBar>
  )
}

export default DocSearchBar