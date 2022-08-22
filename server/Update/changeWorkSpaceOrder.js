const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.changeWorkSpaceOrder = (req, res) => {
    const {projectNum, order, targetOrder} = req.body;
    if(req.session.logined === true){
        con.query('UPDATE workSpace SET sequent = 0 WHERE projectNum = ? and sequent = ?', [projectNum, order], (error, rows, fields)=> {
            if(error) throw error;
            con.query('UPDATE workSpace SET sequent = sequent - 1 WHERE projectNum = ? and sequent > ?', [projectNum, order], (error, rows, fields)=> {
                if(error) throw error;
                con.query('UPDATE workSpace SET sequent = sequent + 1 WHERE projectNum = ? and sequent >= ?', [projectNum, targetOrder], (error, rows, fields)=> {
                    if(error) throw error;
                    con.query('UPDATE workSpace SET sequent = ? WHERE projectNum = ? and sequent = 0', [targetOrder, projectNum], (error, rows, fields)=> {
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