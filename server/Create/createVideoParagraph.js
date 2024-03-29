const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.createVideoParagraph = (req, res) => {
const {docNum}= req.body;
    if(req.session.logined === true){
        con.query('select count(*) from paragraph where docNum=?', [docNum], (error, rows1, fields)=> {
            //ㄴ 어느 글에서의 문단 수를 받아옴
            con.query('insert into paragraph values(default, ?, "video", "", ?)', [docNum, rows1[0]['count(*)']+1], (error, rows, fields)=> {
                //문단을 생성함, sequent를 문단수 +1로 만듦, text형태로 만듦
                if(error) throw error;
                res.send({success : 0});
            })
       	})
    } else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
}