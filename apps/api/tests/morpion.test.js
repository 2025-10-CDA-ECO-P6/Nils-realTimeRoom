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
})