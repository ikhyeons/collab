const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.delList = (req, res)=>{
    const { listNum, boardNum } = req.body;
    if(req.session.logined === true){
        con.query('UPDATE list SET del = 1 where listNum = ?', [listNum], (error, rows, feild) =>{
            //리스트의 삭제를 1로 변경
            con.query('select sequent from list WHERE listNum = ?', [listNum], (error, rows1, fields)=> {
                //해당 리스트의 순서를 받음
                con.query('UPDATE list SET sequent = sequent - 1 WHERE boardNum = ? and sequent > ?', [boardNum, rows1[0].sequent], (error, rows, fields)=> {
                    //해당 리스트순서 이후의 순서를 가진 리스트의 순서를 1씩 내림
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