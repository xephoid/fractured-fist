import React from 'react';
import { useCampaign } from '../../context/CampaignContext';
import { LOCATIONS } from '../../data/locations';
import { levelThresholds, displayPlayerName } from '../../data';
import { FACTIONS } from '../../data/factions';

export default function WorldMap({ onSelectLocation, onOpenCollection, onResetGame }) {
    const { state } = useCampaign();
    const { locations } = state.world;

    return (
        <div className="screen container">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>World Map</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <button onClick={onOpenCollection}>Manage Techniques</button>
                    <div>
                        <div>{displayPlayerName(state.player)}</div>
                        <div>Level {state.player.level} {state.player.species}</div>
                        <div>{state.player.xp}/{levelThresholds[state.player.level]} XP</div>
                    </div>
                </div>
            </header>
            <small>Click on a location to see who is available to challenge there.</small>
            <div style={{ position: 'relative', width: '100%', height: '600px', background: 'url("maps/map1.0.png") 0% 25% / cover', borderRadius: '8px', overflow: 'hidden' }}>
                {LOCATIONS.map(loc => {
                    // Check for locked status
                    let isLocked = false;
                    if (loc.owner) {
                        const ownerFactionStanding = state.world.factions[loc.owner]?.standing;
                        if (ownerFactionStanding <= -4) {
                            isLocked = true;
                        }
                    }

                    return (
                        <div
                            key={loc.id}
                            onClick={() => !isLocked && onSelectLocation(loc.id)}
                            style={{
                                position: 'absolute',
                                left: `${loc.x}%`,
                                top: `${loc.y}%`,
                                transform: 'translate(-50%, -50%)',
                                width: '40px', height: '40px',
                                borderRadius: '50%',
                                background: isLocked ? '#555' : (loc.type === 'HOME_BASE' ? 'black' : 'white'),
                                border: isLocked ? '2px solid red' : (loc.id === state.world.currentLocationId ? '3px solid white' : '2px solid black'),
                                cursor: isLocked ? 'not-allowed' : 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '20px'
                            }}
                            title={isLocked ? "Hostile Territory (Locked)" : loc.name}
                        >
                            {isLocked ? '🔒' : loc.icon}
                            {/* Label name */}
                            <div style={{
                                position: 'absolute', top: '45px',
                                background: '#000c', padding: '2px 5px', borderRadius: '4px',
                                whiteSpace: 'nowrap', fontSize: '12px',
                                color: isLocked ? 'red' : 'white'
                            }}>
                                {loc.name}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div style={{ marginTop: '20px', display: 'flex', gap: '20px', justifyContent: 'space-between' }}>
                {/* Simple Faction Status */}
                {state.player.won && <div>You win!</div>}
                {!state.player.won && Object.entries(state.world.factions).map(([id, data]) => {
                    const def = FACTIONS[id];
                    if (!def) return null;
                    return (
                        <div key={id} style={{ color: def.color }}>
                            {def.name}: {data.standing}
                        </div>
                    )
                })}
            </div>
            <div style={{ marginTop: '20px', display: 'flex', gap: '20px', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <a href="./intro.html" style={{ color: 'gold' }}>Introduction</a>
                    <button style={{ color: 'red', border: '1px solid red' }} onClick={onResetGame}>New Game</button>
                </div>
            </div>
        </div>
    );
}
