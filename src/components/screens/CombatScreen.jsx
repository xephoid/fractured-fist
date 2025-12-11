import React from 'react';
import { useCampaign } from '../../context/CampaignContext';
import { useCombat, PHASES } from '../../hooks/useCombat';
import { TECHNIQUES, CARD_TYPES } from '../../data/techniques';
import TooltippedName from '../common/TooltippedName';
import LogLine from '../common/LogLine';

// Reusable Card
const Card = ({ cardId, onClick, disabled, count, showCost, highlight }) => {
    const def = TECHNIQUES.find(c => c.id === cardId);
    if (!def) return <div className="card unknown">?</div>;

    const borderColor = highlight ? 'cyan' :
        def.type === CARD_TYPES.RESOURCE ? 'gold' :
            def.type === CARD_TYPES.MISSTEP ? 'purple' : 'white';

    return (
        <div
            onClick={!disabled ? onClick : undefined}
            style={{
                width: '100px', height: '130px',
                border: `2px solid ${borderColor}`,
                borderRadius: '6px',
                backgroundColor: '#222',
                padding: '4px',
                fontSize: '10px',
                position: 'relative',
                opacity: disabled ? 0.5 : 1,
                cursor: disabled ? 'default' : 'pointer',
                flexShrink: 0
            }}
        >
            <div style={{ fontWeight: 'bold', overflow: 'hidden', whiteSpace: 'nowrap' }}>{def.name}</div>
            <div style={{ fontSize: '8px', color: '#aaa' }}>{def.type}</div>
            {showCost && <div style={{ position: 'absolute', top: 2, right: 2, background: 'blue', padding: '1px 3px', borderRadius: '3px' }}>{def.cost}</div>}
            <div style={{ marginTop: '4px', lineHeight: '1.1' }}>{def.description}</div>
            {count !== undefined && <div style={{ position: 'absolute', bottom: 2, right: 2, background: '#444', padding: '1px 3px' }}>x{count}</div>}
        </div>
    );
};

