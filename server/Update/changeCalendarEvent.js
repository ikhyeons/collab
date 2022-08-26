const {mysqlKey} = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.changeCalendarEvent = (req, res) => {
    const { eventNum, projectNum, startDate, endDate, eventTitle, eventContent, secret } = req.body;
        if(req.session.logined === true ){
            con.query('update calendarEvent SET startDate = ? where projectNum = ? and eventNum = ?', [startDate, projectNum ,eventNum], (error, rows, fields) =>{
                if (error) throw error;
                con.query('update calendarEvent SET endDate = ? where projectNum = ? and eventNum = ?', [endDate, projectNum ,eventNum], (error, rows, fields) =>{
                    if (error) throw error;
                    con.query('update calendarEvent SET eventTitle = ? where projectNum = ? and eventNum = ?', [eventTitle, projectNum ,eventNum], (error, rows, fields) =>{
                        if (error) throw error;
                        con.query('update calendarEvent SET eventContent = ? where projectNum = ? and eventNum = ?', [eventContent, projectNum ,eventNum], (error, rows, fields) =>{
                            if (error) throw error;
                            con.query('update calendarEvent SET secret = ? where projectNum = ? and eventNum = ?', [secret, projectNum ,eventNum], (error, rows, fields) =>{
                                if (error) throw error;
                                res.send({success : 0})
                            })  
                        })
                    })
                })
            })
        } else {
            console.log("미로그인 상태입니다.");
            res.send({success : 3});
        }
};
