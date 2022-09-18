const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.readUser = (req, res) => {
    if(req.session.logined === true){
        con.query('SELECT userNum, nickName FROM user', (error, rows1, fields)=> {
            if(error) throw error;
            res.send({success : 0, data : rows1})
        })
    }
    else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
    }