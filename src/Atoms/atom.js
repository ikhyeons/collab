import {
    atom,
    selector,
    atomFamily,
  } from 'recoil';

//



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
    { id: 0, contents: '' },
    { id: 1, contents: '' },
    { id: 2, contents: '' },
    { id: 3, contents: '' },
  ]
})

export const listState = atomFamily({
  key: 'worklist/listState',
  default: ({id, contents})=>{
    return({
     id: id,
     contents: contents, 
    })
  }
})

//