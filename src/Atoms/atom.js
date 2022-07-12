import {
    atom,
    atomFamily,
    selector,
    selectorFamily,
  } from 'recoil';

//
//------------------------사이드바
export const sidebarWorkSpace = atom({
  key : 'sidebar/sidebarWorkSpace',
  default : [1, 2, 3, 4],
})

export const sidebarWorkSpaceLi = atomFamily({
  key : 'sidebar/sidebarWorkSpaceInner',
    default : (data)=>({
      num : data.num,
      type : data.type,
      name : data.name,
    }
  )
})

export const sidebarChat = atom({
  key : 'sidebar/sidebarChat',
  default : [1, 2],
})

export const sidebarChatLi = atomFamily({
  key : 'sidebar/sidebarWorkSpaceInner',
    default : (data)=>({
      num : data.num,
      name : data.name,
    }
  )
})
//------------------------달력
export const calendarModalState = atom({
  key : 'calendar/calendarModalState',
  default : 0,
})

export const calendarSelectedDate = atom({
  key : 'calendar/calendarSelectedDate',
  default : {start : '', end : ''},
})

export const calendarEvents = atom({
  key : 'calendar/calendarEvents',
  default : [],
})

export const calendarEventData = atom({
  key : 'calendar/calendarEventData',
  default : {id : 1, title : '', content : '', start : '', end : ''},
})
//-------------------------------탬플릿
export const userNamePool = atom({
  key : 'template/licensorNamePool',
  default : 
    [
      {
          id : '성익현',
          display : '@성익현',
      },
      {
          id : '강도경',
          display : '@강도경',
      },
  ]
})

export const templateMainData = atom({
  key : 'template/templateMain',
  default : {
  id : 3,
  name : '세번째 글 제목',
  makeDate : '2022-07-14',
  modifyDate : '2022-07-15',
  maker : '성익현',
  participant : ['강도경', '성익현'],
  licensor : ['강도경', ],
}})

export const templateParagraphId = atom({
  key : 'template/templateParagraphId',
  default : [
    { id : 0, type : 'text'},
    { id : 1, type : 'image'},
    { id : 2, type : 'link'},
    { id : 3, type : 'video'},
    { id : 4, type : 'text'},
    { id : 5, type : 'image'},
    { id : 6, type : 'video'},
    { id : 7, type : 'link'},
  ]
})

export const templateParagraph = atom({
  key : 'template/templateParagraph',
  default : [
  {
    id : 0,
    type : 'text',
    data : '거에 비해 요즘 사람들 문장 길이가 더 짧아졌다고 합니다. 문장을 짧게 하면 자기 생각을 분명히 드러낼 수 있지요. 현대인은 자기 생각을 상대방에게 빨리, 분명하게 전달하고 싶은가 봅니다. 보통 어느 글에서 문장이 길면 만연체, 짧으면 간결체로 분류합니다. 만연체는 온갖 정보를 한 문장에 담을 수 있지만, 그런 문장은 장황하며 호흡이 깁니다. 누군가가 글로 자기 생각을 남에게 확실히 빨리 전달하고자 한다면 만연체는 좋지 않은 방법입니다. 문장을 길게 쓰는 것은 쓰는이가 정보를 많이 전달하려고 욕심을 부리기 때문이지요. 짧게 쓰려면 전달하려는 정보를 하나씩 말로 설명한다고 치고, 그 말을 조리 있게 글로 정리하면 됩니다. 학자들은 우리글을 ‘언문이 일치’하는 글이라고 하지요. 그러나 따지고 보면 만연체는 언문이 일치하지 않는 문장입니다. 아래 글을 하나씩 끊',
    modify : 0,
  },

  {
    id : 1,
    type : 'image',
    data : '내용',
    imgs : ["http://www.fintechpost.co.kr/news/photo/201907/46375_27128_0925.jpg", "https://cdn.topstarnews.net/news/photo/201908/653630_355016_3125.jpg", "http://www.biztribune.co.kr/news/photo/201903/202520_52645_3519.png",],
    modify : 0,
  },

  {
    id : 2,
    type : 'link',
    linktype : 'youtube', //youtube, web,
    data : 'https://www.youtube.com/watch?v=jlm2f29ka_0',
    modify : 0,
  },

  {
    id : 3,
    type : 'video',
    data : '적절한 비디오 제목1',
    modify : 0,
  },


  {
    id : 4,
    type : 'text',
    data : '고 싶은가 봅니다. 보통 어느 글에서 문장이 길면 만연체, 짧으면 간결체로 분류합니다. 만연체는 온갖 정보를 한 문장에 담을 수 있지만, 그런 문장은 장황하며 호흡이 깁니다. 누군가가 글로 자기 생각을 남에게 확실히 빨리 전달하고자 한다면 만연체는 좋지 않은 방법입니다. 문장을 길게 쓰는 것은 쓰는이가 정보를 많이 전달하려고 욕심을 부리기 때문이지요. ',
    modify : 0,
  },

  {
    id : 5,
    type : 'image',
    data : '내용',
    imgs : ["http://www.fintechpost.co.kr/news/photo/201907/46375_27128_0925.jpg", "https://cdn.topstarnews.net/news/photo/201908/653630_355016_3125.jpg", "http://www.biztribune.co.kr/news/photo/201903/202520_52645_3519.png",],
    modify : 0,
  },

  {
    id : 6,
    type : 'video',
    data : '적당한 비디오 제목2',
    modify : 0,
  },
  
  {
    id : 7,
    type : 'link',
    linktype : 'youtube', //youtube, web,
    data : '내용',
    modify : 0,
  },
]})

//위로는 성익현
//밑에는 강도경


//