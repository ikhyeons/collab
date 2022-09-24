const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.readRequestList = (req, res) => {
    let projectNum = req.params.projectNum;
    if(req.session.logined === true){
        con.query('select * from timeRequest where projectNum = ? and del = 0', [projectNum], (error, rows, fields)=> {
            //타임리퀘스트 리스트를 읽음
            if(error) throw error;
            res.send({success : 0, data : rows, user : req.session.sid});
        })
    }
    else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
    }