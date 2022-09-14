//------------------------------------------express 실행
const express = require('express');
const app = express();
const port = process.env.port||2005;
//------------------------------------------mysql 연결
const mysql = require('mysql');
const {mysqlKey} = require('./mysqlKey.js');
const connection = mysql.createConnection(mysqlKey);
connection.connect();
//------------------------------------------session 저장소
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const sessionStore = new MySQLStore(mysqlKey);
//------------------------------------------helmet 페이지 보안
const helmet = require('helmet');
app.use(helmet());
//------------------------------------------cors 허가
const cors = require('cors');
app.use(cors({
    origin : true, credentials: true
}));
//------------------------------------------body 파싱
app.use(express.json());
//------------------------------------------세션 설정
app.use(session({
    secret: 'session_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized : false,
  }));
//------------------------------------------서버 구동
app.listen(port, ()=>{console.log(`server run in ${port}`)});
//------------------------------------------파일 임포트
const {login, logout} = require('./session/session')
const {createProject} = require('./Create/createProject')
const {createCollaborator} = require('./Create/createCollaborator')
const {createCalendarEvent} = require('./Create/createCalendarEvent')
const {join} = require('./Create/join');
const {timeResponse}= require('./Create/createTimeResponse');
const { createDocument } = require('./Create/createDocument.js');
const { createWriteChat } = require('./Create/createWriteChat.js');
const { createWriteReply } = require('./Create/createWriteReply.js');
const { readMyAnswer } = require('./Read/readMyAnswer.js');
const { readChatData } = require('./Read/readChatData.js');
const { changeResponse } = require('./Update/changeResponse.js');
const { changeCalendarEvent } = require('./Update/changeCalendarEvent.js');

const {createTimeRequest} = require('./Create/createTimeRequest')
const {createWorkSpace} = require('./Create/createWorkSpace')
const {createChatSpace} = require('./Create/createChatSpace')
const {createTextParagraph} = require('./Create/createTextParagraph');
const {createDocLicenser} = require('./Create/createDocLicenser');
const {createDocParticipant} = require('./Create/createDocParticipant');
const {createChatParticipant} = require('./Create/createChatParticipant')

const {readMyProjectList} = require('./Read/readProjectList.js');
const {readRequestList} = require('./Read/readRequestList')
const {readWorkSpaceList} = require('./Read/readWorkSpaceList')
const {readChatSpaceList} = require('./Read/readChatSpaceList')
const {readDocList} = require('./Read/readDocList')
const {readDocMakeDate} = require('./Read/readDocMakeDate')
const {readDocTitle} = require('./Read/readDocTitle')
const {readEventList} = require('./Read/readEventList')
const {readEventInfo} = require('./Read/readEventInfo')
const {readMyInfo} = require('./Read/readMyInfo')
const {readWorkSpaceInfo} = require('./Read/readWorkSpaceInfo')
const {readChatSpaceInfo} = require('./Read/readChatSpaceInfo')
const {readProjectCollaborator} = require('./Read/readProjectCollaborator')
const {readDocParticipant} = require('./Read/readDocParticipant')
const {readDocLicenser} = require('./Read/readDocLicenser')
const {readDocMaker} = require('./Read/readDocMaker')
const {readChatParticipant} = require('./Read/readChatParticipant')
const {readParagraphList} = require('./Read/readParagraphList')

const {changeMyProjectOrder} = require('./Update/changeMyProjectOrder')
const {changeWorkSpaceOrder} = require('./Update/changeWorkSpaceOrder')
const {changeChatSpaceOrder} = require('./Update/changeChatSpaceOrder')
const {changeReply} = require('./Update/changeReply')
const {changeDoctype} = require('./Update/changeDoctype')
const {changeDocTitle} = require('./Update/changeDocTitle')
const {changeParagraph} = require('./Update/changeParagraph')
const {changeCalendarEventDate} = require('./Update/chageCalendarEventDate')
const { changeWorkSpaceType } = require('./Update/changeWorkSpaceType.js');
const {changeParagraphOrder} = require('./Update/changeParagraphOrder')

