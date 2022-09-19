const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.changeProjectName = (req, res) => {
    const {projectNum, name} = req.body;
    if(req.session.logined === true){
        con.query('UPDATE project SET projectTitle = ? WHERE projectNum = ?', [name, projectNum], (error, rows, fields)=> {
            if(error) throw error;
            res.send({success : 0});
        })
    }
    else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
    }