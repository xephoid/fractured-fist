import React, { useState, useEffect } from 'react';
import { useCampaign } from '../../context/CampaignContext';
import { LOCATIONS } from '../../data/locations';
import { generateChampion } from '../../services/championGenerator';
import { FACTION_IDS } from '../../data/factions';
import { TECHNIQUES } from '../../data/techniques';
import TooltippedName from '../common/TooltippedName';

export default function LocationDetail({ locationId, onBack, onFight, onOpenCollection }) {
    const { state } = useCampaign();
    const loc = LOCATIONS.find(l => l.id === locationId);

    // Generate potential opponents when location loads
    const [champions, setChampions] = useState([]);

    useEffect(() => {
        if (!loc) return;

        // Determine factions present
        // Controlled: Owner only
        // Contested: Possible factions
        let presentFactions = [];
        if (loc.type === 'HOME_BASE') {
            presentFactions = [loc.owner];
        } else {
            presentFactions = loc.possibleFactions || [FACTION_IDS.MASTERS_CIRCLE]; // Fallback
        }

        const generated = [];
        // Tier 1 (Novice) - Random faction from present
        generated.push(generateChampion(1, presentFactions[Math.floor(Math.random() * presentFactions.length)]));

        // Tier 2 (Adept) - Random faction
        generated.push(generateChampion(2, presentFactions[Math.floor(Math.random() * presentFactions.length)]));

        // Tier 3 (Master) - Random faction
        generated.push(generateChampion(3, presentFactions[Math.floor(Math.random() * presentFactions.length)]));

        setChampions(generated);
    }, [loc]);

    if (!loc) return <div>Location not found.</div>;

    const handleChallenge = (champ) => {
        onFight(champ);
    };

    return (
        <div className="screen container">
            <header style={{ borderBottom: '1px solid #444', paddingBottom: '10px', marginBottom: '20px' }}>
                <button onClick={onBack}>&larr; Back to Map</button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', float: 'right' }}>
                    <button onClick={onOpenCollection}>Manage Techniques</button>
                    <div>
                        <div>Lvl {state.player.level} {state.player.species}</div>
                        <div>{state.player.credits} Credits</div>
                    </div>
                </div>
                <h1>{loc.name}</h1>
                <p>{loc.description}</p>
                <div style={{ color: '#aaa', fontStyle: 'italic' }}>{loc.type === 'HOME_BASE' ? 'Faction Stronghold' : 'Contested Zone'}</div>
            </header>

            <h2>Available Opponents</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {champions.map((champ, i) => (
                    <div key={i} style={{ border: '1px solid #555', padding: '15px', borderRadius: '8px', background: '#222', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontWeight: 'bold', fontSize: '18px', color: champ.tier === 3 ? 'gold' : champ.tier === 2 ? 'silver' : 'white' }}>
                                {champ.name}
                            </div>
                            <div style={{ color: '#aaa' }}>Tier {champ.tier} | HP: {champ.stamina}</div>

                            {/* Learnable Techniques Preview */}
                            <div style={{ marginTop: '5px', fontSize: '12px', color: '#8f8' }}>
                                Potential Rewards:
                                {(() => {
                                    const learnable = champ.loadout.filter(id => !state.player.collection.includes(id));
                                    if (learnable.length === 0) return <span style={{ color: '#777' }}> None (All known)</span>;

                                    return (
                                        <span style={{ color: 'cyan' }}>
                                            {learnable.map((id, idx) => (
                                                <React.Fragment key={idx}>
                                                    {idx > 0 && ", "}
                                                    <TooltippedName techniqueId={id} color="cyan" />
                                                </React.Fragment>
                                            ))}
                                        </span>
                                    );
                                })()}
                            </div>
                        </div>
                        <button
                            onClick={() => handleChallenge(champ)}
                            style={{
                                padding: '10px 20px',
                                background: champ.tier === 3 ? 'orange' : champ.tier === 2 ? 'cornflowerblue' : '#444',
                                border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer'
                            }}
                        >
                            Challenge
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
