const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.createParagraph = (req, res) => {
const {docNum, innerData, paragraphType}= req.body;
    if(req.session.logined === true){
 	 con.query('insert into paragraph values(default, ?, ?, ?, ?)', [docNum, paragraphType, innerData, 1], (error, rows, fields)=> {
        		if(error) throw error;
        		res.send({success : 0});
       	 })
    } else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
}