import React, {useState} from 'react'
import styled from 'styled-components'
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { paragraphListForceRerender, templateParagraphId, paragraphForceRerender } from '../../../Atoms/atom';
import { webPort } from '../../../port';

const Sform = styled.form`
    width : 130px;
    height : 100%;
`

const Sinput = styled.input`
    height: 30px;
    left: 50%;
    right: 30%;
    margin-top: 300px;
`

function InputImg(prop) {
    const {id, setParagraphListForceRerender} = prop
    const formSubmit = (e) => {
        const formData = new FormData();
        Array.from(e.target.files).map((data)=>{
            formData.append('imgs', data);
        })
        console.log(e.target.files)
        axios.post(`http://${webPort.express}/uplodaDocPic`, formData, {withCredentials : true,})
        .then((res)=>{
            axios({
                url: `http://${webPort.express}/createDocPic`,
                method: 'post',
                withCredentials : true,
                data:{
                    paragraphNum : id,
                    urls : res.data.locations
                }
              }).then(()=>{setParagraphListForceRerender((prev)=>prev+1);})
        })
    }

  return (
    <Sform>
        <Sinput 
            type="file"
            accept='image/*'
            id='img'
            name='imgs'
            multiple
            onChange={(e)=>{formSubmit(e)}}
        />
    </Sform>
  )
}

export default InputImg