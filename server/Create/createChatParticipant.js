const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.createChatParticipant = (req, res) => {
    const {chatSpaceNum, userEmail, projectNum} = req.body;
    if(req.session.logined === true){
        con.query('SELECT *, collaborator.collaboratorNum FROM user LEFT JOIN collaborator ON collaborator.userNum = user.userNum where email = ? and projectNum = ?', [userEmail, projectNum], (error, rows1, fields)=> {
            //ㄴ user와 collaborator을 같이 봐서 유저 이메일이 같은 데이터끼리 짝으로 데이터를 보여줌
            if(rows1.length) { // 데이터가 있을 경우
                con.query('SELECT *, user.userNum FROM chatParticipant LEFT JOIN user ON user.userNum = chatParticipant.userNum where email = ? and chatSpaceNum = ?', [userEmail, chatSpaceNum], (error, rows2, fields)=>{
                    if(rows2.length){ // 이미 채팅 스페이스에 가입되어 있을 경우
                        console.log("이미 가입된 사람입니다.");
                        res.send({success : 2});
                        
                    } else { // 이미 채팅 스페이스에 가입되어 있지 않을 경우 데이터 생성
                        con.query('insert into chatParticipant values(default, ?, ?, default)', [chatSpaceNum, rows1[0].userNum], (error, rows, fields)=> {
                            if(error) throw error;
                            res.send({success : 0});
                        })
                    }
                })
            } else { // 데이터가 없을 경우
                console.log('프로젝트에 없는 사람')
                res.send({success : 1});
            }
        })
    }
    else {
        console.log("로그인 상태가 아닙니다.");
        res.send({success : 3});
    }
}



        