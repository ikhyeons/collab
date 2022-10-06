const {mysqlKey} = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.readChatData = (req, res) => {
    const chatSpaceNum = req.params.chatSpaceNum;
        if(req.session.logined === true){
            con.query('SELECT *, user.nickName FROM chat LEFT JOIN user ON chat.makeUserNum = user.userNum where chatSpaceNum = ?', [chatSpaceNum], (error, rows, fields) =>{
                //유저번호가 같은 유저를 채팅과 같이 읽음
                if (error) throw error;
                let newArray = [...rows]
                newArray = newArray.map((data)=>{
                    if(data.makeUserNum === req.session.sid){
                        //만약 유저넘이 나랑 같으면 내가보낸 채팅이고, 아닐경우 남이보낸 채팅
                        return {...data, my : 1}
                    } else {
                        return {...data, my : 0}
                    }
                })
                res.send({success : 0, data: newArray});
            })
        } else {
            console.log("미로그인 상태입니다.");
            res.send({success : 3});
        }
};

