const express = require('express');
const path = require('path')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

// app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.get('/', (req, res) => {
  res.render('index.html')
})

let messages = []

io.on('connection', socket => {
  console.log("socket conectado", socket.id)

  socket.emit('previous_messages', messages)

  socket.username = "Anonymus"

  socket.on('change_username', data => {
    socket.username = data.username
  })

  socket.on('chat_message', data => {
    console.log(data)
    messages.push(data)
    io.emit('received_message', data)
  })
})

server.listen(3000, () => console.log("listening on port 3000"))
