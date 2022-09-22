const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.delProject = (req, res) => {
    const {projectNum} = req.body;
    if(req.session.logined === true){
        con.query('select projectManager from project WHERE projectNum = ?', [projectNum], (error, rows, fields)=> {
            if(error) throw error;
            if(rows[0].projectManager === req.session.sid){
                con.query('UPDATE project SET del = 1 WHERE projectNum = ?', [projectNum], (error, rows, fields)=> {
                    if(error) throw error;
                    res.send({success : 0});
                })
            } else {
                console.log("권한없음")
                res.send({success : 2})
            }
        })
    }
    else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
    }