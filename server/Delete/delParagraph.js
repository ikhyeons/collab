const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.delParagraph = (req, res)=>{
    const { paragraphNum } = req.body;
    if(req.session.logined === true){
        con.query('delete from paragraph where paragraphNum = ?', [paragraphNum], (error, rows, feild) =>{
            if(error) throw error
            res.send({success : 0})
    })
    } else {
        res.send({success : 3})
        console.log("로그인 상태가 아닙니다.");
    }
    
}