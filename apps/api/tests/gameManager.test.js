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
        const createdGame = manager.launchGame('fun', 'morpion');
        const retrievedGame = manager.getGame('fun');
    })
})