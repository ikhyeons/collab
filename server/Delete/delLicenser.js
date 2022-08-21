const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.delDocLicenser = (req, res) => {
    const {docNum, licenserNum} = req.body;
    if(req.session.logined === true){
        con.query('select makeUserNum from reply WHERE docNum = ?', [docNum], (error, rows, fields)=> {
            if(error) throw error;
            if(rows[0].makeUserNum === req.session.sid){
                con.query('delete from licenser WHERE licenserNum = ?', [licenserNum], (error, rows, fields)=> {
                    if(error) throw error;
                    res.send({success : 0});
                })
            } else {
                console.log("허가자는 작성자만 수정할 수 있습니다.")
                res.send({success : 2});
            }
        })
    }
    else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
    }