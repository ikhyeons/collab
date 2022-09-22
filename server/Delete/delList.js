const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.delList = (req, res)=>{
    const { listNum, boardNum } = req.body;
    if(req.session.logined === true){
        con.query('UPDATE list SET del = 1 where listNum = ?', [listNum], (error, rows, feild) =>{
            con.query('select sequent from list WHERE listNum = ?', [listNum], (error, rows1, fields)=> {
                con.query('UPDATE list SET sequent = sequent - 1 WHERE boardNum = ? and sequent > ?', [boardNum, rows1[0].sequent], (error, rows, fields)=> {
                    if(error) throw error
                    res.send({success : 0})
                })
            })
        })
    } else {
        res.send({success : 3})
        console.log("로그인 상태가 아닙니다.");
    }
    
}