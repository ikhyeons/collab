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
const {login, logout} = require('./session/session') //로그인 파일
const {createProject} = require('./Create/createProject')
const {createCollaborator} = require('./Create/createCollaborator')
const {createCalendarEvent} = require('./Create/createCalendarEvent')
const {createTimeRequest} = require('./Create/createTimeRequest')
const {createWorkSpace} = require('./Create/createWorkSpace')
const {createChatSpace} = require('./Create/createChatSpace')
const {createParagraph} = require('./Create/createParagraph')
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
//------------------------------------------Read라우팅
//------------------------------------------Update라우팅
//------------------------------------------Delete라우팅