import React from 'react';
import { TECHNIQUES } from '../../data/techniques';
import TooltippedName from '../common/TooltippedName';

export default function RewardScreen({ rewardOptions, onSelect, onSkip }) {
    const { techniques, earnedXp, earnedCredits } = rewardOptions;

    // Techniques to learn
    const options = techniques || [];

    return (
        <div className="screen container">
            <h1>Victory!</h1>

            <div style={{ background: '#222', padding: '15px', borderRadius: '8px', marginBottom: '20px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', color: 'gold', fontWeight: 'bold' }}>+{earnedCredits}</div>
                    <div style={{ color: '#aaa', fontSize: '12px' }}>CREDITS</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', color: 'cyan', fontWeight: 'bold' }}>+{earnedXp}</div>
                    <div style={{ color: '#aaa', fontSize: '12px' }}>XP</div>
                </div>
            </div>

            <p style={{ textAlign: 'center' }}>You may learn 1 new technique from your opponent:</p>

            <div className="card-grid">
                {options.map(techId => {
                    const tech = TECHNIQUES.find(t => t.id === techId) || { name: techId, id: techId };
                    return (
                        <div
                            key={tech.id}
                            onClick={() => onSelect(tech.id)}
                            className="card"
                            style={{ cursor: 'pointer', border: '1px solid lime', display: 'flex', flexDirection: 'column' }}
                        >
                            <h3 style={{ margin: '5px 0' }}><TooltippedName techniqueId={tech.id} /></h3>
                            <p style={{ flex: 1, fontSize: '0.9em', color: '#ccc' }}>{tech.description}</p>
                            <small>{tech.cost} Spirit</small>
                            <button style={{ marginTop: '10px', background: 'gold', color: 'black', border: 'none', padding: '5px', cursor: 'pointer' }}>
                                Learn
                            </button>
                        </div>
                    );
                })}
            </div>

            <button onClick={onSkip} style={{ background: 'transparent', border: '1px solid #555', color: '#aaa' }}>
                Skip Reward
            </button>
        </div >
    );
}
