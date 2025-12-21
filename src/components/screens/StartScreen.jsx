import React, { useState } from 'react';
import { useCampaign } from '../../context/CampaignContext';
import GameRulesModal from '../common/GameRulesModal';

export default function StartScreen({ onStart }) {
    const { state, dispatch } = useCampaign();
    const [name, setName] = useState('');
    const [species, setSpecies] = useState('Human');
    const [showRules, setShowRules] = useState(false);
    const [showCampaign, setShowCampaign] = useState(false);

    const handleStart = () => {
        dispatch({ type: 'SET_PLAYER_NAME', payload: name });
        dispatch({ type: 'SET_PLAYER_SPECIES', payload: species });
        onStart();
    };

    return (
        <div className="screen container" style={{ alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            {showRules && (
                <GameRulesModal setShowRules={setShowRules} />
            )}

            {showCampaign && (
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 100, padding: '40px', overflowY: 'auto' }}>
                    <div style={{ maxWidth: '600px', margin: '0 auto', background: '#222', padding: '20px', borderRadius: '8px', border: '1px solid #444' }}>
                        <h2 style={{ color: 'gold', marginTop: 0 }}>Campaign Mode</h2>
                        <ul style={{ lineHeight: '1.6', color: '#ddd' }}>
                            <li><strong>Goal:</strong> Become the World Champion!</li>
                            <li><strong>Difficulty:</strong> Adjusted based on species.</li>
                            <li><strong>World:</strong> Explore the world and challenge opponents.</li>
                            <li><strong>Combat:</strong> Pick opponents and challenge them in combat. <br /><a style={{ color: 'gold', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => { setShowRules(true); setShowCampaign(false); }}>See Combat Rules</a></li>
                            <li><strong>Learn Techniques:</strong> Gain new techniques by defeating opponents. Combine the best techniques to win!</li>
                            <li><strong>Gain XP:</strong> Gain experience points by defeating opponents. Makes you stronger!</li>
                            <li><strong>Defeat one Champion of each Faction to become the World Champion!</strong></li>
                        </ul>
                        <button onClick={() => setShowCampaign(false)} style={{ marginTop: '20px', width: '100%', padding: '10px' }}>Got it</button>
                    </div>
                </div>
            )}

            <h1>Fractured Fist</h1>
            <img src="punch-blast.svg" alt="Logo" style={{ width: '200px' }} />
            <br />
            <div style={{ textAlign: 'center' }}>
                <a href="./intro.html" style={{ color: 'gold' }}>Introduction</a>
                <br />
                <small>NOTE: If you are on your phone I <br />recommend you rotate to landscape</small>
            </div>
            <div style={{ margin: '20px 0', display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' }}>
                <label>
                    Name:
                    <input value={name} onChange={e => setName(e.target.value)} placeholder="Enter Name" style={{ width: '100%', padding: '5px', marginTop: '5px' }} />
                </label>
                <label>
                    Species:
                    <select value={species} onChange={e => setSpecies(e.target.value)} style={{ width: '100%', padding: '5px', marginTop: '5px' }}>
                        <option value="Human">Human (7 Stamina) | Normal</option>
                        <option value="Bouaux">Bouaux (10 Stamina) | Easy</option>
                        <option value="Unmoored">Unmoored (6 Stamina, Foe +4 Misstep) | Spicy</option>
                        <option value="Grankiki">Grankiki (4 Stamina, Draw +1) | Hard</option>
                    </select>
                </label>
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <button onClick={() => setShowCampaign(true)} style={{ flex: 1, background: '#444' }}>Campaign Instructions</button>
                    <button onClick={() => setShowRules(true)} style={{ flex: 1, background: '#444' }}>Rules of Combat</button>
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <button onClick={handleStart} style={{ flex: 2, background: 'gold', color: 'black', fontWeight: 'bold' }}>Begin Journey</button>
                </div>
            </div>
        </div>
    );
}
