const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.changeWorkSpaceName = (req, res) => {
    const {workSpaceNum, name} = req.body;
    if(req.session.logined === true){
        con.query('UPDATE workSpace SET spaceTitle = ? WHERE workSpaceNum = ?', [name, workSpaceNum], (error, rows, fields)=> {
            if(error) throw error;
            res.send({success : 0});
        })
    }
    else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
    }