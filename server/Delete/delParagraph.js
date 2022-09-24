const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.delParagraph = (req, res)=>{
    const { paragraphNum, docNum } = req.body;
    if(req.session.logined === true){
        con.query('select sequent from paragraph where paragraphNum = ?', [paragraphNum], (error, rows1, feild) =>{
            //해당 문단의 순서를 받아옴
            con.query('delete from paragraph where paragraphNum = ?', [paragraphNum], (error, rows, feild) =>{
                //해당 문단을 삭제 함
                con.query('UPDATE paragraph SET sequent = sequent - 1 WHERE docNum = ? and sequent >= ?', [docNum, rows1[0].sequent], (error, rows, feild) =>{
                    //삭제한 문단보다 큰 순서를 갖는 문단의 순서를 1씩 내림
                    if(error) throw error
                    res.send({success : 0})
                })
            })
        })
    }
     else {
        res.send({success : 3})
        console.log("로그인 상태가 아닙니다.");
    }
    
}