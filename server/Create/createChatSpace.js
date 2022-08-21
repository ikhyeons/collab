const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.createChatSpace = (req, res) => {

const {projectNum}= req.body;
    if(req.session.logined === true){
       con.query('select count(*) from chatSpace where projectNum = ?', [projectNum], (error, rows1, fields)=>{
  	con.query('insert into chatSpace values(default, ?, "새 작업공간", "new", ?, default)', [projectNum, rows1[0]['count(*)'] + 1], (error, rows, fields)=> {
        	    if(error) throw error;
        	    res.send({success : 0});
       	 })
       } )
    } else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
}
