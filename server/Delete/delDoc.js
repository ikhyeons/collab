const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.delDoc = (req, res) => {
    const {docNum} = req.body;
    if(req.session.logined === true){
        con.query('select makeUserNum from document WHERE docNum = ?', [docNum], (error, rows, fields)=> {
            //어떤 글의 작성자를 얻음
            if(error) throw error;
            if(rows[0].makeUserNum === req.session.sid){//삭제하려는 사람과 작성자가 일치할 경우
                con.query('UPDATE document SET del = 1 WHERE docNum = ?', [docNum], (error, rows, fields)=> {
                    //ㄴ 해당 글의 삭제를 1로 변경
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