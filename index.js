const express = require('express');
const http = require('http')
const path = require('path')
const socketIO = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)
app.use(express.static(path.join(__dirname + '/public')));

app.get('/', (req, res) => {
  res.sendFile('index.html')
})

io.on('connection', socket => {
  // console.log("new user")

  socket.username = "Anonymus"

  socket.on('change_username', data => {
    socket.username = data.username
    // console.log('username: ', socket.username)
  })

  socket.on('chat_message', data => {
    console.log('data: ', data, socket.username)
    io.emit('chat_message', { msg: data, user: socket.username })
  })
})

server.listen(3000, () => console.log("listening on port 3000"))

// const app = require('express')();
// const http = require('http').createServer(app);
// const io = require('socket.io')(http);

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });

// io.on('connection', socket => {
//   console.log('a user connected!');

//   socket.on('chat_message', msg => {
//     console.log('message: ', msg)

//     io.emit('chat_message', msg)
//   })

//   socket.on('disconnect', () => {
//     console.log('user disconnected')
//   })
// })

// http.listen(3000, function(){
//   console.log('listening on *:3000');
// });
