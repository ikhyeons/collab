const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.createDocParticipant = (req, res) => {

const {docNum, selectedUserNum}= req.body;
    if(req.session.logined === true){
  	con.query('insert into docParticipant values(default, ?, ?)', [docNum, selectedUserNum], (error, rows, fields)=> {
        	    if(error) throw error;
        	    res.send({success : 0});
       	 })
    } else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
}
