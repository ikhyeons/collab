//------------------------------------------express 실행
const express = require('express');
const app = express();
const port = process.env.port||1004;
//------------------------------------------mysql 연결
const mysql = require('mysql');
const {mysqlKey} = require('./mysqlKey.js');
const connection = mysql.createConnection(mysqlKey);
connection.connect();
//------------------------------------------session 저장소
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const sessionStore = new MySQLStore(mysqlKey);
//------------------------------------------axios 허가
const axios = require('axios');
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
const {createParagraph} = require('./Create/createParagraph');
const {createDocLicenser} = require('./Create/createDocLicenser');
const {createDocParticipant} = require('./Create/createDocParticipant');

const {readMyProjectList} = require('./Read/readProjectList.js');
const {readRequestList} = require('./Read/readRequestList')
const {readWorkSpaceList} = require('./Read/readWorkSpaceList')
const {readChatSpaceList} = require('./Read/readChatSpaceList')
const {readDocList} = require('./Read/readDocList')
const {readDocInfo} = require('./Read/readDocInfo')
const {readEventList} = require('./Read/readEventList')
const {readEventInfo} = require('./Read/readEventInfo')
const {readMyInfo} = require('./Read/readMyInfo')
const {readWorkSpaceInfo} = require('./Read/readWorkSpaceInfo')
const {readChatSpaceInfo} = require('./Read/readChatSpaceInfo')

const {changeMyProjectOrder} = require('./Update/changeMyProjectOrder')
const {changeWorkSpaceOrder} = require('./Update/changeWorkSpaceOrder')
const {changeChatSpaceOrder} = require('./Update/changeChatSpaceOrder')
const {changeReply} = require('./Update/changeReply')
const {changeDoctype} = require('./Update/changeDoctype')
const {changeDocInfo} = require('./Update/changeDocInfo')
const {changeParagraph} = require('./Update/changeParagraph')
const {changeCalendarEventDate} = require('./Update/chageCalendarEventDate')

const {delProject} = require('./Delete/delProject')
const {delDoc} = require('./Delete/delDoc')
const {delRep} = require('./Delete/delRep')
const {delWorkSpace} = require('./Delete/delWorkSpace')
const {delChatSpace} = require('./Delete/delChatSpace')
const {delRequest} = require('./Delete/delRequest')
const {delEvent} = require('./Delete/delEvent')
const {delDocParticipant} = require('./Delete/delDocParticipant')
const {delDocLicenser} = require('./Delete/delLicenser');
const { changeWorkSpaceType } = require('./Update/changeWorkSpaceType.js');
const { createBoard } = require('./Create/createBoard.js');
const { readBoard } = require('./Read/readBoard.js');
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
app.post('/createParagraph', (req, res)=>{
  createParagraph(req, res);
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
app.get('/readDocInfo', (req, res)=>{
  readDocInfo(req, res);
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
app.get('/readChatData', (req, res)=>{
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
app.put('/changeDocInfo', (req, res)=>{
  changeDocInfo(req, res);
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