const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.delRequest = (req, res) => {
    const {reqNum} = req.body;
    if(req.session.logined === true){
        con.query('select makeUserNum from timeRequest WHERE reqNum = ?', [reqNum], (error, rows, fields)=> {
            //타임 리퀘스트의 유저 작성자 번호를 받아옴
            if(error) throw error;
            if(rows[0].makeUserNum === req.session.sid){//내가 작성자일 경우
                con.query('UPDATE timeRequest SET del = 1 WHERE reqNum = ?', [reqNum], (error, rows, fields)=> {
                    //해당 리퀘스트의 삭제를 1로 변경
                    if(error) throw error;
                    res.send({success : 0});
                })
            } else {
                res.send({success : 2});
            }
        })
    }
    else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
    }