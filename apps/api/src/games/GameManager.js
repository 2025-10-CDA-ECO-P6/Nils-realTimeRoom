import Morpion from "./morpion/game.js";

export default class GameManager {
   constructor() {
       this.games = new Map();
   }

   launchGame(gameId, type, player1SocketId, player2SocketId, gameOptions = {}) {
       let game;
       if (type === 'morpion' || type === 'morpion-rev' || type === 'morpion-nosense') {
           const rows = gameOptions.rows ?? 3;
           const cols = gameOptions.cols ?? 3
           const winLength = gameOptions.winLength ?? 3;
           game =  new Morpion(gameId, rows, cols, winLength);
           game.type = type;
       }
       game.player1.socketId = player1SocketId;
       game.player2.socketId = player2SocketId;
       this.games.set(gameId, game);
       return game;
   }

   getGame(gameId) {
        return this.games.get(gameId);
   }

   removeGame(gameId) {
       this.games.delete(gameId);
   }


}