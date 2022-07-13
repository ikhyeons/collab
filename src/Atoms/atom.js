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

export const templateParagraph = atomFamily({
  key : 'template/templateParagraphF',
  default : ({id, type})=>{
    if(type === 'text') return({
      id : id,
      type : type,
      data : id,
      modify : 0,
    })
    else if (type === 'image') return ({
      id : id,
      type : type,
      data : '내용',
      imgs : ["http://www.fintechpost.co.kr/news/photo/201907/46375_27128_0925.jpg", "https://cdn.topstarnews.net/news/photo/201908/653630_355016_3125.jpg", "http://www.biztribune.co.kr/news/photo/201903/202520_52645_3519.png",],
      modify : 0,
    })
    else if (type === 'video') return ({
      id : id,
      type : type,
      data : '적절한 비디오 제목1',
      url : 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      modify : 0,
    })
    else if (type === 'link') return ({
      id : id,
      type : type,
      linktype : 'youtube', //youtube, web,
      data : 'https://www.youtube.com/watch?v=jlm2f29ka_0',
      modify : 0,
    })
  }
})
//위로는 성익현
//밑에는 강도경


//