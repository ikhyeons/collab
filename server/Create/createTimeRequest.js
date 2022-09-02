const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.createTimeRequest = (req, res) => {
const {projectNum, reqTitle, reqContent, month, week} = req.body;
    if(req.session.logined === true){
        con.query('insert into timeRequest values(default, ?, ?, ?, ?, default, ?, ?)', [projectNum, req.session.sid, reqTitle, reqContent, month, week], (error, rows, fields)=> {
            if(error) throw error;
            res.send({success : 0});
        })
    } else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
}
