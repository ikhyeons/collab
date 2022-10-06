const {mysqlKey} = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.changeCalendarEventDate = (req, res) => {
    const { eventNum, startDate, endDate } = req.body;
        if(req.session.logined === true ){
            if(startDate === ''){ // 확장, 축소일 경우
                con.query('update calendarEvent SET endDate = ? where eventNum = ?', [endDate, eventNum], (error, rows, fields) =>{
                    //끝 날자만 변경
                    if (error) throw error;
                    res.send({success : 0})
                    })
            } else { // 자리이동일 경우
                con.query('update calendarEvent SET startDate= ?, endDate = ? where eventNum = ?', [startDate, endDate, eventNum], (error, rows, fields) =>{
                    //시작날자, 끝날자 둘다 변경
                    if (error) throw error;
                    res.send({success : 0})
                    })
            }
        } else {
            console.log("미로그인 상태입니다.");
            res.send({success : 3});
        }
};
