const {mysqlKey} = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.readChatData = (req, res) => {
    const { chatSpaceNum } = req.body;
        if(req.session.logined === true){
            con.query('select * from chat where chatSpaceNum = ?', [chatSpaceNum], (error, rows, fields) =>{
                if (error) throw error;
                res.send({success : 0, data: rows});
            })
        } else {
            console.log("미로그인 상태입니다.");
            res.send({success : 3});
        }
};
