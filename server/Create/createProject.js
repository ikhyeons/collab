const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.createProject = (req, res) => {
    if(req.session.logined === true){
        con.query('insert into project values(default, "새 프로젝트", default, default, ?, default)', [req.session.sid], (error, rows, fields)=> {
            //ㄴ 새 프로젝트를 만듦
            if(error) throw error;
            con.query('SELECT COUNT(*) FROM collaborator where userNum = ?', [req.session.sid], (error, rows1, fields)=> {
                // ㄴ 내가 가입한 프로젝트의 수를 셈
                if(error) throw error;
                con.query('SELECT projectNum FROM project ORDER BY projectNum DESC LIMIT 1', (error, rows2, fields)=> {
                    // 가장 최근의 프로젝트 넘버를 가져옴
                    if (error) throw error;
                    con.query('insert into collaborator values(default, ?, ?, default, ?)', [rows2[0].projectNum, req.session.sid, rows1[0]['COUNT(*)'] + 1], (error, rows, fields)=> {
                        //ㄴ 내 정보를 넣어서 협업자를 생성함.
                        if(error) throw error;
                        con.query('SELECT COUNT(*) FROM project', (error, rows3, fields)=> {
                            //ㄴ전체 프로젝트의 수를 가져옴
                            con.query('insert into workSpace values(default, ?, "문서", "li", 1, default)', [rows3[0]['COUNT(*)']], (error, rows, fields)=> {
                                con.query('insert into workSpace values(default, ?, "작업목록", "board", 2, default)', [rows3[0]['COUNT(*)']], (error, rows, fields)=> {
                                    con.query('insert into chatSpace values(default, ?, "전체 채팅", "default", 1, default)', [rows3[0]['COUNT(*)']], (error, rows, fields)=> {
                                        con.query('SELECT COUNT(*) FROM chatSpace', (error, rows2, fields)=> {
                                            con.query('insert into chatParticipant values(default, ?, 1, default)', [rows2[0]['COUNT(*)'], req.session.sid], (error, rows, fields)=> {
                                                //기본적으로 문서, 작업목록, 전채채팅을 생성하고 채팅방에 나자신을 넣어둠
                                                res.send({success : 0});
                                            })
                                        })
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