const {delProject} = require('./Delete/delProject')
const {delDoc} = require('./Delete/delDoc')
const {delRep} = require('./Delete/delRep')
const {delWorkSpace} = require('./Delete/delWorkSpace')
const {delChatSpace} = require('./Delete/delChatSpace')
const {delRequest} = require('./Delete/delRequest')
const {delEvent} = require('./Delete/delEvent')
const {delDocParticipant} = require('./Delete/delDocParticipant')
const {delDocLicenser} = require('./Delete/delLicenser');
const { createBoard } = require('./Create/createBoard.js');
const { readBoard } = require('./Read/readBoard.js');
const { readList } = require('./Read/readList.js');
const { createList } = require('./Create/createList.js');
const { delBoard } = require('./Delete/delBoard.js');
const { delList } = require('./Delete/delList.js');
const {delCollaborator} = require('./Delete/delCollaborator')
const {delChatParticipant} = require('./Delete/delChatParticipant')
const {delParagraph} = require('./Delete/delParagraph')
//------------------------------------------session라우팅
app.post('/login', (req, res)=>{
    login(req, res);
  })
app.post('/logout', (req, res)=>{
    logout(req, res);
  })
  //------------------------------------------Create라우팅
app.post('/createProject', (req, res)=>{
  createProject(req, res);
})
app.post('/createCollaborator', (req, res)=>{
  createCollaborator(req, res);
})
app.post('/createCalendarEvent', (req, res)=>{
  createCalendarEvent(req, res);
})
app.post('/join', (req, res)=>{
  join(req, res);
})
app.post('/addTimeResponse', (req, res)=>{
  timeResponse(req, res);
})
app.post('/createDocument', (req, res)=>{
  createDocument(req, res);
})
app.post('/writeChat', (req, res)=>{
  createWriteChat(req, res);
})
app.post('/writeReply', (req, res)=>{
  createWriteReply(req, res);
})
app.post('/createTimeRequest', (req, res)=>{
  createTimeRequest(req, res);
})
app.post('/createWorkSpace', (req, res)=>{
  createWorkSpace(req, res);
})
app.post('/createChatSpace', (req, res)=>{
  createChatSpace(req, res);
})
app.post('/createTextParagraph', (req, res)=>{
  createTextParagraph(req, res);
})
app.post('/createDocLicenser', (req, res)=>{
  createDocLicenser(req, res);
})
app.post('/createDocParticipant', (req, res)=>{
  createDocParticipant(req, res);
})
app.post('/createBoard', (req, res)=>{
  createBoard(req, res);
})
app.post('/createList', (req, res)=>{
  createList(req, res);
})
app.post('/createChatParticipant', (req, res)=>{
  createChatParticipant(req, res);
})
//------------------------------------------Read라우팅
app.get('/readMyProjectList', (req, res)=>{
  readMyProjectList(req, res);
})
app.get('/readRequestList/:projectNum', (req, res)=>{
  readRequestList(req, res);
})
app.get('/readWorkSpaceList/:projectNum', (req, res)=>{
  readWorkSpaceList(req, res);
})
app.get('/readChatSpaceList/:projectNum', (req, res)=>{
  readChatSpaceList(req, res);
})
app.get('/readDocList/:workSpaceNum', (req, res)=>{
  readDocList(req, res);
})
app.get('/readEventList/:projectNum', (req, res)=>{
  readEventList(req, res);
})
app.get('/readEventInfo/:eventNum', (req, res)=>{
  readEventInfo(req, res);
})
app.get('/readMyAnswer', (req, res)=>{
  readMyAnswer(req, res);
})
app.get('/readChatData/:chatSpaceNum', (req, res)=>{
  readChatData(req, res);
})
app.get('/readMyInfo', (req, res)=>{
  readMyInfo(req, res);
})
app.get('/readWorkSpaceInfo/:workSpaceNum', (req, res)=>{
  readWorkSpaceInfo(req, res);
})
app.get('/readChatSpaceInfo/:chatSpaceNum', (req, res)=>{
  readChatSpaceInfo(req, res);
})
app.get('/readBoard/:workSpaceNum', (req, res)=>{
  readBoard(req, res);
})
app.get('/readList/:boardNum', (req, res)=>{
  readList(req, res);
})
app.get('/readProjectCollaborator/:projectNum', (req, res)=>{
  readProjectCollaborator(req, res)
})
app.get('/readDocParticipant/:docNum', (req, res)=>{
  readDocParticipant(req, res)
})
app.get('/readDocMakeDate/:docNum', (req, res)=>{
  readDocMakeDate(req, res);
})
app.get('/readDocTitle/:docNum', (req, res)=>{
  readDocTitle(req, res);
})

