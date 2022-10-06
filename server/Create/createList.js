const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.createList = (req, res) => {
const {boardNum, listTitle}= req.body;
    if(req.session.logined === true){
       con.query('select count(*) from list where boardNum = ?', [boardNum], (error, rows1, fields)=>{
        //ㄴ 어떤 보드에 들어있는 리스트의 수를 받음
  	        if(listTitle === ''){
                //ㄴ 받은 리스트의 타이틀이 없을 경우 새 리스트라는 이름으로 생성
                con.query('insert into list values(default, ?, "새 리스트", ?, default)', [boardNum, rows1[0]['count(*)'] + 1], (error, rows, fields)=> {
                    if(error) throw error;
                    res.send({success : 0});
                   })
            } else {//있을경우 받은 이름으로 생성
                con.query('insert into list values(default, ?, ?, ?, default)', [boardNum, listTitle, rows1[0]['count(*)'] + 1], (error, rows, fields)=> {
                    if(error) throw error;
                    res.send({success : 0});
                   })
            }
        })
    } else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
}