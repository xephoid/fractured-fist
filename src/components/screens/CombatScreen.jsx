import React, { useState } from 'react';
import { useCampaign } from '../../context/CampaignContext';
import { useCombat, PHASES } from '../../hooks/useCombat';
import { TECHNIQUES, CARD_TYPES } from '../../data/techniques';
import TooltippedName from '../common/TooltippedName';
import LogLine from '../common/LogLine';
import GameRulesModal from '../common/GameRulesModal';

const typeDisplay = {
    [CARD_TYPES.RESOURCE]: 'SPIRIT',
    [CARD_TYPES.MISSTEP]: 'MISSTEP',
    [CARD_TYPES.TECHNIQUE]: 'TECHNIQUE'
};
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
            <div style={{ fontWeight: 'bold', overflow: 'hidden' }}>{def.name}</div>
            <div style={{ fontSize: '8px', color: '#aaa' }}>{typeDisplay[def.type]}</div>
            {showCost && <div style={{ position: 'absolute', top: 2, right: 2, background: 'blue', padding: '1px 3px', borderRadius: '3px' }}>{def.cost}</div>}
            <div style={{ marginTop: '4px', lineHeight: '1.1' }}>{def.description}</div>
            {count !== undefined && <div style={{ position: 'absolute', bottom: 2, right: 2, background: '#444', padding: '1px 3px' }}>x{count}</div>}
        </div>
    );
};

