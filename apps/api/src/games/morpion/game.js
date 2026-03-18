import {states, winningCombinaisons} from './rules.js'


export default class Morpion {




   constructor(room) {
       this.room = room
       this.player1 = {
           'symbol' : 'X',
           'moves' : [],

       };
       this.player2 = {
           'symbol' : 'O',
           'moves' : [],
       };
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
       // condtion arret immediat
        if (this.isAlreadyFill(this.board[index]) || this.isFinished()) {
            return;
        }
           let currentPlayer = this.getCurrentPlayer();
           this.board[index] = currentPlayer.symbol;
           this.currentPlayer.moves.push(index); // on ajoute l'index de la case joué dans le tableau du joueur correspondant


           if (this.isWin()) {
               this.state = states.WIN;
               this.winner = this.currentPlayer;
               return;
           }
           if (this.isSpare()) {
               this.state = states.SPARE;
           }
           this.setCurrentPlayer();

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
       if (!this.board.includes('') && this.state !== states.WIN) {
           return true;
       }
       return false;
     }






}
