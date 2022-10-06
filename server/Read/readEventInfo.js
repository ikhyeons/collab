const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.readEventInfo = (req, res) => {
    const eventNum = req.params.eventNum;
    if(req.session.logined === true){
        con.query('select * from calendarEvent where eventNum = ?', [eventNum], (error, rows, fields)=> {
            //달력 이벤트를 읽음
            if(error) throw error;
            res.send({success : 0, data : rows[0]});
        })
    }
    else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
    }