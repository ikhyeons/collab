import {
    atom,
    atomFamily,
    selector,
    selectorFamily,
  } from 'recoil';

//

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

//위로는 성익현
//밑에는 강도경


//