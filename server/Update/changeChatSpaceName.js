const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.changeChatSpaceName = (req, res) => {
    const {chatSpaceNum, name} = req.body;
    if(req.session.logined === true){
        con.query('UPDATE chatSpace SET spaceTitle = ? WHERE chatSpaceNum = ?', [name, chatSpaceNum], (error, rows, fields)=> {
            //채팅스페이스 제목 업데이트
            if(error) throw error;
            res.send({success : 0});
        })
    }
    else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
    }