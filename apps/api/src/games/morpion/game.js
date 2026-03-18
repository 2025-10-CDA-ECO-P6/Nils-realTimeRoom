import {states, winningCombinaisons} from './rules.js'
import * as console from "node:console";

export default class Morpion {


    player1 = {
        'symbol' : 'X',
        'moves' : [],

    };
    player2 = {
        'symbol' : 'O',
        'moves' : [],
    };

   constructor() {
       this.board = Array(9).fill('');
       this.state = states.PLAYING;
       this.currentPlayer = this.player1;
       this.winner = null

   }


   getBoard() {
       return this.board;
   }

   getState() {
       return this.state
   }
   setState(newState) {
       this.state =newState;
   }

   getCurrentPlayer() {
       return this.currentPlayer;
   }

   setCurrentPlayer() {
       this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;

   }

   getWinner() {
       return this.winner;
   }

   setWinner(winner) {
       this.winner = winner;
   }





    playMove(index) {
       if (!this.isAlreadyFill(this.board[index]) && !this.isFinished()) {
               let currentPlayer = this.getCurrentPlayer();
               this.board[index] = currentPlayer.symbol;
               this.currentPlayer.moves.push(index); // on ajoute l'index de la case joué dans le tableau du joueur correspondant
               if (this.isWin() || this.isSpare()) {
                   console.log(this.winner)
                   return;
               }
               this.setCurrentPlayer();
       } else {
           this.isFinished() ? console.log('La partie est terminée') :  console.log('La case est déja prise');

       }
    }

     isFinished() {
       return this.state === states.WIN || this.state === states.SPARE;
    }

    isAlreadyFill(cell) {
       if (cell === '') return false;
       return true;
    }

     isWin() {
       const hasWon = winningCombinaisons.some(combinaison => combinaison.every(index => this.currentPlayer.moves.includes(index)))
       if (hasWon) {
           this.state = states.WIN;
           this.setWinner(this.currentPlayer);
           return true;
       }
       return false;
     }

     isSpare() {
       if (!this.board.includes('') && !states.WIN) {
           return true;
       }
       return false;
     }






}
