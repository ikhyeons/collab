const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.readBoard = (req, res) => {
    let workspaceNum = req.params.workSpaceNum;
    if(req.session.logined === true){
        con.query('SELECT * FROM board where workspaceNum = ? and del = 0 ORDER BY sequent', [workspaceNum], (error, rows1, fields)=> {
            //지워지지 않은 보드를 순서대로 읽음
            if(error) throw error;
            res.send({success : 0, data : rows1})
        })
    }
    else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
    }