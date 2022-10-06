const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.delEvent = (req, res) => {
    const {eventNum} = req.body;
    if(req.session.logined === true){
        con.query('select makeUserNum from calendarEvent WHERE eventNum = ?', [eventNum], (error, rows, fields)=> {
            //해당 이벤트의 작성자를 받아옴
            if(error) throw error;
            if(rows[0].makeUserNum === req.session.sid){//내가 작성한 이벤트일 경우
                con.query('UPDATE calendarEvent SET del = 1 WHERE eventNum = ?', [eventNum], (error, rows, fields)=> {
                    //ㄴ 해당 이벤트의 삭제를 1로 변경
                    if(error) throw error;
                    res.send({success : 0});
                })
            } else {
                res.send({success : 2});
            }
        })
    }
    
    else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
    }