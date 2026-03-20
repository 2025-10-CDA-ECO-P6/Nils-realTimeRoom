import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import userRouter from './src/routes/userRouter.js';
import { setupSocketHandlers } from './src/socket/socketHandler.js';
import GameManager from "./src/games/GameManager.js";


const app = express();
const server = createServer(app);
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
const gameManager = new GameManager();
setupSocketHandlers(io, gameManager);
server.listen(PORT, '0.0.0.0', () => {
  console.log(`app en ligne ${PORT}`);
})