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

const SAddParagraph = styled.button`
  background : lightyellow;
  border-radius : 5px;
  width : 100%;
  padding : 14px;
  display : flex;
  position : relative;
  min-height : 50px;
  margin : 5px 0;
  border : 1px solid black;
  
  font-weight : bold;
  :hover{
    border : 2px solid black;
    padding : 13px;
    cursor : pointer;
  }
`

function ParagraphList(prop) {

  const [paragraphs, setParagraphs] = useState([
    {
      id : 1,
      type : 'text',
      data : '거에 비해 요즘 사람들 문장 길이가 더 짧아졌다고 합니다. 문장을 짧게 하면 자기 생각을 분명히 드러낼 수 있지요. 현대인은 자기 생각을 상대방에게 빨리, 분명하게 전달하고 싶은가 봅니다. 보통 어느 글에서 문장이 길면 만연체, 짧으면 간결체로 분류합니다. 만연체는 온갖 정보를 한 문장에 담을 수 있지만, 그런 문장은 장황하며 호흡이 깁니다. 누군가가 글로 자기 생각을 남에게 확실히 빨리 전달하고자 한다면 만연체는 좋지 않은 방법입니다. 문장을 길게 쓰는 것은 쓰는이가 정보를 많이 전달하려고 욕심을 부리기 때문이지요. 짧게 쓰려면 전달하려는 정보를 하나씩 말로 설명한다고 치고, 그 말을 조리 있게 글로 정리하면 됩니다. 학자들은 우리글을 ‘언문이 일치’하는 글이라고 하지요. 그러나 따지고 보면 만연체는 언문이 일치하지 않는 문장입니다. 아래 글을 하나씩 끊',
      modify : 0,
    },

    {
      id : 2,
      type : 'image',
      data : '내용',
      modify : 0,
    },

    {
      id : 3,
      type : 'link',
      linktype : 'youtube', //youtube, web,
      data : 'https://www.youtube.com/watch?v=jlm2f29ka_0',
      modify : 0,
    },

    {
      id : 4,
      type : 'video',
      data : '적절한 비디오 제목1',
      modify : 0,
    },


    {
      id : 5,
      type : 'text',
      data : '고 싶은가 봅니다. 보통 어느 글에서 문장이 길면 만연체, 짧으면 간결체로 분류합니다. 만연체는 온갖 정보를 한 문장에 담을 수 있지만, 그런 문장은 장황하며 호흡이 깁니다. 누군가가 글로 자기 생각을 남에게 확실히 빨리 전달하고자 한다면 만연체는 좋지 않은 방법입니다. 문장을 길게 쓰는 것은 쓰는이가 정보를 많이 전달하려고 욕심을 부리기 때문이지요. ',
      modify : 0,
    },

    {
      id : 6,
      type : 'image',
      data : '내용',
      modify : 0,
    },

    {
      id : 7,
      type : 'video',
      data : '적당한 비디오 제목2',
      modify : 0,
    },
    
    {
      id : 8,
      type : 'link',
      linktype : 'youtube', //youtube, web,
      data : '내용',
      modify : 0,
    },

  ]);

  return (
    <SParagraphList>
        <SAddParagraph
          onClick={()=>{
            setParagraphs((prev)=>{
              let newArray = [
                ...prev
              ]
              newArray = newArray.map((data)=>{
                 return ({
                  ...data,
                  id : data.id++,
                 })
              })
              newArray.unshift({
                id : 0,
                type : 'text',
                data : '내용',
                modify : 1,
               })
              return newArray;
            })
          }}
        >+ 문단추가</SAddParagraph>
        {paragraphs.map((data, i)=>{
          if (data.type === 'text') return <ParagraphText key={i} setParagraphs={setParagraphs} data={data}/>
          else if (data.type === 'image') return <ParagraphImg  mouseOnImg={prop.mouseOnImg} setMouseOnImg={prop.setMouseOnImg} key={i} setParagraphs={setParagraphs} data={data} />
          else if (data.type === 'video') return <ParagraphVideo key={i} setParagraphs={setParagraphs} data={data} />
          else if (data.type === 'link') return <ParagraphLink key={i} setParagraphs={setParagraphs} data={data} />
        })}
    </SParagraphList>
  )
}

export default ParagraphList