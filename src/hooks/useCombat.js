
import { useState, useEffect } from 'react';
import { TECHNIQUES, CARD_TYPES } from '../data/techniques';

// Helper: Shuffle
const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;
    const newArr = [...array];
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [newArr[currentIndex], newArr[randomIndex]] = [newArr[randomIndex], newArr[currentIndex]];
    }
    return newArr;
};

export const PHASES = {
    TECHNIQUE: 'TECHNIQUE',
    CHANNEL: 'CHANNEL',
    ENEMY_TURN: 'ENEMY_TURN',
    RESOLUTION: 'RESOLUTION',
    CLEANUP: 'CLEANUP'
};

export function useCombat(playerStats, playerLoadout, enemyData, onCombatEnd) {
    // Combat State
    const [turn, setTurn] = useState(1);
    const [phase, setPhase] = useState(PHASES.TECHNIQUE);
    const [log, setLog] = useState([]);

    // Species Logic
    const species = playerStats.species;
    const handSize = species === 'Grankiki' ? 6 : 5;
    const isUnmoored = species === 'Unmoored';

    // --- Player State ---
    const [playerStamina, setPlayerStamina] = useState(playerStats.stamina || 10);
    const [deck, setDeck] = useState([]);
    const [hand, setHand] = useState([]);
    const [discard, setDiscard] = useState([]);
    const [played, setPlayed] = useState([]); // Cards played this turn

    // Resources
    const [actions, setActions] = useState(1);
    const [channels, setChannels] = useState(1); // Default 1 buy per turn
    const [spirit, setSpirit] = useState(0);
    const [defense, setDefense] = useState(0);
    const [damageDealt, setDamageDealt] = useState(0);

    // Refine State
    const [refinePending, setRefinePending] = useState(0); // Number of cards to refine

    // Supply State
    const [playerSupply, setPlayerSupply] = useState({});
    const [enemySupply, setEnemySupply] = useState({});

    // --- Enemy State ---
    const [enemyStamina, setEnemyStamina] = useState(enemyData.stamina || 20);
    const [enemyDeck, setEnemyDeck] = useState([]);
    const [enemyHand, setEnemyHand] = useState([]);
    const [enemyLastPlayed, setEnemyLastPlayed] = useState([]);
    const [enemyLastBought, setEnemyLastBought] = useState([]);
    const [enemyDiscard, setEnemyDiscard] = useState([]);
    const [enemyDefense, setEnemyDefense] = useState(0);
    const [enemyDamage, setEnemyDamage] = useState(0); // Actual queued damage from cards
    const [enemyIntent, setEnemyIntent] = useState({ description: 'Waiting...' });

    // --- Init ---
    useEffect(() => {
        // Deck Setup (Shared Starter)
        const starterList = ['focus', 'focus', 'focus', 'focus', 'focus', 'focus', 'focus', 'misstep', 'misstep', 'misstep'];

        // Player Init
        const pShuffled = shuffle([...starterList]);
        setDeck(pShuffled.slice(handSize));
        setHand(pShuffled.slice(0, handSize));

        // Enemy Init
        let enemyStarter = ['focus', 'focus', 'focus', 'focus', 'focus', 'focus', 'focus', 'misstep', 'misstep', 'misstep'];
        // Note: Rules say Species modifiers apply to Player only? Or Enemy too?
        // Unmoored rule says "Opponent starts with 2 addl Missteps".
        if (species === 'Unmoored') {
            enemyStarter.push('misstep', 'misstep');
        }
        const eShuffled = shuffle(enemyStarter);
        setEnemyDeck(eShuffled.slice(5)); // Enemy always draws 5? Yes standard rules apply to enemy.
        setEnemyHand(eShuffled.slice(0, 5));

        // Supply Init
        const initSupply = (selectedIds) => {
            const s = {};
            ['focus', 'momentum', 'mastery'].forEach(id => s[id] = 100); // Infinite resources
            if (selectedIds && selectedIds.length > 0) selectedIds.forEach(id => s[id] = 10);
            else['jab', 'block', 'center'].forEach(id => s[id] = 10);
            return s;
        };

        setPlayerSupply(initSupply(playerLoadout));
        // Hardcoded Enemy Supply for now (General + specific)
        const eLoadout = enemyData.loadout && enemyData.loadout.length > 0
            ? enemyData.loadout
            : ['jab', 'block', 'flying_kick']; // Fallback

        console.log('eLoadout', eLoadout);

        setEnemySupply(initSupply(eLoadout));

        setLog(l => [...l, `Combat vs ${enemyData.name || 'Enemy'} Started.`]);
    }, []);

    const addLog = (msg) => setLog(prev => [...prev, msg]);

    // --- Helper: Draw ---
    const drawCardsRef = (count, currentDeck, currentDiscard, currentHand) => {
        let d = [...currentDeck];
        let disc = [...currentDiscard];
        let h = [...currentHand];

        for (let i = 0; i < count; i++) {
            if (d.length === 0) {
                if (disc.length === 0) break;
                d = shuffle(disc);
                disc = [];
            }
            h.push(d.pop());
        }
        return { deck: d, discard: disc, hand: h };
    };

    // --- Actions ---

    // Focus Catchup Mechanic
    const playFocusReload = () => {
        if (playerStamina >= enemyStamina) {
            addLog("Stamina not lower than enemy.");
            return;
        }
        // Discard all Focus
        const newHand = [];
        const discardedCount = hand.filter(id => id === 'focus').length;
        const keptCards = hand.filter(id => id !== 'focus');

        if (discardedCount === 0) return;

        setDiscard(d => [...d, ...Array(discardedCount).fill('focus')]);

        // Redraw that many
        const res = drawCardsRef(discardedCount, deck, discard, keptCards);
        setDeck(res.deck);
        setDiscard(res.discard);
        setHand(res.hand);

        addLog(`Focus Ability: Redrew ${discardedCount} cards.`);
    };

    const playCard = (cardId, index) => {
        if (phase !== PHASES.TECHNIQUE && phase !== PHASES.CHANNEL) return;
        if (refinePending > 0) return; // Must finish refining first

        const def = TECHNIQUES.find(c => c.id === cardId);
        if (!def) return;

        // Validation
        if (def.type === CARD_TYPES.TECHNIQUE && phase !== PHASES.TECHNIQUE) { addLog("Techniques only in Technique Phase."); return; }
        if (def.type === CARD_TYPES.RESOURCE && phase !== PHASES.CHANNEL) { addLog("Resources only in Channel Phase."); return; }
        if (def.type === CARD_TYPES.TECHNIQUE && actions < 1) { addLog("Not enough Actions."); return; }

        // Cost
        if (def.type === CARD_TYPES.TECHNIQUE) setActions(a => a - 1);

        // Remove from hand immediately
        const newHand = [...hand];
        newHand.splice(index, 1);

        // Effects
        const effects = def.effects || {};
        if (effects.actions) setActions(p => p + effects.actions);
        if (effects.spirit) setSpirit(p => p + effects.spirit);
        if (effects.defense) setDefense(p => p + effects.defense);
        if (effects.damage) setDamageDealt(p => p + effects.damage);
        if (effects.channels) setChannels(p => p + effects.channels); // Channel Limit Rule
        if (effects.heal) setPlayerStamina(p => p + effects.heal);

        if (def.value) setSpirit(p => p + def.value);

        if (effects.draw) {
            const res = drawCardsRef(effects.draw, deck, discard, newHand);
            setDeck(res.deck);
            setDiscard(res.discard);
            // setHand(res.hand); -> Wait, need to check for Refine state first
            // If refine is triggered, we set pending.
            // If Refine comes AFTER draw (e.g. Draw 1, Refine 1), we generally want to see the new card.
            // Assuming effects happen in order, but simpler to just set state.
            setHand(res.hand);
        } else {
            setHand(newHand);
        }

        if (effects.refine) {
            setRefinePending(effects.refine);
            addLog(`Select ${effects.refine} card(s) to Refine.`);
        }

        if (effects.add_misstep) {
            // Pollute Enemy
            setEnemyDiscard(ed => [...ed, ...Array(effects.add_misstep).fill('misstep')]);
            addLog(`Sent ${effects.add_misstep} Missteps to opponent!`);
        }

        setPlayed(p => [...p, cardId]);
        addLog(`Played ${def.name}`);
    };

    const refineCard = (index) => {
        if (refinePending <= 0) return;

        const cardToTrash = hand[index];
        const newHand = [...hand];
        newHand.splice(index, 1);
        setHand(newHand);

        // It is trashed (not discard), so just gone.
        addLog(`Refined (Trashed) ${TECHNIQUES.find(c => c.id === cardToTrash)?.name}`);
        setRefinePending(p => p - 1);
    };

    const skipRefine = () => {
        setRefinePending(0);
        addLog("Refining skipped.");
    };

    const buyCard = (cardId) => {
        if (phase !== PHASES.CHANNEL) return;
        const def = TECHNIQUES.find(c => c.id === cardId);

        // Validation: Spirit AND Channels
        if (!def || spirit < def.cost || playerSupply[cardId] < 1) return;
        if (channels < 1) { addLog("No Channel buys remaining."); return; }

        setSpirit(s => s - def.cost);
        setChannels(c => c - 1); // Decrement Channel Limit
        setPlayerSupply(s => ({ ...s, [cardId]: s[cardId] - 1 }));
        setDiscard(d => [...d, cardId]);
        addLog(`Bought ${def.name}`);
    };

    const advancePhase = () => {
        if (refinePending > 0) { addLog("Must finish refining first."); return; }
        if (phase === PHASES.TECHNIQUE) {
            setPhase(PHASES.CHANNEL);
        }
    };

    // --- Turn Management via Effects ---
    useEffect(() => {
        if (phase === PHASES.ENEMY_TURN) {
            const timer = setTimeout(() => {
                processEnemyTurn();
            }, 500);
            return () => clearTimeout(timer);
        }
        if (phase === PHASES.RESOLUTION) {
            const timer = setTimeout(() => {
                resolveCombat();
            }, 1000);
            return () => clearTimeout(timer);
        }
        if (phase === PHASES.CLEANUP) {
            const timer = setTimeout(() => {
                cleanupPhase();
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [phase]);
    // Note: We need to omit dependencies like 'processEnemyTurn' if they change every render, or wrap them in useCallback.
    // Ideally, we move the logic inside the effect or use refs for mutable state.
    // Given the complexity, let's keep the functions but ensure they rely on CURRENT state by not chaining them in specific closures, 
    // but allowing the re-render to trigger the next effect.
    // BUT: 'processEnemyTurn' depends on 'enemyHand', which changes.
    // We need to be careful not to trigger infinite loops. 'phase' check protects us.

    // --- Actions ---
    const endPlayerTurn = () => {
        setPhase(PHASES.ENEMY_TURN);
    };

    // --- AI Logic ---
    const processEnemyTurn = () => {
        addLog("Enemy acting...");

        // Debug: Log Hand
        //const handNames = enemyHand.map(id => TECHNIQUES.find(c => c.id === id)?.name || id).join(', ');
        //addLog(`Enemy Hand: ${handNames}`);

        // 1. Play Resources & Calc Spirit
        let eHand = [...enemyHand];
        let ePlayed = [];
        let eSpirit = 0;
        let eActions = 1;
        let eChannels = 1;
        let eDefense = 0;
        let eDamage = 0;

        // Local state for Deck/Discard to support Drawing
        let localDeck = [...enemyDeck];
        let localDiscard = [...enemyDiscard];

        const aiDraw = (count) => {
            const res = drawCardsRef(count, localDeck, localDiscard, []);
            localDeck = res.deck;
            localDiscard = res.discard;
            return res.hand;
        };

        // Priority Scoring Helper
        const getPriorityScore = (def) => {
            let v = 0;
            if (def.effects?.actions) v += 100; // Best: Gain actions to do more
            if (def.effects?.damage) v += 10;   // Next: Damage
            if (def.effects?.add_misstep) v += 5;
            if (def.effects?.defense) v += 1;
            return v;
        };

        const prioritySort = (a, b) => {
            const defA = TECHNIQUES.find(c => c.id === a);
            const defB = TECHNIQUES.find(c => c.id === b);
            if (!defA || !defB) return 0;

            // Push Resources to start (bottom)
            if (defA.type !== CARD_TYPES.TECHNIQUE && defB.type === CARD_TYPES.TECHNIQUE) return -1;
            if (defA.type === CARD_TYPES.TECHNIQUE && defB.type !== CARD_TYPES.TECHNIQUE) return 1;
            if (defA.type !== CARD_TYPES.TECHNIQUE) return 0;

            return getPriorityScore(defA) - getPriorityScore(defB); // Ascending
        };

        // 2. Play Techniques (Dynamic Loop)
        while (eActions > 0) {
            // Sort to find best available
            eHand.sort(prioritySort);

            let bestIdx = -1;
            // Find last TECHNIQUE
            for (let i = eHand.length - 1; i >= 0; i--) {
                const def = TECHNIQUES.find(c => c.id === eHand[i]);
                if (def && def.type === CARD_TYPES.TECHNIQUE) {
                    bestIdx = i;
                    break;
                }
            }

            if (bestIdx === -1) break; // No techniques left

            const cId = eHand[bestIdx];
            const def = TECHNIQUES.find(c => c.id === cId);

            // Execute
            eActions--;
            eActions += (def.effects?.actions || 0);
            eDefense += (def.effects?.defense || 0);
            eDamage += (def.effects?.damage || 0);
            eChannels += (def.effects?.channels || 0);
            eSpirit += (def.effects?.spirit || 0);

            // Effects
            if (def.effects?.draw) {
                const drawn = aiDraw(def.effects.draw);
                eHand.push(...drawn);
                addLog(`Enemy drew ${def.effects.draw} card(s).`);
            }
            if (def.effects?.spirit) {
                addLog(`Enemy gained ${def.effects.spirit} Spirit.`);
            }
            if (def.effects?.add_misstep) {
                setDiscard(d => [...d, ...Array(def.effects.add_misstep).fill('misstep')]);
                addLog(`Enemy sent ${def.effects.add_misstep} Missteps!`);
            }
            if (def.effects?.heal) {
                setEnemyStamina(s => s + def.effects.heal);
                addLog(`Enemy healed ${def.effects.heal} HP.`);
            }
            if (def.effects?.refine) {
                let toRefine = def.effects.refine;
                for (let r = 0; r < toRefine; r++) {
                    const badIdx = eHand.findIndex(id => id === 'misstep');
                    if (badIdx >= 0) eHand.splice(badIdx, 1);
                    else {
                        const focusIdx = eHand.findIndex(id => id === 'focus');
                        if (focusIdx >= 0) eHand.splice(focusIdx, 1);
                    }
                }
            }

            ePlayed.push(cId);
            eHand.splice(bestIdx, 1);
            addLog(`Enemy played ${def.name}`);
        }

        // 3. Play Resources
        for (let i = eHand.length - 1; i >= 0; i--) {
            const cId = eHand[i];
            const def = TECHNIQUES.find(c => c.id === cId);
            if (def && def.type === CARD_TYPES.RESOURCE) {
                eSpirit += (def.value || 0);
                ePlayed.push(cId);
                eHand.splice(i, 1);
            }
        }

        // Buy Cards
        let boughtCards = [];
        const affordable = Object.keys(enemySupply).filter(id => {
            const cost = TECHNIQUES.find(c => c.id === id)?.cost || 99;
            return enemySupply[id] > 0 && cost <= eSpirit;
        });

        if (affordable.length > 0 && eChannels > 0) {
            // AI Assessment Check
            const maxLoadoutCost = enemyData.loadout?.reduce((max, id) => {
                const c = TECHNIQUES.find(t => t.id === id);
                return Math.max(max, c?.cost || 0);
            }, 0) || 0;
            const aiStrategy = maxLoadoutCost >= 6 ? 'RAMP' : 'AGGRO';
            console.log('aiStrategy', aiStrategy);

            // Only log on turn 1 (heuristically checking log length or turn count passed in state? 
            // We don't have turn count in this scope easily without prop drill or state read. 
            // 'turn' is state. Let's just log it if we buy.)

            const getBuyScore = (def) => {
                let score = def.cost || 0;

                if (aiStrategy === 'RAMP') {
                    // Prioritize getting rich, then buying big guns
                    if (def.cost >= 6 && def.effects?.damage) return score + 200; // The Goal
                    if (def.type === CARD_TYPES.RESOURCE || def.effects?.spirit > 0) return score + 100; // The Engine

                    // Survival while Ramping
                    if (def.effects?.heal > 0) return score + 75;
                    if (def.effects?.defense > 0) return score + 50;

                    // Avoid cheap damage clogging the deck
                    if (def.effects?.damage) return score + 10;
                } else {
                    // AGGRO: Buy any damage available
                    if (def.effects?.damage > 0) score += 30;
                    if (def.type === CARD_TYPES.RESOURCE || def.effects?.spirit > 0) score += 15;
                }

                // Tie-breaker: offense utility
                if (def.effects?.add_misstep > 0) score += 5;
                return score;
            };

            affordable.sort((a, b) => {
                const defA = TECHNIQUES.find(c => c.id === a);
                const defB = TECHNIQUES.find(c => c.id === b);
                return getBuyScore(defB) - getBuyScore(defA);
            });

            const buyId = affordable[0];
            const cardDef = TECHNIQUES.find(c => c.id === buyId);
            eSpirit -= cardDef.cost;
            eChannels--;
            setEnemySupply(s => ({ ...s, [buyId]: s[buyId] - 1 }));
            // We track bought cards locally to ensure they are included in the immediate redraw
            boughtCards.push(buyId);
            //addLog(`Enemy (${aiStrategy}) bought ${cardDef.name}`);
        }

        // Set Computed Results for Resolution
        setEnemyDamage(eDamage);
        setEnemyDefense(eDefense);

        // Discard Hand & Draw New
        // IMPORTANT: Use localDeck and localDiscard which reflect changes during the turn (e.g. draws)

        // The pile valid for next turn includes whatever was in discard, plus what was played/held/bought this turn.
        const finalDiscardPool = [...localDiscard, ...ePlayed, ...eHand, ...boughtCards];

        // New Deck generation:
        const drawRes = drawCardsRef(5, localDeck, finalDiscardPool, []);

        // Update all state
        setEnemyDeck(drawRes.deck);
        setEnemyDiscard(drawRes.discard);
        setEnemyHand(drawRes.hand);

        // History for UI
        setEnemyLastPlayed(ePlayed);
        setEnemyLastBought(boughtCards);

        // Transition
        setPhase(PHASES.RESOLUTION);
    };

    const resolveCombat = () => {
        // Use State values, which should be updated by now (render cycle occurred)
        //addLog(`DEBUG: PlayerDmg: ${damageDealt} vs Def: ${enemyDefense} | EnemyDmg: ${enemyDamage} vs Def: ${defense}`);
        const netPlayerDmg = Math.max(0, damageDealt - enemyDefense);
        const netEnemyDmg = Math.max(0, enemyDamage - defense);

        const newEH = enemyStamina - netPlayerDmg;
        const newPH = playerStamina - netEnemyDmg;

        setEnemyStamina(newEH);
        setPlayerStamina(newPH);
        addLog(`Resolution: You dealt ${netPlayerDmg}, took ${netEnemyDmg}.`);

        if (newEH <= 0) { onCombatEnd(true, log); return; }
        if (newPH <= 0) { onCombatEnd(false, log); return; }

        setPhase(PHASES.CLEANUP);
    };

    const cleanupPhase = () => {
        setPhase(PHASES.TECHNIQUE);
        setTurn(t => t + 1);

        // Reset Player Action Stats
        setActions(1);
        setChannels(1);
        setSpirit(0);
        setDefense(0);
        setDamageDealt(0);

        const allDiscard = [...discard, ...hand, ...played];
        const res = drawCardsRef(handSize, deck, allDiscard, []);
        setDeck(res.deck);
        setDiscard(res.discard);
        setHand(res.hand);
        setPlayed([]);

        // Reset Enemy Visuals
        setEnemyDefense(0);
        setEnemyDamage(0);

        addLog(`>> Turn ${turn + 1}`);
    };

    return {
        state: {
            deck, hand, discard, played, playerSupply,
            actions, spirit, defense, damageDealt, refinePending,
            channels, // Expose for UI
            phase, log,
            playerStamina,
            enemyStamina, enemyDeck, enemyHand, enemyDefense, enemyDamage,
            enemyLastPlayed, enemyLastBought
        },
        actions: { playCard, buyCard, advancePhase, endPlayerTurn, refineCard, skipRefine, playFocusReload }
    };
}
