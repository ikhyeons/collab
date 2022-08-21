const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.delRep = (req, res) => {
    const {repNum} = req.body;
    if(req.session.logined === true){
        con.query('UPDATE reply SET del = 1 WHERE repNum = ?', [repNum], (error, rows, fields)=> {
            if(error) throw error;
            res.send({success : 0});
        })
    }
    else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
    }