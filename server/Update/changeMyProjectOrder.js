const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.changeMyProjectOrder = (req, res) => {
    const {userNum, order, targetOrder} = req.body;
    if(req.session.logined === true){
        con.query('UPDATE collaborator SET sequent = 0 WHERE userNum = ? and sequent = ?', [userNum, targetOrder], (error, rows, fields)=> {
            if(error) throw error;
            con.query('UPDATE collaborator SET sequent = sequent - 1 WHERE userNum = ? and sequent > ?', [userNum, targetOrder], (error, rows, fields)=> {
                if(error) throw error;
                con.query('UPDATE collaborator SET sequent = sequent + 1 WHERE userNum = ? and sequent >= ?', [userNum, order], (error, rows, fields)=> {
                    if(error) throw error;
                    con.query('UPDATE collaborator SET sequent = ? WHERE userNum = ? and sequent = 0', [order, userNum], (error, rows, fields)=> {
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