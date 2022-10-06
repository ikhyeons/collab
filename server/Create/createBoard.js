const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.createBoard = (req, res) => {
    //보드를 새로 만듦
const {workspaceNum, boardTitle}= req.body;
    if(req.session.logined === true){//로그인 검사
       con.query('select count(*) from board where workspaceNum = ?', [workspaceNum], (error, rows1, fields)=>{//해당 워크스페이스의 보드 개수 rows1[0]["count(*)"]
  	        if(boardTitle === ''){ // 보드 제목이 ''일 경우 새 작업공간이라는 이름의 보드를 만듦
                con.query('insert into board values(default, ?, "새 작업공간", ?, default)', [workspaceNum, rows1[0]['count(*)'] + 1], (error, rows, fields)=> {
                    //ㄴ보드 추가
                    if(error) throw error;
                    res.send({success : 0});
                   })
            } else {
                con.query('insert into board values(default, ?, ?, ?, default)', [workspaceNum, boardTitle, rows1[0]['count(*)'] + 1], (error, rows, fields)=> {
                    //보드 제목이 비어있지 않을 경우 입력받은 제목으로 보드를 만듦
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