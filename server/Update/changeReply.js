const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.changeReply = (req, res) => {
    const {repNum, innerData} = req.body;
    if(req.session.logined === true){
        con.query('UPDATE reply SET innerData = ? WHERE repNum = ?', [innerData, repNum], (error, rows, fields)=> {
            if(error) throw error;
            res.send({success : 0});
        })
    }
    else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
    }