const {mysqlKey} = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.timeResponse = (req, res) => {
    const {reqNum, submitUserNum, innerData} = req.body;
        if(req.session.logined === true){
            con.query('insert into timeResponse values(default, ?, ?, ?)', [reqNum, submitUserNum, JSON.stringify(innerData)], (error, rows, fields) =>{
                if (error) throw error;
                res.send({success : 0});
            })
        } else {
            console.log("미로그인 상태입니다.");
            res.send({success : 3});
        }
};
