const {mysqlKey} = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.readMyAnswer = (req, res) => {
    const { projectNum } = req.body;
        if(req.session.logined === true){
            con.query('select * from timeRequest where projectNum = ?', [projectNum], (error, rows, fields) =>{
                //타임 리퀘스트 답변을 읽음 미구현
                if (error) throw error;
                res.send({success : 0, data: rows});
            })
        } else {
            console.log("미로그인 상태입니다.");
            res.send({success : 3});
        }
};
