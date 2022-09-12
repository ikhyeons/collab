const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.createBoard = (req, res) => {
const {workspaceNum, boardTitle}= req.body;
    if(req.session.logined === true){
       con.query('select count(*) from board where workspaceNum = ?', [workspaceNum], (error, rows1, fields)=>{
  	        if(boardTitle === ''){
                con.query('insert into board values(default, ?, "새 작업공간", ?, default)', [workspaceNum, rows1[0]['count(*)'] + 1], (error, rows, fields)=> {
                    if(error) throw error;
                    res.send({success : 0});
                   })
            } else {
                con.query('insert into board values(default, ?, ?, ?, default)', [workspaceNum, boardTitle, rows1[0]['count(*)'] + 1], (error, rows, fields)=> {
                    if(error) throw error;
                    res.send({success : 0});
                   })
            }
        })
    } else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
}