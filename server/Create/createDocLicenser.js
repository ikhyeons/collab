const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.createDocLicenser = (req, res) => {

const {docNum, selectedUserNum}= req.body;
    if(req.session.logined === true){
  	con.query('insert into licenser values(default, ?, ?)', [docNum, selectedUserNum], (error, rows, fields)=> {
        //ㄴ 허가자를 추가함
        	    if(error) throw error;
        	    res.send({success : 0});
       	 })
    } else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
}
