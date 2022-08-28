const {mysqlKey} = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.changeCalendarEvent = (req, res) => {
    const { eventNum, projectNum, startDate, endDate, eventTitle, eventContent } = req.body;
        if(req.session.logined === true ){
            con.query('update calendarEvent SET startDate = ?, endDate = ?, eventTitle = ?, eventContent = ? where projectNum = ? and eventNum = ?', [startDate,endDate, eventTitle, eventContent, projectNum ,eventNum], (error, rows, fields) =>{
                if (error) throw error;
                res.send({success : 0})
                })
        } else {
            console.log("미로그인 상태입니다.");
            res.send({success : 3});
        }
};
