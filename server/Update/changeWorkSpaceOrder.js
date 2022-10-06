const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.changeWorkSpaceOrder = (req, res) => {
    const {projectNum, order, targetOrder} = req.body;
    console.log(projectNum, order, targetOrder)
    if(req.session.logined === true){
        con.query('UPDATE workSpace SET sequent = 0 WHERE projectNum = ? and sequent = ?', [projectNum, targetOrder], (error, rows, fields)=> {
            //집은 놈의 순서를 0으로 만듦
            if(error) throw error;
            con.query('UPDATE workSpace SET sequent = sequent - 1 WHERE projectNum = ? and sequent > ?', [projectNum, targetOrder], (error, rows, fields)=> {
                //집은 놈의 순서보다 높은 데이터들의 순서를 하나씩 내림
                if(error) throw error;
                con.query('UPDATE workSpace SET sequent = sequent + 1 WHERE projectNum = ? and sequent >= ?', [projectNum, order], (error, rows, fields)=> {
                    //떨어질 놈의 순서보다 큰 순서를 가진 데이터들의 순서를 하나씩 올림
                    if(error) throw error;
                    con.query('UPDATE workSpace SET sequent = ? WHERE projectNum = ? and sequent = 0', [order, projectNum], (error, rows, fields)=> {
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