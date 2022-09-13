const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.createProject = (req, res) => {
    if(req.session.logined === true){
        con.query('insert into project values(default, "새 프로젝트", default, default, ?, default)', [req.session.sid], (error, rows, fields)=> {
            if(error) throw error;
            con.query('SELECT COUNT(*) FROM project', (error, rows1, fields)=> {
                if(error) throw error;
                con.query('insert into collaborator values(default, ?, ?, default, 1)', [rows1[0]['COUNT(*)'], req.session.sid], (error, rows, fields)=> {
                    if(error) throw error;
                    con.query('insert into workSpace values(default, ?, "문서", "li", 1, default)', [rows1[0]['COUNT(*)']], (error, rows, fields)=> {
                        con.query('insert into workSpace values(default, ?, "작업목록", "board", 2, default)', [rows1[0]['COUNT(*)']], (error, rows, fields)=> {
                            con.query('insert into chatSpace values(default, ?, "전체 채팅", "default", 1, default)', [rows1[0]['COUNT(*)']], (error, rows, fields)=> {
                                con.query('SELECT COUNT(*) FROM chatSpace', (error, rows2, fields)=> {
                                    con.query('insert into chatParticipant values(default, ?, 1, default)', [rows2[0]['COUNT(*)'], req.session.sid], (error, rows, fields)=> {
                                        res.send({success : 0});
                                    })
                                })
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