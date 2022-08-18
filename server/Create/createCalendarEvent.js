const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.createCalendarEvent = (req, res) => {
    const {projectNum, startDate, endDate, eventTitle, eventContent} = req.body;
    if(req.session.logined === true){
        con.query('insert into calendarEvent values(default, ?, ?, ?, ?, ?, ?, default, 0)', [projectNum, req.session.sid, startDate, endDate, eventTitle, eventContent], (error, rows, fields)=> {
            if(error) throw error;
            res.send({success : 0});
        })
    }
    else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
    }