const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.readChatSpaceInfo = (req, res) => {
    if(req.session.logined === true){
        let chatSpaceNum = req.params.chatSpaceNum;
        con.query('select * from chatSpace where chatSpaceNum = ?', [chatSpaceNum], (error, rows, fields)=> {
            if(error) throw error;
            res.send({success : 0, data : rows[0]});
        })
    }
    else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
    }
    