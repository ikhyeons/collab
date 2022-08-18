const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.createCollaborator = (req, res) => {
    const {projectNum, userEmail} = req.body;
    if(req.session.logined === true){
        con.query('select userNum from user where email = ?', [userEmail], (error, rows1, fields)=>{
            if(rows1.length){
                con.query('insert into collaborator values(default, ?, ?, default, 3)', [projectNum, rows1[0].userNum], (error, rows2, fields)=> {
                    if(error) throw error;
                    res.send({success : 0});
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