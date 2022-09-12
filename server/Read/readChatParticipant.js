const {mysqlKey} = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.readChatParticipant = (req, res) => {
    const chatSpaceNum = req.params.chatSpaceNum;
        if(req.session.logined === true){
            con.query('SELECT *, user.nickName FROM chatParticipant LEFT JOIN user ON chatParticipant.userNum = user.userNum where chatSpaceNum = ?', [chatSpaceNum], (error, rows, fields) =>{
                if (error) throw error;
                res.send({success : 0, data: rows});
            })
        } else {
            console.log("미로그인 상태입니다.");
            res.send({success : 3});
        }
};
