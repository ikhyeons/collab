const {mysqlKey} = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.timeResponse = (req, res) => {
    const {reqNum, innerData} = req.body;
        if(req.session.logined === true){
            con.query('insert into timeResponse values(default, ?, ?, ?)', [reqNum, req.session.sid, JSON.stringify(innerData)], (error, rows, fields) =>{
                //ㄴ 타임 리퀘스트를 생성함
                if (error) throw error;
                res.send({success : 0});
            })
        } else {
            console.log("미로그인 상태입니다.");
            res.send({success : 3});
        }
};
