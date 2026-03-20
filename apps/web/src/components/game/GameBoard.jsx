import React from 'react'
import MorpionBoard from "./MorpionBoard";
import Puissance4 from "./Puissance4";

function GameBoard({currentGame, onMove}) {
    if (!currentGame) return null;
    switch (currentGame.type) {
        case 'morpion':
        case 'morpion-rev':
        case 'morpion-nosense':
            return (
                <MorpionBoard
                    board={currentGame.board}
                    onMove={onMove}
                    winner={currentGame.winner}
                    state={currentGame}
                    currentPlayer={currentGame.currentPlayer}
                    cols={currentGame.cols}
                />
            );

        case 'puissance4':
            return <Puissance4
                board={currentGame.board}
                onMove={onMove}
                winner={currentGame.winner}
                state={currentGame.state}
                currentPlayer={currentGame.currentPlayer}
            />
        // ici on peux ajouter des nouveaux jeux et le composant a instancié
        default:
            return null
    }
}

export default GameBoard
