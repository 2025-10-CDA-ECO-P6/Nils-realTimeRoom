import BoardGame from "../BoardGame.js";
import {states} from "../morpion/rules.js";

export default class Puissance4 extends BoardGame{
    constructor(id) {
        super(id, 6, 7, 4);
    }
    playMove(col) {
        if (this.isFinished()) return;


        let targetIndex = -1;
        for (let row = this.rows - 1; row >= 0; row--) {
            const index = row * this.cols + col;
            if (!this.isAlreadyFill(this.board[index])) {
                targetIndex = index;
                break;
            }
        }

        if (targetIndex === -1) return;

        this.board[targetIndex] = this.currentPlayer.symbol;
        this.currentPlayer.moves.push(targetIndex);

        if (this.checkWin(this.currentPlayer)) {
            this.state = states.WIN;
            this.winner = this.currentPlayer;
            return;
        }
        if (this.isSpare()) {
            this.state = states.SPARE;
            return;
        }
        this.setCurrentPlayer();
    }



}