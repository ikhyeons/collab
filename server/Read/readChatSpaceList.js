const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.readChatSpaceList = (req, res) => {
    const projectNum = req.params.projectNum;
    if(req.session.logined === true){
        con.query('SELECT *, chatSpace.chatSpaceNum FROM chatParticipant LEFT JOIN chatSpace ON chatParticipant.chatSpaceNum = chatSpace.chatSpaceNum where userNum = ? order by sequent', [req.session.sid], (error, rows, fields)=> {
            if(error) throw error;
            res.send({success : 0, data : rows});
        })
    }
    else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
    }
    