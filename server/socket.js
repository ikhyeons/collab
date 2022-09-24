const app = require('express')()
const server = require('http').createServer(app)
const cors = require('cors')
const io = require('socket.io')(server,{
    cors : {
        origin :"*",
        credentials :true
    }
});

//웹소켓 연결
io.on('connection', socket=>{
    //message로 데이터가 오면
    socket.on('message',({chat}) => {
        console.log(chat)
        io.emit('newChat',({newChat : 1}))
    })
})

server.listen(2006, function(){
    console.log('listening on port 2006 webSocket');
})