import React, { useState } from 'react'
import styled from 'styled-components'
import ParagraphText from './paragraphType/ParagraphText';
import ParagraphImg from './paragraphType/ParagraphImg';
import ParagraphVideo from './paragraphType/ParagraphVideo';
import ParagraphLink from './paragraphType/ParagraphLink';

const SParagraphList = styled.ul`
  border : 1px solid gray;
  border-radius : 5px;
  padding : 4px;
  width : 100%;
`

function ParagraphList() {

  const [paragraphs, setParagraphs] = useState([
    {
      id : '1',
      type : 'text',
      data : '내용',
    },
    {
      id : '2',
      type : 'image',
      data : '내용',
    },
    {
      id : '3',
      type : 'video',
      data : '내용',
    },
    {
      id : '4',
      type : 'link',
      linktype : 'youtube', //youtube, web,
      data : '내용',
    },

  ]);

  return (
    <SParagraphList>
        {paragraphs.map((data, i)=>{
          if (data.type === 'text') return <ParagraphText data={data} />
          else if (data.type === 'image') return <ParagraphImg data={data} />
          else if (data.type === 'video') return <ParagraphVideo data={data} />
          else if (data.type === 'link') return <ParagraphLink data={data} />
        })}
    </SParagraphList>
  )
}

export default ParagraphList