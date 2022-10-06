const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.changeWorkSpaceType = (req, res) => {
    const {changeType, workSpaceNum} = req.body;
    if(req.session.logined === true){
        con.query('UPDATE workSpace SET type = ? WHERE workSpaceNum = ?', [changeType, workSpaceNum], (error, rows, fields)=> {
            //워크스페이스 타입 변경
            if(error) throw error;
            res.send({success : 0});
        })
    }
    else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
    }