const {mysqlKey} = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.changeResponse = (req, res) => {
    const { reqNum, order } = req.body;
        if(req.session.logined === true){
            con.query('update timeResponse SET innerData = ? where reqNum = ? and submitUserNum = ?', [order, reqNum, req.session.sid], (error, rows, fields) =>{
                //타임 리스폰스 데이터 변경
                if (error) throw error;
                res.send({success : 0});
            })
        } else {
            console.log("미로그인 상태입니다.");
            res.send({success : 3});
        }
};
