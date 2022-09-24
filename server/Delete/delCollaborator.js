const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.delCollaborator = (req, res) => {
    const {projectNum} = req.body;
    if(req.session.logined === true){
        con.query('delete from collaborator WHERE projectNum = ? and userNum = ?', [projectNum, req.session.sid], (error, rows, fields)=> {
            //ㄴ 협업자 삭제
            if(error) throw error;
            res.send({success : 0});
        })
    }
    else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
    }