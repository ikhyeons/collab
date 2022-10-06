const {mysqlKey}  = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.createCollaborator = (req, res) => {
    const {projectNum, userEmail} = req.body;
    if(req.session.logined === true){
        con.query('select userNum from user where email = ?', [userEmail], (error, rows1, fields)=>{ // 해당 이메일을 가진 유저가 있는지 검사
            if(rows1.length){//유저가 있을경우
                con.query('select userNum from collaborator where projectNum = ? and userNum = ?', [projectNum, rows1[0].userNum], (error, rows2, fields)=>{
                    //ㄴ 이미 collaborator에 해당 유저가 있을 경우
                    if(rows2.length){
                        console.log("이미 가입된 유저입니다.")
                        res.send({success : 2});
                    } else {
                        con.query('select chatSpaceNum from chatSpace where projectNum = ? and type = "default"', [projectNum], (error, rows3, fields)=> {
                            //ㄴ 현재 프로젝트의 타입이 default인 채팅 스페이스를 선택함(전체 채팅방임)
                            con.query('insert into chatParticipant values(default, ?, ?, default)', [rows3[0].chatSpaceNum, rows1[0].userNum], (error, rows4, fields)=> {
                                //ㄴ전체 채팅에 채팅 참가자를 추가함
                                con.query('insert into collaborator values(default, ?, ?, default, 3)', [projectNum, rows1[0].userNum], (error, rows5, fields)=> {
                                    //ㄴ 협업자를 추가함
                                    if(error) throw error;
                                    res.send({success : 0});
                                })
                            })
                        })
                    }
                })
            }
            else {//유저가 없을 경우
                console.log("존재하지 않는 유저입니다.")
                res.send({success : 1});
            }
        })
        
        } else {
            console.log("로그인 상태가 아닙니다.");
            res.send({success : 3});
        }
    }