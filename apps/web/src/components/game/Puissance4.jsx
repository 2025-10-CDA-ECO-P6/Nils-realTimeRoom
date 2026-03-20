import React from 'react'
import {getSocketId} from "../../services/socketClient";

function Puissance4({board, onMove, winner, state, currentPlayer}) {
    if (!board) return null;
    const isMyTurn = currentPlayer?.socketId === getSocketId();
    const cols = 7;
    const rows = 6;
    return (
        <div className="morpion-overlay">
            <div className="morpion-card">
                <h3>Puissance 4</h3>
                <div className="p4-grid" style={{ '--grid-cols': cols }}>
                    {Array.from({ length: cols }, (_, colIndex) => (
                        <button
                            key={colIndex}
                            className="p4-col-btn"
                            onClick={() => onMove(colIndex)}
                            disabled={winner || !isMyTurn}
                        >
                            ▼
                        </button>
                    ))}
                    {board.map((cell, index) => (
                        <div
                            key={index}
                            className={`p4-cell ${cell === 'X' ? 'p4-cell--x' : cell === 'O' ? 'p4-cell--o' : ''}`}
                        />
                    ))}
                </div>
                {winner && <div className="winner-msg">Gagnant : {winner.symbol}</div>}
                {state === 2 && <div className="winner-msg">Match Nul !</div>}
            </div>
        </div>
    )
}

export default Puissance4
