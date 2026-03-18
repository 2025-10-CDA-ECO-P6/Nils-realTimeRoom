import { expect, describe,test, assert } from 'vitest'
import Morpion from "../src/games/morpion/game.js";

describe("GameManager test", () => {
    test("Le gameManager doit lancer une instance de Morpion pour un roomId donné ", () => {
        const manager = new GameManager();
        const game = manager.launchGame('fun', 'morpion');
        expect(manager).toBeInstanceOf(Morpion);
    })
})