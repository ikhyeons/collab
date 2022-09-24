const {mysqlKey} = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.changeCalendarEvent = (req, res) => {
    const { eventNum, eventTitle, eventContent } = req.body;
        if(req.session.logined === true ){
            con.query('update calendarEvent SET eventTitle = ?, eventContent = ? where eventNum = ?', [eventTitle, eventContent, eventNum], (error, rows, fields) =>{
                //달력 데이터 업데이트
                if (error) throw error;
                res.send({success : 0})
                })
        } else {
            console.log("미로그인 상태입니다.");
            res.send({success : 3});
        }
};
