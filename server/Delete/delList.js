const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.delList = (req, res)=>{
    const { listNum } = req.body;
    if(req.session.logined === true){
        con.query('UPDATE list SET del = 1 where listNum = ?', [listNum], (error, rows, feild) =>{
            if(error) throw error
            res.send({success : 0})
    })
    } else {
        res.send({success : 3})
        console.log("로그인 상태가 아닙니다.");
    }
    
}