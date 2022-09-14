const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.createProject = (req, res) => {
    if(req.session.logined === true){
        con.query('insert into project values(default, "새 프로젝트", default, default, ?, default)', [req.session.sid], (error, rows, fields)=> {
            if(error) throw error;
            con.query('SELECT COUNT(*) FROM project', (error, rows1, fields)=> {
                if(error) throw error;
                con.query('SELECT projectNum FROM project ORDER BY projectNum DESC LIMIT 1', (error, rows2, fields)=> {
                    if (error) throw error;
                    con.query('insert into collaborator values(default, ?, ?, default, ?)', [rows2[0].projectNum, req.session.sid, rows1[0]['COUNT(*)']], (error, rows, fields)=> {
                        if(error) throw error;
                        con.query('insert into workSpace values(default, ?, "문서", "li", 1, default)', [rows1[0]['COUNT(*)']], (error, rows, fields)=> {
                            con.query('insert into workSpace values(default, ?, "작업목록", "board", 1, default)', [rows1[0]['COUNT(*)']], (error, rows, fields)=> {
                                res.send({success : 0});
                            })
                        })
                    })
                })
            })
        })
        
    } else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
}