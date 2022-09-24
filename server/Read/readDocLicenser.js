const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.readDocLicenser = (req, res) => {
    const docNum = req.params.docNum;
    if(req.session.logined === true){
        con.query('SELECT *, user.nickName FROM licenser LEFT JOIN user ON licenser.selectedUserNum = user.userNum where docNum = ?', [docNum], (error, rows, fields)=> {
            //글 허가자 리스트를 읽음
            if(error) throw error;
            res.send({success : 0, data : rows});
        })
    }
    else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
    }