app.get('/readDocLicenser/:docNum', (req, res)=>{
  readDocLicenser(req, res)
})
app.get('/readDocMaker/:docNum', (req, res)=>{
  readDocMaker(req, res)
})
app.get('/readChatParticipant/:chatSpaceNum', (req, res)=>{
  readChatParticipant(req, res)
})
app.get('/readParagraphList/:docNum', (req, res)=>{
  readParagraphList(req, res)
})

//------------------------------------------Update라우팅
app.put('/changeMyProjectOrder', (req, res)=>{
  changeMyProjectOrder(req, res);
})
app.put('/changeWorkSpaceOrder', (req, res)=>{
  changeWorkSpaceOrder(req, res);
})
app.put('/changeChatSpaceOrder', (req, res)=>{
  changeChatSpaceOrder(req, res);
})
app.put('/changeReply', (req, res)=>{
  changeReply(req, res);
})
app.put('/changeDoctype', (req, res)=>{
  changeDoctype(req, res);
})
app.put('/changeParagraph', (req, res)=>{
  changeParagraph(req, res);
})
app.put('/changeDocTitle', (req, res)=>{
  changeDocTitle(req, res);
})
app.put('/changeResponse', (req, res)=>{
  changeResponse(req, res);
})
app.put('/changeCalendarEvent', (req, res)=>{
  changeCalendarEvent(req, res);
})
app.put('/changeWorkSpaceType', (req, res)=>{
  changeWorkSpaceType(req, res);
})
app.put('/changeCalendarEventDate', (req, res)=>{
  changeCalendarEventDate(req, res)
})
app.put('/changeParagraphOrder', (req, res)=>{
  changeParagraphOrder(req, res)
})
//------------------------------------------Delete라우팅
app.delete('/delProject', (req, res)=>{
  delProject(req, res);
})
app.delete('/delDoc', (req, res)=>{
  delDoc(req, res);
})
app.delete('/delRep', (req, res)=>{
  delRep(req, res);
})
app.delete('/delWorkSpace', (req, res)=>{
  delWorkSpace(req, res);
})
app.delete('/delChatSpace', (req, res)=>{
  delChatSpace(req, res);
})
app.delete('/delRequest', (req, res)=>{
  delRequest(req, res);
})
app.delete('/delEvent', (req, res)=>{
  delEvent(req, res);
})
app.delete('/delDocParticipant', (req, res)=>{
  delDocParticipant(req, res);
})
app.delete('/delDocLicenser', (req, res)=>{
  delDocLicenser(req, res);
})
app.delete('/delBoard', (req, res)=>{
  delBoard(req, res);
})
app.delete('/delList', (req, res)=>{
  delList(req, res);
})
app.delete('/delCollaborator', (req, res)=>{
  delCollaborator(req, res)
})
app.delete('/delChatParticipant', (req, res)=>{
  delChatParticipant(req, res)
})
app.delete('/delParagraph', (req, res)=>{
  delParagraph(req, res)
})