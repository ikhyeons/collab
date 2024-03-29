const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.readParagraphInfo = (req, res) => {
    const paragraphNum = req.params.paragraphNum;
    if(req.session.logined === true){
        con.query('select * from paragraph where paragraphNum = ?', [paragraphNum], (error, rows, fields)=> {
            //문단 정보를 읽음
            if(error) throw error;
            res.send({success : 0, data : rows[0]});
        })
    }
    else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
    }