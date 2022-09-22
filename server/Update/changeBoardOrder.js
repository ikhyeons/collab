const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.changeBoardOrder = (req, res) => {
    const {workSpaceNum, order, targetOrder} = req.body;
    if(req.session.logined === true){
        con.query('UPDATE board SET sequent = 0 WHERE workSpaceNum = ? and sequent = ?', [workSpaceNum, targetOrder], (error, rows, fields)=> {
            if(error) throw error;
            con.query('UPDATE board SET sequent = sequent - 1 WHERE workSpaceNum = ? and sequent > ?', [workSpaceNum, targetOrder], (error, rows, fields)=> {
                if(error) throw error;
                con.query('UPDATE board SET sequent = sequent + 1 WHERE workSpaceNum = ? and sequent >= ?', [workSpaceNum, order], (error, rows, fields)=> {
                    if(error) throw error;
                    con.query('UPDATE board SET sequent = ? WHERE workSpaceNum = ? and sequent = 0', [order, workSpaceNum], (error, rows, fields)=> {
                        if(error) throw error;
                        res.send({success : 0});
                    })
                })
            })
        })
    }
    else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
    }