import {
    atom,
    selector,
    atomFamily,
  } from 'recoil';

//



//위로는 성익현
//밑에는 강도경

export const projectState = atom({
  key: 'projectState',
  default: [
    {
      name:'새 프로젝트1',
      pic:'',
    }
  ],
});

export const boardState = atom({
  key: 'boardState',
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


//