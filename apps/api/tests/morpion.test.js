import { expect, describe,test, assert } from 'vitest'
import Morpion from '../src/games/morpion/game.js'
import {states} from "../src/games/morpion/rules.js";


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
    test("Joue un tour pour le joueur 1 et remplis une case avec le bon symbole", () => {
        const game = new Morpion();
        const board = game.getBoard();
        game.playMove(0);
        expect(board[0]).toEqual('X');
    })
    
    test('Le joueur 2 est le joueur courant', () => {
        const game = new Morpion();
        const board = game.getBoard();
        game.playMove(2);
        const currentPlayer = game.getCurrentPlayer();
        console.log(currentPlayer);
        expect(currentPlayer.symbol).toEqual('O');
    })

    test("Joue un tour pour le joueur 2 et remplis une case avec le bon symbole", () => {
        const game = new Morpion();
        console.log(game);
        const board = game.getBoard();
        game.playMove(1);
        game.playMove((2))
        expect(board[2]).toEqual('O');
    })

    test("Les deux joueurs jouent , et leur coups sont persistée sur le board", () => {
        const game = new Morpion();
        const board = game.getBoard();
        game.playMove(5);
        game.playMove(8);
        expect(board[5]).toEqual('X');
        expect(board[8]).toEqual('O');
    })

    test("Le joueur joue et la case et deja prise " , () => {
        const game = new Morpion();
        const board = game.getBoard();
        game.playMove(2);
        game.playMove(2);
        expect(board[2]).toEqual('X');
    })

    test("Le joueur joue mais la partie est terminé", () => {
        const game = new Morpion();
        const board = game.getBoard();
        game.setState(states.WIN);
        const isFinished = game.isFinished();
        expect(isFinished).toBe(true);
        game.playMove(2);
        expect(board[2]).toEqual('');
    })

    // ================= test du resultat final win / lose  / equality ==============

    test("Le jeu se lance en état PLAYING", () => {
        const game = new Morpion();
        const state = game.getState();
        expect(state).toEqual(0);
    })

    test("le jeu detecte une égfalité ", () => {
        const game = new Morpion();
        const board = game.getBoard();
        const winner = game.getWinner();
        /*

        +


        poour detecter une égalité, il faut que tout le board soit remplis et que aucune combinaison gagnant ne soit trouvé.
        * **/

    })

    test("le jeu detecte une victoire ", () => {
        const game = new Morpion();
        const board = game.getBoard();
        game.playMove(1); // J1
        game.playMove(6); // J2
        game.playMove(2); // J1
        game.playMove(8); // J2
        game.playMove(3); // J1 --> a ce moment la on doit avoir la victoire
        const isfnisihed = game.isFinished();
        game.playMove(4); // J2 --> ce coup ne doit pas être jouer car la partie doit detecter la victoire .
        expect(board[4]).toEqual('');
        expect(isfnisihed).toBe(true);




        /*
        poour detecter une ivctoire, il faut que une combinaison gagnant  soit trouvé .
        * **/
    })

    test("Le jeu se termine", ()=> {
        const game = new Morpion();
        game.setState(states.WIN);
        const isFinished = game.isFinished();
        expect(isFinished).toBe(true);
    })



})