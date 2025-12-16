import React from 'react';
import { useCampaign } from '../../context/CampaignContext';
import { LOCATIONS } from '../../data/locations';

import { FACTIONS } from '../../data/factions';

export default function WorldMap({ onSelectLocation, onOpenCollection }) {
    const { state } = useCampaign();
    const { locations } = state.world;

    return (
        <div className="screen container">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>World Map</h1>
                <small>Click on a location to see who is available to challenge there.</small>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <button onClick={onOpenCollection}>Manage Techniques</button>
                    <div>
                        <div>Lvl {state.player.level} {state.player.species}</div>
                        <div>{state.player.credits} Credits</div>
                    </div>
                </div>
            </header>

            <div style={{ position: 'relative', width: '100%', height: '600px', background: '#333', borderRadius: '8px', overflow: 'hidden' }}>
                {LOCATIONS.map(loc => {
                    const locState = locations[loc.id] || {};
                    const isController = locState.controller;
                    const color = isController ? FACTIONS[isController].color : '#999';

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
                                background: isLocked ? '#555' : (loc.type === 'HOME_BASE' ? 'gold' : 'cyan'),
                                border: isLocked ? '2px solid red' : (loc.id === state.world.currentLocationId ? '3px solid white' : '2px solid black'),
                                cursor: isLocked ? 'not-allowed' : 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '20px'
                            }}
                            title={isLocked ? "Hostile Territory (Locked)" : loc.name}
                        >
                            {isLocked ? '🔒' : (loc.type === 'HOME_BASE' ? '🏠' : '⚔️')}
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

            <div style={{ marginTop: '20px', display: 'flex', gap: '20px' }}>
                {Object.values(state.world.factions).map(f => ( // Fix: state.world.factions is object, map over values or keys
                    // Wait, I stored it as object in Context.
                    // Need to match keys.
                    null
                ))}
                {/* Simple Faction Status */}
                {state.world.locations && Object.values(state.world.locations).map((locState) => {
                    const l = LOCATIONS.find(loc => loc.id === locState.id);
                    if (!l) return null;

                    // Lock Logic
                    const standing = l.owner ? state.world.factions[l.owner]?.standing : 0;
                    const isLocked = l.type === 'HOME_BASE' && standing <= -4;
                    return null; // This block was not fully defined in the instruction, returning null to maintain original behavior.
                })}
                {Object.entries(state.world.factions).map(([id, data]) => {
                    const def = FACTIONS[id];
                    return (
                        <div key={id} style={{ color: def.color }}>
                            {def.name}: {data.standing}
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
