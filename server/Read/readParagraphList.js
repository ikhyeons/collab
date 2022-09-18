const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.readParagraphList = (req, res) => {
    const docNum = req.params.docNum;
    if(req.session.logined === true){
        con.query('SELECT paragraphNum, paragraphType, sequent, innerData FROM paragraph where docNum = ? order by sequent desc', [docNum], (error, rows, fields)=> {
            if(error) throw error;
            res.send({success : 0, data : rows});
        })
    }
    else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
    }