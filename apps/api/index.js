const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');
const userRouter = require("./src/routes/userRouter.js");
const { setupSocketHandlers } = require("./src/socket/socketHandler");

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', userRouter);

const io = new Server(server, {
  cors : {
    origin: '*',
    methods: ["GET", "POST"]
  },
  path: '/socket.io/'
})

setupSocketHandlers(io);
server.listen(PORT, '0.0.0.0', () => {
  console.log(`app en ligne ${PORT}`);
})