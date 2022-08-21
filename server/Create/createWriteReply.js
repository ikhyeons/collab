const {mysqlKey} = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.createWriteReply = (req, res) => {
    const { docNum, innerData, type } = req.body;
        if(req.session.logined === true){
            con.query('insert into reply values(default, ?, ?, ?, ?, default, 0)', [docNum, req.session.sid, type, innerData], (error, rows, fields) =>{
                if (error) throw error;
                res.send({success : 0});
            })
        } else {
            console.log("미로그인 상태입니다.");
            res.send({success : 3});
        }
};
