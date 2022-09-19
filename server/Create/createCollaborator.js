const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.createCollaborator = (req, res) => {
    const {projectNum, userEmail} = req.body;
    if(req.session.logined === true){
        con.query('select userNum from user where email = ?', [userEmail], (error, rows1, fields)=>{
            if(rows1.length){
                con.query('select userNum from collaborator where projectNum = ? and userNum = ?', [projectNum, rows1[0].userNum], (error, rows2, fields)=>{
                    if(rows2.length){
                        console.log("이미 가입된 유저입니다.")
                        res.send({success : 2});
                    } else {
                        con.query('select chatSpaceNum from chatSpace where projectNum = ? and type = "default"', [projectNum], (error, rows3, fields)=> {
                            con.query('insert into chatParticipant values(default, ?, ?, default)', [rows3[0].chatSpaceNum, rows1[0].userNum], (error, rows4, fields)=> {
                                con.query('insert into collaborator values(default, ?, ?, default, 3)', [projectNum, rows1[0].userNum], (error, rows5, fields)=> {
                                    if(error) throw error;
                                    res.send({success : 0});
                                })
                            })
                        })
                    }
                })
            }
            else {
                console.log("존재하지 않는 유저입니다.")
                res.send({success : 1});
            }
        })
        
        } else {
            console.log("로그인 상태가 아닙니다.");
            res.send({success : 3});
        }
    }