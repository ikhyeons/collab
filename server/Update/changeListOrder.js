const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.changeListOrder = (req, res) => {
    const {sourceBNum, targetBNum, order, targetOrder} = req.body;
    if(req.session.logined === true){
        if(sourceBNum === targetBNum){
            con.query('UPDATE list SET sequent = 0 WHERE boardNum = ? and sequent = ?', [sourceBNum, targetOrder], (error, rows, fields)=> {
                if(error) throw error;
                con.query('UPDATE list SET sequent = sequent - 1 WHERE boardNum = ? and sequent > ?', [sourceBNum, targetOrder], (error, rows, fields)=> {
                    if(error) throw error;
                    con.query('UPDATE list SET sequent = sequent + 1 WHERE boardNum = ? and sequent >= ?', [sourceBNum, order], (error, rows, fields)=> {
                        if(error) throw error;
                        con.query('UPDATE list SET sequent = ? WHERE boardNum = ? and sequent = 0', [order, sourceBNum], (error, rows, fields)=> {
                            if(error) throw error;
                            res.send({success : 0});
                        })
                    })
                })
            })
        } else {
            //각 보드가 다를 경우
            //1. 넣을 보드에서 들어간 곳의 시퀀트보다 높은 시퀀트를 하나씩 높임.
            //2. 넣어진 데이터의 보드번호, 시퀀트값 변경
            //3. 빠진곳 보드의 시퀀트보다 높은 시퀀트를 하나씩 줄임
            con.query('UPDATE list SET sequent = sequent + 1 WHERE boardNum = ? and sequent >= ?', [targetBNum, targetOrder], (error, rows, fields)=> {
                con.query('UPDATE list SET boardNum = ?, sequent = ? WHERE boardNum = ? and sequent = ?', [targetBNum, targetOrder, sourceBNum, order], (error, rows, fields)=> {
                    con.query('UPDATE list SET sequent = sequent - 1 WHERE boardNum = ? and sequent > ?', [sourceBNum, order], (error, rows, fields)=> {
                        if(error) throw error;
                        res.send({success : 0});
                    })
                })
            })
        }
    }
    else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
    }