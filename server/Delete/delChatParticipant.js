const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.delChatParticipant = (req, res) => {
    const {chatSpaceNum} = req.body;
    if(req.session.logined === true){
        con.query('delete from chatParticipant WHERE chatSpaceNum = ? and userNum = ?', [chatSpaceNum, req.session.sid], (error, rows, fields)=> {
            //채팅 참여자 제거
            if(error) throw error;
            res.send({success : 0});
        })
    }
    else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
    }