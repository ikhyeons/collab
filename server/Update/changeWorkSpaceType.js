const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.changeWorkSpaceType = (req, res) => {
    const {projectNum, changeType, workSpaceNum, changeTitle} = req.body;
    if(req.session.logined === true){
        con.query('UPDATE workSpace SET type = ?, spaceTitle = ? WHERE projectNum = ? and workSpaceNum = ?', [changeType, changeTitle, projectNum, workSpaceNum], (error, rows, fields)=> {
            if(error) throw error;
            res.send({success : 0});
        })
    }
    else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
    }