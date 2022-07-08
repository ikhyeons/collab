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
  default : [{id : 1, title : 'hi', start : '2022-07-04', end : '2022-07-07'}],
})

export const calendarEventData = atom({
  key : 'calendar/calendarEventData',
  default : {id : 1, title : '', content : '', start : '', end : ''},
})


//위로는 성익현
//밑에는 강도경


//