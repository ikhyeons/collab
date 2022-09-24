const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.readEventList = (req, res) => {
    const projectNum = req.params.projectNum;
    if(req.session.logined === true){
        con.query('select * from calendarEvent where projectNum = ? and del = 0', [projectNum], (error, rows, fields)=> {
            //달력 이벤트 리스트를 읽음
            if(error) throw error;
            res.send({success : 0, data : rows});
        })
    }
    else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
    }