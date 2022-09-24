const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.changeParagraph = (req, res) => {
    const {paragraphNum, innerData} = req.body;
    if(req.session.logined === true){
        con.query('UPDATE paragraph SET innerData = ? WHERE paragraphNum = ?', [innerData, paragraphNum], (error, rows, fields)=> {
            //문단 데이터 업데이트
            if(error) throw error;
            res.send({success : 0});
        })
    }
    else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
    }