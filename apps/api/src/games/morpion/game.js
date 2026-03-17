import {PLAYER_1_ICON, PLAYER_2_ICON } from './rules.js'
export default class Morpion {



   constructor() {
       this.board = Array(9).fill('');
       console.log(this.board);
   }

   getBoard() {
       return this.board;
   }

    playMove(index) {
        this.board[index] = PLAYER_1_ICON;
        console.log(this.board)
    }


}
