import React, {useState} from 'react'
import styled from 'styled-components'

const SCheckBox = styled.input`
    appearance : none;
    width: 75px;
    height: 38px;
    border: 1.5px solid gray;
    border-radius: 20px;
    position : relative;
    padding : 1px;
    background : gray;

    ::before {
        color : white;
        position : absolute;
        content : 'off';
        font-size : 28px;
        right : -4px;
        width : 40px;
        height : 40px;
        transition: all 0.2s ease-in-out;
      }

    ::after {
        content : '';

        width : 30px;
        height : 30px;
        background : yellow;
        border-radius : 50%;
        border : 1px solid yellow;

        position : absolute;
        left : 2px;

        transition: all 0.2s ease-in-out;
    }

    &:checked {
        border: 1.5px solid rgb(240, 240, 240);
        background : lightgreen;
        ::before {
            color : black;
            content : 'on';
            right : 28px;
          }
    
        ::after {
            content : '';
            left : 36px;
        }

      }
`

function Toggle() {

    const [isDark, setIsDark] = useState(0);

  return (

        <SCheckBox onChange={()=>{setIsDark((prev)=>{
            if(prev===0) return 1;
            if(prev===1) return 0;
        })}} type={'checkbox'} checked={isDark} />

  )
}

export default Toggle