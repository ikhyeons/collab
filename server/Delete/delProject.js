const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.delProject = (req, res) => {
    const {projectNum} = req.body;
    if(req.session.logined === true){
        con.query('select projectManager from project WHERE projectNum = ?', [projectNum], (error, rows, fields)=> {
            //해당 프로젝트의 프로젝트 매니저 넘버를 받음
            if(error) throw error;
            if(rows[0].projectManager === req.session.sid){ // 내가 그 프로젝트의 프로젝트 매니저일 경우
                con.query('UPDATE project SET del = 1 WHERE projectNum = ?', [projectNum], (error, rows, fields)=> {
                    //프로젝트의 삭제를 1로 변경
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