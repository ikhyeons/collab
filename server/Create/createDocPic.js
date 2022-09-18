const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.createDocPic = (req, res) => {
const {paragraphNum, urls}= req.body;
    if(req.session.logined === true){
        let queryString = 'insert into docPic values';
        urls.map((data)=>{queryString = queryString + `(default, ${paragraphNum}, '${data}'), `})
        queryString = queryString.slice(0, -2);
        con.query(queryString, (error, rows, fields)=> {
                    if(error) throw error;
                    res.send({success : 0});
        })
    } else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
}


