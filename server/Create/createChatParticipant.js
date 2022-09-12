const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.createChatParticipant = (req, res) => {
    const {chatSpaceNum, userEmail, projectNum} = req.body;
    if(req.session.logined === true){
        con.query('SELECT *, collaborator.collaboratorNum FROM user LEFT JOIN collaborator ON collaborator.userNum = user.userNum where email = ? and projectNum = ?', [userEmail, projectNum], (error, rows1, fields)=> {
            if(rows1.length) {
                console.log(rows1);
                con.query('insert into chatParticipant values(default, ?, ?, default)', [chatSpaceNum, rows1[0].userNum], (error, rows, fields)=> {
                    if(error) throw error;
                    res.send({success : 0});
                })
            } else {
                console.log('프로젝트에 없는 사람')
                res.send({success : 1});
            }
        })
    }
    else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
}
