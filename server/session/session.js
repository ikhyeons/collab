const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.login = (req, res) => {
    let email = req.body.email;
    let password = req.body.password
    con.query('select * from user where email = ?', [email], (error, rows, fields) => {
        if(rows.length){
            if(rows[0].email == email) {
                con.query('select password from user where email = ?', [email], (error, rows, fields) => {
                    if(rows[0].password == password) {
                        req.session.logined=true;
                        req.session.sid=email;
                        req.session.save(()=>{
                            console.log(req.session);
                        });
                        res.send({'success' : 0, 'session_cookie' : req.session, 'session_cookie_id' : req.session.id})
                    } else {
                        res.send({'success' : 1, 'session' : req.session})
                    }
                })
            };
        } else {
            res.send({'success' : 2, 'session' : req.session})
        }
    })
}

exports.logout = (req, res) => {
    if (req.session.logined == true){
        req.session.destroy((err) => {
            console.log('정상 로그아웃!');
            res.clearCookie('connect.sid');
            res.send({'success' : 0});
        })
    } else {
        console.log('정상 로그아웃 실패!');
        res.clearCookie('connect.sid');
        res.send({'success' : 1});
    }
}