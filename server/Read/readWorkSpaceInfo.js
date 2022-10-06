const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.readWorkSpaceInfo = (req, res) => {
    if(req.session.logined === true){
        let workSpaceNum = req.params.workSpaceNum;
        con.query('select * from workSpace where workSpaceNum = ? and del = 0', [workSpaceNum], (error, rows, fields)=> {
            //워크스페이스 정보를 읽음
            if(error) throw error;
            res.send({success : 0, data : rows[0]});
        })
    }
    else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
    }