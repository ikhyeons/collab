const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.createChatSpace = (req, res) => {

const {projectNum}= req.body;
    if(req.session.logined === true){
        con.query('select count(*) from chatSpace where projectNum = ?', [projectNum], (error, rows1, fields)=>{
            //ㄴ 현재 프로젝트의 채팅 스페이스 수를 셈
  	        con.query('insert into chatSpace values(default, ?, "새로운채팅방", "new", ?, default)', [projectNum, rows1[0]['count(*)'] + 1], (error, rows, fields)=> {
                // ㄴ 채팅 스페이스에 데이터 추가 sequent값으로 현재 프로젝트에 해당하는 채팅스페이스의 수 +1을 넣음 rows1[0]['count(*)']
                con.query('select count(*) from chatSpace', (error, rows2, fields)=> {
                    // ㄴ 채팅 스페이스의 수
                    con.query('insert into chatParticipant values(default, ?, ?, default)', [rows2[0]['count(*)'], req.session.sid], (error, rows, fields)=> {
                        //ㄴ 채팅 참가자에 나 자신을 추가함
                        if(error) throw error;
                        res.send({success : 0});
                    })
                })
       	    })
       })
    } else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
}