const GlossaryModal = ({ onClose }) => {
    return (
        <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,1)',
            zIndex: 100,
            maxWidth: '600px',
            margin: 'auto',
            padding: '30px',
            borderRadius: '6px',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
        }}>
            <h2 style={{ textAlign: 'center', margin: '0' }}>Card Anatomy</h2>
            <div style={{ textAlign: 'center' }}>
                <img src="card-anatomy.png" alt="Card Anatomy" />
            </div>
            <h2 style={{ marginBottom: '0', textAlign: 'center' }}>Glossary</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '120px auto' }}>
                    <div><strong>+X Tech</strong></div>
                    <div>Play X technique card(s).</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '120px auto' }}>
                    <div><strong>+X Spirit</strong></div>
                    <div>Gain X spirit point(s) which can be used to channel cards.</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '120px auto' }}>
                    <div><strong>+X Misstep</strong></div>
                    <div>Add X misstep(s) to the opponent's discard.</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '120px auto' }}>
                    <div><strong>+X Refine</strong></div>
                    <div>Trash X card(s) from your hand. These cards are removed from the game.</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '120px auto' }}>
                    <div><strong>+X Draw</strong></div>
                    <div>Draw X card(s) from your deck.</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '120px auto' }}>
                    <div><strong>+X Channel</strong></div>
                    <div>Add X channel(s) during your channeling phase. Each channel allows you to buy one card with spirit.</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '120px auto' }}>
                    <div><strong>+X Damage</strong></div>
                    <div>Deal X damage to the opponent. Resolves at the end of the round.</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '120px auto' }}>
                    <div><strong>+X Defense</strong></div>
                    <div>Gain X defense points. Resolves against opponent's damage at the end of the round.</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '120px auto' }}>
                    <div><strong>+X Stamina</strong></div>
                    <div>Gain X stamina points.</div>
                </div>
            </div>

            <h2 style={{ margin: '25px 0 10px', textAlign: 'center' }}>Card resolution order</h2>
            <ol style={{ margin: '0 0 25px' }}>
                <li>Add spirit, channels, damage, defense, stamina</li>
                <li>Draw cards</li>
                <li>Refine hand</li>
                <li>Add missteps</li>
                <li>Play techniques</li>
            </ol>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default function CombatScreen({ onFinish, enemyData }) {
    const { state } = useCampaign();
    // Fallback if testing directly?
    const enemy = enemyData || { stamina: 20, loadout: [], name: "Training Dummy" };

    const { state: cs, actions } = useCombat(state.player, state.player.loadout, enemy, onFinish);
    const [showGlossary, setShowGlossary] = useState(false);
    const [showRules, setShowRules] = useState(false);

    const isTechniquePhase = cs.phase === PHASES.TECHNIQUE;
    const isChannelPhase = cs.phase === PHASES.CHANNEL;
    const isRefining = cs.refinePending > 0;

    // Focus Catchup Condition
    const canReloadFocus = cs.hand.some(id => id === 'focus') && cs.playerStamina < cs.enemyStamina;
    const canPlayAllResources = cs.hand.some(id => TECHNIQUES.find(c => c.id === id).type === CARD_TYPES.RESOURCE);
    return (
        <div className="screen container" style={{ height: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
            {showGlossary && <GlossaryModal onClose={() => setShowGlossary(false)} />}
            {showRules && <GameRulesModal setShowRules={setShowRules} />}
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
                    <h3 style={{ margin: 0 }}>{enemy.name}</h3>
                    <div>Stamina: {cs.enemyStamina}</div>
                    <div style={{ fontSize: '12px', color: '#aaa' }}>
                        Deck: {cs.enemyDeck.length} | Hand: {cs.enemyHand.length}
                    </div>
                    <div>
                        <strong>Def: {cs.enemyDefense}</strong> | <span style={{ color: 'orange' }}>Dmg: {cs.enemyDamage}</span>
                    </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <h2>{cs.phase} Phase</h2>
                    {cs.phase === PHASES.TECHNIQUE && (
                        <div>
                            Click the <strong>technique</strong> card from your hand to use it.
                        </div>
                    )}
                    {cs.phase === PHASES.CHANNEL && (
                        <div>
                            Click the <strong style={{ color: 'yellow' }}>spirit</strong> card(s) you want to spend from your hand, <br />then click the <strong>techneque</strong> or <strong style={{ color: 'yellow' }}>spirit</strong> card you want to channel from your available techniques.
                        </div>
                    )}
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
            <div style={{ flex: 2, display: 'flex', borderBottom: '1px solid #444' }}>
                {/* Log */}
                <div style={{ width: '200px', height: '310px', borderRight: '1px solid #333', overflowY: 'scroll', fontSize: '11px', padding: '5px', color: '#ccc' }}>
                    {cs.log.slice().reverse().map((l, i) => <LogLine key={i} text={l} />)}
                </div>

                {/* Supply */}
                <div style={{ flex: 1, padding: '10px', overflowX: 'auto' }}>
                    <small>Your Available Techniques ({cs.spirit} Spirit) | <strong>Channels Left: {cs.channels}</strong></small>
                    <div style={{ display: 'flex', flexFlow: 'wrap', gap: '5px', marginTop: '5px' }}>
                        {Object.keys(cs.playerSupply).map(id => (
                            <Card
                                key={id}
                                cardId={id}
                                count={cs.playerSupply[id]}
                                showCost
                                disabled={!isChannelPhase || cs.spirit < (TECHNIQUES.find(t => t.id === id)?.cost || 0) || cs.channels < 1 || cs.playerSupply[id] < 1}
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
                        <h3 style={{ margin: 0 }}>{state.player.name} Level {state.player.level} {state.player.species}</h3>
                        <strong>Stamina: <span style={{ transition: 'color 2s ease', color: cs.tookDamage ? 'red' : 'white' }}>{cs.playerStamina}</span></strong> |
                        Tech: {cs.actions} | Spirit: {cs.spirit} | Def: {cs.defense} | Dmg: {cs.damageDealt}
                    </div>
                    <div>
                        <button style={{ marginRight: '10px', background: '#444', color: 'white' }} onClick={() => { window.scrollTo(0, 0); setShowRules(true) }}>Rules</button>
                        <button style={{ marginRight: '10px', background: '#444', color: 'white' }} onClick={() => { window.scrollTo(0, 0); setShowGlossary(true) }}>Quick Reference</button>
                        {isTechniquePhase && (
                            <button onClick={actions.advancePhase} style={{ background: cs.actions === 0 ? 'gold' : '#000', color: 'white' }}>
                                Pass To Channel Phase &rarr;
                            </button>
                        )}
                        {isChannelPhase && (
                            <button onClick={actions.endPlayerTurn} style={{ background: 'green' }}>
                                End Turn &rarr;
                            </button>
                        )}
                    </div>
                </div>

                <div style={{ display: 'flex', flex: 2, gap: '10px', overflow: 'hidden', flexFlow: 'wrap' }}>
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
                    <div style={{ flex: 1, background: '#1a1a1a', borderRadius: '4px', padding: '10px', display: 'flex', gap: '5px', overflowX: 'auto', flexWrap: 'wrap' }}>
                        <small style={{ width: '100%' }}>Your Hand</small>
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
                        {canReloadFocus && isTechniquePhase && (
                            <div style={{ width: '100px', height: '130px' }}>
                                <button onClick={actions.playFocusReload} style={{ marginRight: '10px', background: 'black', color: 'white' }}>
                                    Discard All Focus And Draw {cs.hand.filter(c => c === 'focus').length} New Cards
                                </button>
                            </div>
                        )}
                        {isChannelPhase && canPlayAllResources && (
                            <div style={{ width: '100px', height: '130px' }}>
                                <button onClick={() => actions.playAllResources()} style={{ marginRight: '10px', background: 'black', color: 'white' }}>
                                    Spend All Spirit
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div style={{ fontSize: '10px', color: '#555', marginTop: '2px' }}>Deck: {cs.deck.length} | Discard: {cs.discard.length}</div>
            </div>
        </div>
    );
}
