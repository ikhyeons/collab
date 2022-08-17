const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.login = (req, res) => {
    let email = req.body.email;
    let password = req.body.password
    con.query('select email, password, userNum from user where email = ?', [email], (error, rows, fields) => {
        if(rows.length){
            if(rows[0].email == email) {
                    if(rows[0].password == password) {
                        req.session.logined=true;
                        req.session.sid=rows[0].userNum;
                        req.session.save(()=>{
                            console.log(req.session);
                        });
                        res.send({'return' : 0})
                    } else {
                        res.send({'return' : 1})
                    }
            };
        } else {
            res.send({'return' : 2})
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