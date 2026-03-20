import React from 'react';
import {getSocketId} from "../../services/socketClient";

function MorpionBoard({ board, onMove, winner, state, currentPlayer, cols }) {
    if (!board) return null;
    const isMyTurn = currentPlayer?.socketId === getSocketId();
    return (
        <div className="morpion-overlay">
            <div className="morpion-card">
                <h3>Morpion</h3>
                <div className="morpion-grid" style={{'--grid-cols': cols }}>
                    {board.map((cell, index) => (
                        <button
                            key={index}
                            className="morpion-cell"
                            onClick={() => onMove(index)}
                            disabled={cell !== '' || winner || !isMyTurn}
                        >
                            {cell}
                        </button>
                    ))}
                </div>
                {winner && <div className="winner-msg">Gagnant : {winner.symbol}</div>}
                {state === 2 && <div className="winner-msg">Match Nul !</div>}
            </div>
        </div>
    );
}
export default MorpionBoard;