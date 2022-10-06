const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.delChatSpace = (req, res) => {
    const {chatSpaceNum} = req.body;
    if(req.session.logined === true){
        con.query('UPDATE chatSpace SET del = 1 WHERE chatSpaceNum = ?', [chatSpaceNum], (error, rows, fields)=> {
            //채팅 스페이스 삭제를 1로 변경
            if(error) throw error;
            res.send({success : 0});
        })
    }
    else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
    }