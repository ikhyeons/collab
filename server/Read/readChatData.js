const {mysqlKey} = require('../mysqlKey');
const mysql = require('mysql');
const con = mysql.createConnection(mysqlKey);

exports.readChatData = (req, res) => {
    const chatSpaceNum = req.params.chatSpaceNum;
        if(req.session.logined === true){
            con.query('SELECT *, user.nickName FROM chat LEFT JOIN user ON chat.makeUserNum = user.userNum where chatSpaceNum = ?', [chatSpaceNum], (error, rows, fields) =>{
                if (error) throw error;
                let newArray = [...rows]
                newArray = newArray.map((data)=>{
                    if(data.makeUserNum === req.session.sid){
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

