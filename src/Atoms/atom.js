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


//위로는 성익현
//밑에는 강도경


//