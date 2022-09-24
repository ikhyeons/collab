const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.changeMyProjectOrder = (req, res) => {
    const {order, targetOrder} = req.body;
    if(req.session.logined === true){
        con.query('UPDATE collaborator SET sequent = 0 WHERE userNum = ? and sequent = ?', [req.session.sid, targetOrder], (error, rows, fields)=> {
            //집은 놈의 순서를 0으로 만듦
            if(error) throw error;
            con.query('UPDATE collaborator SET sequent = sequent - 1 WHERE userNum = ? and sequent > ?', [req.session.sid, targetOrder], (error, rows, fields)=> {
                //집은 놈의 순서보다 높은 데이터들의 순서를 하나씩 내림
                if(error) throw error;
                con.query('UPDATE collaborator SET sequent = sequent + 1 WHERE userNum = ? and sequent >= ?', [req.session.sid, order], (error, rows, fields)=> {
                    //떨어질 놈의 순서보다 큰 순서를 가진 데이터들의 순서를 하나씩 올림
                    if(error) throw error;
                    con.query('UPDATE collaborator SET sequent = ? WHERE userNum = ? and sequent = 0', [order, req.session.sid], (error, rows, fields)=> {
                        //0으로 빼놨던 놈의 순서를 집어놓은 곳의 순서로 변경함
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