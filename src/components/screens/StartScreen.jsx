import React, { useState } from 'react';
import { useCampaign } from '../../context/CampaignContext';

export default function StartScreen({ onStart }) {
    const { state, dispatch } = useCampaign();
    const [name, setName] = useState('');
    const [species, setSpecies] = useState('Human');
    const [showRules, setShowRules] = useState(false);

    const handleStart = () => {
        dispatch({ type: 'SET_PLAYER_SPECIES', payload: species });
        onStart();
    };

    return (
        <div className="screen container" style={{ alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            {showRules && (
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 100,
                    padding: '40px', overflowY: 'auto'
                }}>
                    <div style={{ maxWidth: '600px', margin: '0 auto', background: '#222', padding: '20px', borderRadius: '8px', border: '1px solid #444' }}>
                        <h2 style={{ color: 'gold', marginTop: 0 }}>Rules of Engagement</h2>
                        <ul style={{ lineHeight: '1.6', color: '#ddd' }}>
                            <li><strong>Goal:</strong> Reduce opponent's Stamina to 0.</li>
                            <li><strong>Phase 1: Technique</strong> - Play attack & utility cards. You start with 1 Action.</li>
                            <li><strong>Phase 2: Channel</strong> - Spend Spirit to buy new cards. You start with 1 Channel (Buy).</li>
                            <li><strong>Phase 3: Cleanup</strong> - Discard your hand and draw 5 new cards.</li>
                            <li><strong>Resolution:</strong> Damage and Defense are calculated simultaneously.</li>
                            <li><strong>Refining:</strong> Specialized cards like <em>Assess</em> allow you to "Refine" (Trash) weak cards permanently.</li>
                            <li><strong>Missteps:</strong> Useless clutter cards added by enemies. Refine them to clean your deck.</li>
                            <li><strong>Catch Up:</strong> If you have less Stamina than your opponent, <em>Focus</em> cards let you discard & redraw!</li>
                        </ul>
                        <button onClick={() => setShowRules(false)} style={{ marginTop: '20px', width: '100%', padding: '10px' }}>Got it</button>
                    </div>
                </div>
            )}

            <h1>Fist & Form</h1>
            <div style={{ margin: '20px 0', display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' }}>
                <label>
                    Name:
                    <input value={name} onChange={e => setName(e.target.value)} placeholder="Enter Name" style={{ width: '100%', padding: '5px', marginTop: '5px' }} />
                </label>
                <label>
                    Species:
                    <select value={species} onChange={e => setSpecies(e.target.value)} style={{ width: '100%', padding: '5px', marginTop: '5px' }}>
                        <option value="Human">Human (7 Stamina)</option>
                        <option value="Grankiki">Grankiki (5 Stamina, Draw +1)</option>
                        <option value="Unmoored">Unmoored (6 Stamina, Foe +2 Misstep)</option>
                        <option value="Bouaux">Bouaux (10 Stamina)</option>
                    </select>
                </label>
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <button onClick={() => setShowRules(true)} style={{ flex: 1, background: '#444' }}>How to Play</button>
                    <button onClick={handleStart} style={{ flex: 2, background: 'gold', color: 'black', fontWeight: 'bold' }}>Begin Journey</button>
                </div>
            </div>
        </div>
    );
}
