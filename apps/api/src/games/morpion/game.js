import {states} from './rules.js'
import BoardGame from "../BoardGame.js";


export default class Morpion extends BoardGame{




   constructor(id) {
       super(id,3, 3, 3);
   }

    playMove(index) {
       // condtion arret immediat
        if (this.isAlreadyFill(this.board[index]) || this.isFinished()) {
            return;
        }
           let currentPlayer = this.getCurrentPlayer();
           this.board[index] = currentPlayer.symbol;
           this.currentPlayer.moves.push(index); // on ajoute l'index de la case joué dans le tableau du joueur correspondant


           if (this.checkWin(this.currentPlayer)) {
               this.state = states.WIN;
               this.winner = this.currentPlayer;
               return;
           }
           if (this.isSpare()) {
               this.state = states.SPARE;
           }
           this.setCurrentPlayer();

    }






}
