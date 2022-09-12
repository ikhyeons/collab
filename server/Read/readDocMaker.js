const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.readDocMaker = (req, res) => {
    const docNum = req.params.docNum;
    if(req.session.logined === true){
        con.query('SELECT *, user.nickName FROM document LEFT JOIN user ON document.makeUserNum = user.userNum where docNum = ?', [docNum], (error, rows, fields)=> {
            if(error) throw error;
            res.send({success : 0, data : rows[0]});
        })
    }
    else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
    }
    