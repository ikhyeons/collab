const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.readDocMakeDate = (req, res) => {
    const docNum = req.params.docNum;
    if(req.session.logined === true){
        con.query('select makeDate from document where docNum = ?', [docNum], (error, rows, fields)=> {
            //글 작성일을 읽음
            if(error) throw error;
            res.send({success : 0, data : rows[0]});
        })
    }
    else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
    }