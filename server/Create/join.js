const {mysqlKey} = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.join = (req, res) => {
    const {email, password, nickname} = req.body;
    con.query('select email from user where email = ?', [email], (error, rows, fields)=>{
        //유저풀에 이미 해당 이메일을 가진 사람이 있는가?
        if(!rows.length){ //없다면 회원가입함
            con.query('insert into user values(default, ?, ?, ?, default)', [email, password, nickname], (error, rows, fields) =>{
                if (error) throw error;
                res.send({success : 0});
            })
        } else {
            console.log("이미 사용중인 이메일입니다.");
            res.send({success : 1});
        }
    });
};