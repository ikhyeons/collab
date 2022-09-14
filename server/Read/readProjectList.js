const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.readMyProjectList = (req, res) => {
    if(req.session.logined === true){
        con.query('SELECT *, project.projectTitle FROM collaborator LEFT JOIN project ON collaborator.projectNum = project.projectNum where userNum = ? and del = 0 ORDER BY sequent ASC', [req.session.sid], (error, rows1, fields)=> {
            if(error) throw error;
            res.send({success : 0, data : rows1})
        })
    }
    else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
    }