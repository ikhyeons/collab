const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.readWorkSpaceList = (req, res) => {
    const {projectNum} = req.body;
    if(req.session.logined === true){
        con.query('select * from workSpace where projectNum = ?', [projectNum], (error, rows, fields)=> {
            if(error) throw error;
            res.send({success : 0, data : rows});
        })
    }
    else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
    }