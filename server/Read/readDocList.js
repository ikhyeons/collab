const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.readDocList = (req, res) => {
    const workSpaceNum = req.params.workSpaceNum;
    if(req.session.logined === true){
        con.query('SELECT *, user.nickName FROM document LEFT JOIN user ON document.makeUserNum = user.userNum where workSpaceNum = ? and del = 0 order by docNum desc', [workSpaceNum], (error, rows, fields)=> {
            //글 리스트를 읽음
            if(error) throw error;
            res.send({success : 0, data : rows});
        })
    }
    else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
    }