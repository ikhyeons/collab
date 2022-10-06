const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.delDocParticipant = (req, res) => {
    const {docNum, particiNum} = req.body;
    if(req.session.logined === true){
        con.query('select makeUserNum from document WHERE docNum = ?', [docNum], (error, rows, fields)=> {
            //ㄴ 어떤 글의 작성자를 받아옴
            if(error) throw error;
            if(rows[0].makeUserNum === req.session.sid){ // 내가 그 글의 작성자 일 경우
                con.query('delete from docParticipant WHERE particiNum = ?', [particiNum], (error, rows, fields)=> {
                    //ㄴ 해당 글 참여자를 삭제함
                    if(error) throw error;
                    res.send({success : 0});
                })
            } else {
                console.log("참여자는 작성자만 수정할 수 있습니다.")
                res.send({success : 2});
            }
        })
    }
    else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
    }