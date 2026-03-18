// DEFINE WINNING RULES
export const winningCombinaisons = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontales
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Verticales
    [0, 4, 8], [2, 4, 6]              // Diagonales
];

export const PLAYER_1_ICON = "x";
export const PLAYER_2_ICON = "o";
export const icons = {
    1: 'X',
    2: 'O'
}
export const states = {
    PLAYING: 0,
    WIN: 1,
    SPARE: 2
};