const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.changeDoctype = (req, res) => {
    const {docNum, doctype} = req.body;
    if(req.session.logined === true){
        con.query('UPDATE document SET type = ? WHERE docNum = ?', [doctype, docNum], (error, rows, fields)=> {
            //글 타입 업데이트
            if(error) throw error;
            res.send({success : 0});
        })
    }
    else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
    }