export default function CombatScreen({ onFinish, enemyData }) {
    const { state } = useCampaign();
    // Fallback if testing directly?
    const enemy = enemyData || { stamina: 20, loadout: [], name: "Training Dummy" };

    const { state: cs, actions } = useCombat(state.player, state.player.loadout, enemy, onFinish);

    const isTechniquePhase = cs.phase === PHASES.TECHNIQUE;
    const isChannelPhase = cs.phase === PHASES.CHANNEL;
    const isRefining = cs.refinePending > 0;

    // Focus Catchup Condition
    const canReloadFocus = cs.hand.some(id => id === 'focus') && cs.playerStamina < cs.enemyStamina;

    return (
        <div className="screen container" style={{ height: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>

            {/* MODAL OVERLAY */}
            {isRefining && (
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 100,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                }}>
                    <h2>Select Card to REFINE (Trash)</h2>
                    <div style={{ marginBottom: '20px' }}>Pending: {cs.refinePending}</div>
                    <div style={{ display: 'flex', gap: '10px', maxWidth: '90%', overflowX: 'auto', padding: '10px' }}>
                        {cs.hand.map((id, i) => (
                            <Card key={i} cardId={id} onClick={() => actions.refineCard(i)} highlight />
                        ))}
                    </div>
                    <button
                        onClick={actions.skipRefine}
                        style={{ marginTop: '20px', padding: '10px 20px', background: '#444', color: 'white', border: '1px solid #777' }}
                    >
                        Skip Refining
                    </button>
                </div>
            )}

            {/* Top: Enemy Stats */}
            <div style={{ flex: 1, borderBottom: '1px solid #444', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h3 style={{ margin: 0 }}>Enemy</h3>
                    <div>HP: {cs.enemyStamina}</div>
                    <div style={{ fontSize: '12px', color: '#aaa' }}>
                        Deck: {cs.enemyDeck.length} | Hand: {cs.enemyHand.length}
                    </div>
                    <div>
                        <strong>Def: {cs.enemyDefense}</strong> | <span style={{ color: 'orange' }}>Inc Dmg: {cs.enemyDamage}</span>
                    </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <h2>{cs.phase}</h2>
                    {cs.phase === PHASES.RESOLUTION && (
                        <div style={{ color: 'orange' }}>
                            Enemy Damage: {cs.enemyDamage} | Enemy Defense: {cs.enemyDefense}
                        </div>
                    )}
                </div>
            </div>

            {/* Enemy History */}
            {(cs.enemyLastPlayed?.length > 0 || cs.enemyLastBought?.length > 0) && (
                <div style={{ background: '#222', padding: '4px 10px', fontSize: '11px', color: '#aaa', borderBottom: '1px solid #444', display: 'flex', gap: '20px' }}>
                    {cs.enemyLastPlayed?.length > 0 && (
                        <span>
                            Last Played: <span style={{ color: 'white' }}>
                                {cs.enemyLastPlayed.map((id, i) => (
                                    <React.Fragment key={i}>
                                        {i > 0 && ", "}
                                        <TooltippedName techniqueId={id} color="white" />
                                    </React.Fragment>
                                ))}
                            </span>
                        </span>
                    )}
                    {cs.enemyLastBought?.length > 0 && (
                        <span>
                            Bought: <span style={{ color: 'gold' }}>
                                {cs.enemyLastBought.map((id, i) => (
                                    <React.Fragment key={i}>
                                        {i > 0 && ", "}
                                        <TooltippedName techniqueId={id} color="gold" />
                                    </React.Fragment>
                                ))}
                            </span>
                        </span>
                    )}
                </div>
            )}

            {/* Middle: Log & Supply */}
            <div style={{ flex: 2, display: 'flex', overflow: 'hidden', borderBottom: '1px solid #444' }}>
                {/* Log */}
                <div style={{ width: '200px', borderRight: '1px solid #333', overflowY: 'auto', fontSize: '11px', padding: '5px', color: '#ccc' }}>
                    {cs.log.slice().reverse().map((l, i) => <LogLine key={i} text={l} />)}
                </div>

                {/* Supply */}
                <div style={{ flex: '1 1 5%', padding: '10px', overflowX: 'auto' }}>
                    <small>Your Supply ({cs.spirit} Spirit) | <strong>Channels Left: {cs.channels}</strong></small>
                    <div style={{ display: 'flex', flexFlow: 'wrap', gap: '5px', marginTop: '5px' }}>
                        {Object.keys(cs.playerSupply).map(id => (
                            <Card
                                key={id}
                                cardId={id}
                                count={cs.playerSupply[id]}
                                showCost
                                disabled={!isChannelPhase || cs.spirit < (TECHNIQUES.find(t => t.id === id)?.cost || 0) || cs.channels < 1}
                                onClick={() => actions.buyCard(id)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom: Player Area */}
            <div style={{ flex: 3, padding: '10px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <div>
                        <strong>HP: {cs.playerStamina}</strong> |
                        Acts: {cs.actions} | Spirit: {cs.spirit} | Def: {cs.defense} | Dmg: {cs.damageDealt}
                    </div>
                    <div>
                        {canReloadFocus && (
                            <button onClick={actions.playFocusReload} style={{ marginRight: '10px', background: 'cyan', color: 'black' }}>
                                Redraw Focus
                            </button>
                        )}
                        {isTechniquePhase && (
                            <button onClick={actions.advancePhase} style={{ background: cs.actions === 0 ? 'gold' : '#000', color: 'white' }}>
                                To Channel &rarr;
                            </button>
                        )}
                        {isChannelPhase && (
                            <button onClick={actions.endPlayerTurn} style={{ background: 'green' }}>
                                End Turn &rarr;
                            </button>
                        )}
                    </div>
                </div>

                <div style={{ display: 'flex', flex: 1, gap: '10px', overflow: 'hidden' }}>
                    {/* Played Cards */}
                    <div style={{ width: '150px', background: '#2a2a2a', borderRadius: '4px', padding: '5px', overflowY: 'auto' }}>
                        <small>Played</small>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            {cs.played.map((id, i) => (
                                <div key={i} style={{ fontSize: '10px', color: '#aaa', borderBottom: '1px solid #333' }}>
                                    <TooltippedName techniqueId={id} color="#aaa" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Hand */}
                    <div style={{ flex: 1, background: '#1a1a1a', borderRadius: '4px', padding: '10px', display: 'flex', gap: '5px', overflowX: 'auto' }}>
                        {cs.hand.map((id, i) => {
                            const def = TECHNIQUES.find(t => t.id === id);
                            const isTech = def?.type === CARD_TYPES.TECHNIQUE;
                            const isRes = def?.type === CARD_TYPES.RESOURCE;
                            const canPlay = (isTechniquePhase && isTech && cs.actions > 0) || (isChannelPhase && isRes);

                            return (
                                <Card
                                    key={i}
                                    cardId={id}
                                    disabled={!canPlay || isRefining}
                                    onClick={() => actions.playCard(id, i)}
                                />
                            );
                        })}
                    </div>
                </div>
                <div style={{ fontSize: '10px', color: '#555', marginTop: '2px' }}>Deck: {cs.deck.length} | Discard: {cs.discard.length}</div>
            </div>
        </div>
    );
}
