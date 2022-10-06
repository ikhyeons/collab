const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.readDocParticipant = (req, res) => {
    const docNum = req.params.docNum;
    if(req.session.logined === true){
        con.query('SELECT *, user.nickName FROM docParticipant LEFT JOIN user ON docParticipant.selectedUserNum = user.userNum where docNum = ?', [docNum], (error, rows, fields)=> {
            // 글 참여자를 읽음
            if(error) throw error;
            res.send({success : 0, data : rows});
        })
    }
    else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
    }