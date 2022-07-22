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
  default : [0, 1, 2, 3],
})

export const sidebarWorkSpaceLi = atomFamily({
  key : 'sidebar/sidebarWorkSpaceInner',
    default : (data)=>({
      num : data.num,
      type : data.type,
      name : data.num,
    }
  )
})

export const sidebarChat = atom({
  key : 'sidebar/sidebarChat',
  default : [0, 1],
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
  default : [
    {
        num : 1,
        makeDate:'2022-06-16',
        title : '첫번째글제목첫번째글제sdf목',
        writer : '일곱글자닉네임',
    },
    {
        num : 2,
        makeDate:'2022-07-13',
        title : '두번째 글 제목',
        writer : '강도경',
    },
    {
        num : 3,
        makeDate:'2022-07-14',
        title : '세번째 글 제목',
        writer : '성익현',
    },
    {
        num : 4,
        makeDate:'2022-06-16',
        title : '첫번째글제목첫번째글제sdf목',
        writer : '일곱글자닉네임',
    },
    {
        num : 5,
        makeDate:'2022-07-13',
        title : '두번째 글 제목',
        writer : '강도경',
    },
    {
        num : 6,
        makeDate:'2022-07-14',
        title : '세번째 글 제목',
        writer : '성익현',
    },
    {
        num : 7,
        makeDate:'2022-06-16',
        title : '첫번째글제목첫번째글제sdf목',
        writer : '일곱글자닉네임',
    },
    {
        num : 8,
        makeDate:'2022-07-13',
        title : '두번째 글 제목',
        writer : '강도경',
    },
    {
        num : 9,
        makeDate:'2022-07-14',
        title : '세번째 글 제목',
        writer : '성익현',
    },
    {
        num : 11,
        makeDate:'2022-06-16',
        title : '첫번째글제목첫번째글제sdf목',
        writer : '일곱글자닉네임',
    },
    {
        num : 12,
        makeDate:'2022-07-13',
        title : '두번째 글 제목',
        writer : '강도경',
    },
    {
        num : 13,
        makeDate:'2022-07-14',
        title : '세번째 글 제목',
        writer : '성익현',
    },
    {
        num : 14,
        makeDate:'2022-06-16',
        title : '첫번째글제목첫번째글제sdf목',
        writer : '일곱글자닉네임',
    },
    {
        num : 15,
        makeDate:'2022-07-13',
        title : '두번째 글 제목',
        writer : '강도경',
    },
    {
        num : 16,
        makeDate:'2022-07-14',
        title : '세번째 글 제목',
        writer : '성익현',
    },
    {
        num : 17,
        makeDate:'2022-06-16',
        title : '첫번째글제목첫번째글제sdf목',
        writer : '일곱글자닉네임',
    },
    {
        num : 18,
        makeDate:'2022-07-13',
        title : '두번째 글 제목',
        writer : '강도경',
    },
    {
        num : 19,
        makeDate:'2022-07-14',
        title : '세번째 글 제목',
        writer : '성익현',
    },
    {
        num : 21,
        makeDate:'2022-06-16',
        title : '첫번째글제목첫번째글제sdf목',
        writer : '일곱글자닉네임',
    },
    {
        num : 22,
        makeDate:'2022-07-13',
        title : '두번째 글 제목',
        writer : '강도경',
    },
    {
        num : 23,
        makeDate:'2022-07-14',
        title : '세번째 글 제목',
        writer : '성익현',
    },
    {
        num : 24,
        makeDate:'2022-06-16',
        title : '첫번째글제목첫번째글제sdf목',
        writer : '일곱글자닉네임',
    },
    {
        num : 25,
        makeDate:'2022-07-13',
        title : '두번째 글 제목',
        writer : '강도경',
    },
    {
        num : 26,
        makeDate:'2022-07-14',
        title : '세번째 글 제목',
        writer : '성익현',
    },
    {
        num : 27,
        makeDate:'2022-06-16',
        title : '첫번째글제목첫번째글제sdf목',
        writer : '일곱글자닉네임',
    },
    {
        num : 28,
        makeDate:'2022-07-13',
        title : '두번째 글 제목',
        writer : '강도경',
    },
    {
        num : 29,
        makeDate:'2022-07-14',
        title : '세번째 글 제목',
        writer : '성익현',
    },
    {
        num : 30,
        makeDate:'2022-07-14',
        title : '세번째 글 제목',
        writer : '성익현',
    },
]
})

//-------------------------------채팅

export const chatList = atom({
  key : 'chatting/chatList',
  default : [
    {
      my:0,
      contents:'뭐해',
  },
  ]
})

export const chatParticipant = atom({
  key : 'chatting/chatParticipant',
  default : ['성익현','강도경']
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
  default: [
    {
      name:'새 프로젝트1',
      pic:'',
    }
  ],
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

export const listStateId = atom ({
  key: 'worklist/listStateId',
  default:[
    { id: 0, bnum: 1 },
    { id: 1, bnum: 2 },
    { id: 2, bnum: 3 },
    { id: 3, bnum: 2 },
  ]
})

export const listState = atomFamily({
  key: 'worklist/listState',
  default: ({id, bnum})=>{
    return({
     id: id,
     bnum: bnum,
     contents: `${id}, ${bnum}인 디폴트`, 
    })
  }
})

//