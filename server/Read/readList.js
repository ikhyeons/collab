const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.readList = (req, res) => {
    let boardNum = req.params.boardNum
    if(req.session.logined === true){
        con.query('SELECT * FROM list where boardNum = ? and del = 0', [boardNum], (error, rows1, fields)=> {
            if(error) throw error;
            res.send({success : 0, data : rows1})
        })
    }
    else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
    }