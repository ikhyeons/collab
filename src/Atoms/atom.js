import {
    atom,
    atomFamily,
    selector,
    selectorFamily,
  } from 'recoil';
//------------------------사이드바
export const sidebarForceRerender = atom({
  key : 'sidebar/sidebarForceRerender',
  default : 0,
});
export const currentWorkSpaceId = atom({
  key : 'workSpace/workSpaceId',
  default : '0',
})

export const currentChatSpaceId = atom({
  key : 'chatSpace/chatSpaceId',
  default : '0',
})

export const sidebarWorkSpace = atom({
  key : 'sidebar/sidebarWorkSpace',
  default : [],
})

export const sidebarWorkSpaceLi = atomFamily({
  key : 'sidebar/sidebarWorkSpaceInner',
    default : (data)=>({})
})

export const sidebarChat = atom({
  key : 'sidebar/sidebarChat',
  default : [],
})

export const sidebarChatLi = atomFamily({
  key : 'sidebar/sidebarChatSpaceInner',
    default : (data)=>({
      num : data.num,
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
  default : {id : 0, title : '', content : '', start : '', end : ''},
})
//-------------------------------탬플릿
export const userNamePool = atom({
  key : 'template/licensorNamePool',
  default : 
    []
})

export const currentDocId = atom({
  key : 'template/selectedDocId',
  default : 0,
})

export const templateMainData = atom({
  key : 'template/templateMain',
  default : {
  id : 3,
  name : '세번째 글 제목',
  makeDate : '',
  modifyDate : '2022-07-15',
  maker : '',
  participant : [],
  licenser : [],
}})

export const templateForceRerender = atom({
  key : 'template/templateForceRerender',
  default : 0,
})
export const templateParagraphId = atom({
  key : 'template/templateParagraphId',
  default : []
})

export const paragraphForceRerender = atom({
  key : 'template/templateParagraphForceRerender',
  default : 0
})

export const templateParagraph = atomFamily({
  key : 'template/templateParagraphF',
  default : ({paragraphNum, paragraphType, sequent, innerData})=>{
    if(paragraphType === 'text') return({
      paragraphNum : paragraphNum,
      paragraphType : paragraphType,
      innerData : innerData,
      sequent : sequent,
      modify : 1,
    })
    else if (paragraphType === 'image') return ({
      paragraphNum : paragraphNum,
      paragraphType : paragraphType,
      innerData : '내용',
      imgs : [],
      modify : 1,
    })
    else if (paragraphType === 'video') return ({
      paragraphNum : paragraphNum,
      paragraphType : paragraphType,
      innerData : '적절한 비디오 제목1',
      url : 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      modify : 1,
    })
    else if (paragraphType === 'file') return ({
      paragraphNum : paragraphNum,
      paragraphType : paragraphType,
      linktype : 'youtube', //youtube, web,
      innerData : 'https://www.youtube.com/watch?v=jlm2f29ka_0',
      modify : 1,
    })
  }
})

export const paragraphListForceRerender = atom({
  key : 'paragraph/paragraphListForceRerender',
  default : 0,
})

//-------------------------------탬플릿 댓글

export const replyList = atom({
  key : 'reply/replyList',
  default : [
    {
      num : 0,
      type : 'text',
      writer : '성익현',
      data : '첫 번째 댓글입니다.',
    },
    {
      num : 1,
      type : 'text',
      writer : '강도경',
      data : '두 번째 댓글입니다.',
    },
    {
      num : 2,
      type : 'text',
      writer : '홍길동',
      data : '세 번째 댓글입니다.',
    },
  ]
})

//-------------------------------글리스트
export const docList = atom({
  key : 'doclist/docList',
  default : [],
})

export const docForceRerender = atom({
  key : 'docForceRerender',
  default : 0
})

export const docPage = atom({
  key : 'doclist/docPage',
  default : 1,
})

//-------------------------------채팅

export const chatList = atom({
  key : 'chatting/chatList',
  default : []
})

export const chatParticipant = atom({
  key : 'chatting/chatParticipant',
  default : []
})

//-------------------------------리퀘스트
export const requestTable = atom({
  key : 'request/mainTable',
  default : [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ]
})

export const selectedTd = selector({
  key : 'request/selectedTd',
  get: ({get}) => {
    let data = get(requestTable);
    let set = []
    data.map((row, i)=>{
      row.map((cell, j)=>{
        if(cell === 1){
          set.push({rownum : i, cellnum : j});
        }
      })
    })
    
    return set
  },
})

export const requestLast1Td = atom({ //마지막 지나온놈의 셀, 인덱스 번호
  key : 'request/requestLast1Td',
  default : {
    rowIndex : 0,
    cellIndex : 0,
  }
})

//위로는 성익현
//밑에는 강도경

export const projectState = atom({
  key: 'projects/projectState',
  default: [],
});

export const boardState = atom({
  key: 'worklist/boardState',
  default: [
    {
        bnum: 1,
        bname: '할 일',
    },
    {
        bnum: 2,
        bname: '진행 중',
    },
    {
        bnum: 3,
        bname: '완료',
    },
  ]
});

export const boardList = atomFamily({
  key : 'board/boardList',
  default : (boardNum)=>{
    return []
  }
})

export const projectName = atom({
  key: 'setting/projectName',
  default: '',
})


export const forceRerender = atom({
  key: 'forceRerender',
  default: 0,
})

export const currentReqId = atom({
  key: 'request/selectedReqId',
  default: 0,
})

export const projectForceRerender = atom({
  key: 'projectForceRerender',
  default: 0,
})


//