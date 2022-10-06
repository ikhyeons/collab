const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.delBoard = (req, res)=>{
    const { boardNum } = req.body;
    if(req.session.logined === true){
        con.query('UPDATE board SET del = 1 where boardNum = ?', [boardNum], (error, rows, feild) =>{
            //ㄴ 보드 삭제를 1로 변경
            if(error) throw error
            res.send({success : 0})
    })
    } else {
        res.send({success : 3})
        console.log("로그인 상태가 아닙니다.");
    }
}