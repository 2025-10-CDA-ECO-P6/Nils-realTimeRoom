import { expect, describe,test, assert } from 'vitest'
import Morpion from '../src/games/morpion/game.js'


describe("MorpionGame", () => {
    test("Initialise le plateau de jeu vide avec 9 cases", () => {
        const game = new Morpion();
        const board = game.getBoard();
        expect(board).toEqual([
            '', '', '',
            '', '', '',
            '', '', ''
        ])
    })

    // ================== test jouer un tour ===============================
    test("Joue un tour pour le joueur 1 et remplis une case", () => {
        const game = new Morpion();
        const board = game.getBoard();
        game.playMove(0);
        expect(board[0]).toEqual('x');
    })
})