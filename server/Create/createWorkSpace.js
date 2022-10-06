const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const { counter } = require('@fortawesome/fontawesome-svg-core');
const con = mysql.createConnection(mysqlKey);

exports.createWorkSpace = (req, res) => {

const {projectNum}= req.body;
    if(req.session.logined === true){
       con.query('select count(*) from workSpace where projectNum = ?', [projectNum], (error, rows1, fields)=>{
        //ㄴ 어떤 프로젝트에 들어있는 워크스페이스의 수를 셈
  	        con.query('insert into workSpace values(default, ?, "새 작업공간", "new", ?, default)', [projectNum, rows1[0]['count(*)'] + 1], (error, rows, fields)=> {
                // 워크스페이스를 생성 함
        	    if(error) throw error;
        	    res.send({success : 0});
       	    })
        })
    } else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
}