import React from 'react'
import {X} from "lucide-react";

const GAMES = [
    { id: 'morpion', label: 'Morpion', desc: 'Classique 3x3', rows: 3, cols: 3, winLength: 3 },
    { id: 'morpion-rev', label: 'Morpion Révolution', desc: '5x5 — aligne 4', rows: 5, cols: 5, winLength: 4 },
    { id: 'morpion-nosense', label: 'Morpion NoSense', desc: '3x5 — aligne 3', rows: 3, cols: 5, winLength: 3 },
    { id: 'puissance4', label: 'Puissance 4', desc: '6x7 — aligne 4', rows: 6, cols: 7, winLength: 4 },
]

function GamePicker({target, onSelect, onClose}) {
        if (!target) return null;
    return (
        <div className="gamepicker-overlay" onClick={onClose}>
            <div className="gamepicker-card" onClick={e => e.stopPropagation()}>
                <div className="gamepicker-header">
                    <span>Défier <strong>{target.pseudo}</strong></span>
                    <button className="gamepicker-close" onClick={onClose}>
                        <X size={16}/>
                    </button>
                </div>

                <div className="gamepicker-list">
                    {GAMES.map((game) => (
                        <div key={game.id} className="gamepicker-item" onClick={()=>onSelect(target, game)}>
                            <span className="gamepicker-label">{game.label}</span>
                            <span className="gamepicker-desc">{game.desc}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default GamePicker
