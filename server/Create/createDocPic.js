const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.createDocPic = (req, res) => {
const {paragraphNum, urls}= req.body;
    if(req.session.logined === true){
        let queryString = 'insert into docPic values';
        //쿼리문 기본
        urls.map((data)=>{queryString = queryString + `(default, ${paragraphNum}, '${data}'), `})
        //받은 url을 하나씩 돌려가면서 쿼리문 기본 뒤에 sql문 형식으로 붙임
        queryString = queryString.slice(0, -2);
        //마지막 콤마랑 스페이스바 제거를 위한 줄
        con.query(queryString, (error, rows, fields)=> { // 받은 사진 url을 db에 저장
                    if(error) throw error;
                    res.send({success : 0});
        })
    } else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
}


