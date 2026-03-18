import Morpion from "./morpion/game.js";

export default class GameManager {
   constructor() {
       this.games = new Map();
   }

   launchGame(gameId, type) {
       let game;
       if (type === 'morpion') {
           game =  new Morpion(gameId);
       }
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