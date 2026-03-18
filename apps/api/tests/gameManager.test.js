import { expect, describe,test, assert } from 'vitest'
import Morpion from "../src/games/morpion/game.js";
import GameManager from "../src/games/GameManager.js";

describe("GameManager test", () => {
    test("Le gameManager doit lancer une instance de Morpion pour un roomId donné ", () => {
        const manager = new GameManager();
        const game = manager.launchGame('fun', 'morpion');
        expect(game).toBeInstanceOf(Morpion);
        expect(game.room).toEqual('fun');
    })

    test("le gameManage doit recuperer une instance d'un jeu via son room id", () => {
        const manager = new GameManager();
        const createdGame = manager.launchGame(1, 'morpion');
        const retrievedGame = manager.getGame(1);
        expect(retrievedGame).toBe(createdGame);
    })

    test("Le gameManager doit férer plusieurs parties différentes de maniere isolées", () => {
        const manager = new GameManager();
        const game1 = manager .launchGame(1, 'morpion');
        const game2 = manager.launchGame(2, 'morpion');
        game1.playMove(0);
        const gameboard1 = game1 .getBoard();
        const gameboard2 = game2 .getBoard();
        expect(gameboard1[0]).toEqual('X');
        expect(gameboard2[0]).toEqual('');
    })

    test("Doit pouvoir supprimer une partie une fois terminée", () => {
        const manager = new GameManager();
        manager.removeGame(1);
        expect(manager.getGame(1)).toBeUndefined();
    })
})