const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.readBoard = (req, res) => {
    let workspaceNum = req.param.workSpaceNum;
    if(req.session.logined === true){
        con.query('SELECT *, project.projectTitle FROM collaborator LEFT JOIN project ON collaborator.projectNum = project.projectNum where userNum = ?', [req.session.sid], (error, rows1, fields)=> {
            if(error) throw error;
            res.send({success : 0, data : rows1})
        })
    }
    else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
    }