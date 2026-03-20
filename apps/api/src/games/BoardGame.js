import {states} from "./morpion/rules.js";

export default class BoardGame {
    constructor(id, rows, cols, winLength) {
        this.type = ''
        this.id = id;
        this.rows = rows;
        this.cols = cols;
        this.winLength = winLength;
        this.board = Array(rows * cols).fill('');
        this.player1 = {symbol : 'X', socketId: null, moves: []};
        this.player2 = {symbol : 'O', socketId: null, moves: []};
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
        throw Error('doit etee implementé');
    }

    checkWin(player) {
       const moves = new Set(player.moves);
       const direction = [
           [0, 1], // hor
           [-1, 0],// ver
           [1, -1], // diag
           [-1, 1]// diag
       ]

        for (const index of moves) {
            // pour chaque index on va convertir la case en coordonée
            const row = Math.floor(index/this.cols); //2
            const col = index % this.cols; // 1

            // pour chaque direction on regarde la case voisine :
            for (const [directRow, directCol] of direction) {
                let count = 1;

                for (let i = 1; i < this.winLength; i++) {
                    const r = row + directRow *i;
                    const c = col + directCol *i;
                if (r < 0 || r >= this.rows || c < 0 || c >=this.cols) break;
                if (!moves.has(r * this.cols + c)) break;
                count++;
                }
                if (count >= this.winLength) return true;
            }
        }
    }


    isFinished() {
        return this.state === states.WIN || this.state === states.SPARE;
    }

    isAlreadyFill(cell) {
        if (cell === '') return false;
        return true;
    }


    isSpare() {
        if (!this.board.includes('') && this.state !== states.WIN) {
            return true;
        }
        return false;
    }


    toJson() {
        return {
            board: this.board,
            state: this.state,
            currentPlayer: this.currentPlayer,
            winner: this.winner,
            cols: this.cols,
            type : this.type
        };
    }
}
