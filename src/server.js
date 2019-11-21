const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const httpServer = express();
const server = require('http').Server(httpServer);
// return a fuction
const io = require('socket.io')(server);

io.on('connection',socket =>{
    console.log('socket',socket.id);
})


mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-rtqmk.mongodb.net/omnistack8?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true 
})

httpServer.use(cors())
httpServer.use(express.json())
httpServer.use(routes);

server.listen('3333');