const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.readRequestList = (req, res) => {
    let projectNum = req.params.projectNum;
    if(req.session.logined === true){
        con.query('select * from timeRequest where projectNum = ?', [projectNum], (error, rows, fields)=> {
            if(error) throw error;
            res.send({success : 0, data : rows});
        })
    }
    else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
    }