const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.createProject = (req, res) => {
    if(req.session.logined === true){
        con.query('insert into project values(default, "새 프로젝트", default, default, ?, default)', [req.session.sid], (error, rows, fields)=> {
            if(error) throw error;
            con.query('SELECT COUNT(*) FROM project', (error, rows1, fields)=> {
                if(error) throw error;
                console.log(rows1[0]['COUNT(*)'], req.session.sid);
                con.query('insert into collaborator values(default, ?, ?, default, 1)', [rows1[0]['COUNT(*)'], req.session.sid], (error, rows, fields)=> {
                    // 이거 수정해야 되는듯?
                    if(error) throw error;
                    res.send({success : 0});
                })
            })
        })
        
    } else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
}