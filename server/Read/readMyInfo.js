const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.readMyInfo = (req, res) => {
    if(req.session.logined === true){
        con.query('select * from user where userNum = ?', [req.session.sid], (error, rows, fields)=> {
            if(error) throw error;
            res.send({success : 0, data : rows[0]});
        })
    }
    else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
    }