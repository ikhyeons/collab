import React, { useState } from 'react'
import styled from 'styled-components'
import ParagraphText from './paragraphType/ParagraphText';
import ParagraphImg from './paragraphType/ParagraphImg';
import ParagraphVideo from './paragraphType/ParagraphVideo';
import ParagraphLink from './paragraphType/ParagraphLink';

const SParagraphList = styled.ul`
  border-radius : 5px;
  padding : 4px;
  width : 100%;
`

function ParagraphList() {

  const [paragraphs, setParagraphs] = useState([
    {
      id : '1',
      type : 'text',
      data : '거에 비해 요즘 사람들 문장 길이가 더 짧아졌다고 합니다. 문장을 짧게 하면 자기 생각을 분명히 드러낼 수 있지요. 현대인은 자기 생각을 상대방에게 빨리, 분명하게 전달하고 싶은가 봅니다. 보통 어느 글에서 문장이 길면 만연체, 짧으면 간결체로 분류합니다. 만연체는 온갖 정보를 한 문장에 담을 수 있지만, 그런 문장은 장황하며 호흡이 깁니다. 누군가가 글로 자기 생각을 남에게 확실히 빨리 전달하고자 한다면 만연체는 좋지 않은 방법입니다. 문장을 길게 쓰는 것은 쓰는이가 정보를 많이 전달하려고 욕심을 부리기 때문이지요. 짧게 쓰려면 전달하려는 정보를 하나씩 말로 설명한다고 치고, 그 말을 조리 있게 글로 정리하면 됩니다. 학자들은 우리글을 ‘언문이 일치’하는 글이라고 하지요. 그러나 따지고 보면 만연체는 언문이 일치하지 않는 문장입니다. 아래 글을 하나씩 끊',
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

    {
      id : '5',
      type : 'text',
      data : '고 싶은가 봅니다. 보통 어느 글에서 문장이 길면 만연체, 짧으면 간결체로 분류합니다. 만연체는 온갖 정보를 한 문장에 담을 수 있지만, 그런 문장은 장황하며 호흡이 깁니다. 누군가가 글로 자기 생각을 남에게 확실히 빨리 전달하고자 한다면 만연체는 좋지 않은 방법입니다. 문장을 길게 쓰는 것은 쓰는이가 정보를 많이 전달하려고 욕심을 부리기 때문이지요. ',
    },

    {
      id : '6',
      type : 'image',
      data : '내용',
    },

    {
      id : '7',
      type : 'video',
      data : '내용',
    },
    
    {
      id : '8',
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