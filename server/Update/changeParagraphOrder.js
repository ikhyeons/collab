const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.changeParagraphOrder = (req, res) => {
    const {docNum, order, targetOrder} = req.body;
    console.log("n",docNum, "o",order, "to",targetOrder)
    if(req.session.logined === true){
        con.query('UPDATE paragraph SET sequent = 0 WHERE docNum = ? and sequent = ?', [docNum, targetOrder], (error, rows, fields)=> {
            if(error) throw error;
            con.query('UPDATE paragraph SET sequent = sequent - 1 WHERE docNum = ? and sequent > ?', [docNum, targetOrder], (error, rows, fields)=> {
                if(error) throw error;
                con.query('UPDATE paragraph SET sequent = sequent + 1 WHERE docNum = ? and sequent >= ?', [docNum, order], (error, rows, fields)=> {
                    if(error) throw error;
                    con.query('UPDATE paragraph SET sequent = ? WHERE docNum = ? and sequent = 0', [order, docNum], (error, rows, fields)=> {
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