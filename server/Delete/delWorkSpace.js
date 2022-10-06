const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.delWorkSpace = (req, res) => {
    const {workSpaceNum, projectNum} = req.body;
    if(req.session.logined === true){
        con.query('select projectManager from project WHERE projectNum = ?', [projectNum], (error, rows, fields)=> {
            //프로젝트의 프로젝트 매니저 넘버를 받아옴
            if(error) throw error;
            console.log(rows);
            if(rows[0].projectManager === req.session.sid){//내가 해당 프로젝트 작성자일 때
                con.query('UPDATE workSpace SET del = 1 WHERE workSpaceNum = ?', [workSpaceNum], (error, rows, fields)=> {
                    //워크스페이스의 삭제를 1로 변경
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