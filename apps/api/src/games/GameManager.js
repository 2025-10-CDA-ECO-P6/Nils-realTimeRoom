import Morpion from "./morpion/game.js";

export default class GameManager {
   constructor() {
   }

   launchGame(room, game) {
       if (game === 'morpion') {
           return new Morpion(room);
       }
   }
}