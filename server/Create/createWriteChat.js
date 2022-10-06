const {mysqlKey} = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.createWriteChat = (req, res) => {
    const { chatSpaceNum, innerData } = req.body;
        if(req.session.logined === true){
            con.query('insert into chat values(default, ?, ?, "new", ?, default)', [chatSpaceNum, req.session.sid, innerData], (error, rows, fields) =>{
                //ㄴ 채팅을 작성함
                if (error) throw error;
                res.send({success : 0});
            })
        } else {
            console.log("미로그인 상태입니다.");
            res.send({success : 3});
        }
};
