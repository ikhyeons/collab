const {mysqlKey} = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.createDocument = (req, res) => {
    const { workSpaceNum } = req.body;
        if(req.session.logined === true){
            con.query('insert into document values(default, ?,"적당한 제목",default, default,"new", 0, 1, ?, 0)', [workSpaceNum, req.session.sid], (error, rows, fields) =>{
                if (error) throw error;
                res.send({success : 0});
            })
        } else {
            console.log("미로그인 상태입니다.");
            res.send({success : 3});
        }
};
