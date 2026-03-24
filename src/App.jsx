import React, { useState, useEffect } from 'react';
import { CampaignProvider, useCampaign } from './context/CampaignContext';
import { LOCATIONS } from './data/locations';
import { track } from './services/analytics';
import StartScreen from './components/screens/StartScreen';
import WorldMap from './components/screens/WorldMap';
import CombatScreen from './components/screens/CombatScreen';
import LocationDetail from './components/screens/LocationDetail';
import CollectionScreen from './components/screens/CollectionScreen';
import RewardScreen from './components/screens/RewardScreen';
import DefeatScreen from './components/screens/DefeatScreen';
import { tierValues, levelUp, creditMap } from './data';

function App() {
    const { state, dispatch } = useCampaign();
    const [view, setView] = useState('START'); // START, MAP, LOCATION, COMBAT, COLLECTION, REWARD, DEFEAT
    const [activeLocation, setActiveLocation] = useState(null);
    const [activeEnemy, setActiveEnemy] = useState(null);
    const [rewardOptions, setRewardOptions] = useState([]);
    const [lastLog, setLastLog] = useState([]);

    useEffect(() => {
        // If state loaded and player has progress, maybe skip start?
        if (!state.loading && state.player.species) {
            setView('MAP');
        }
    }, [state.loading, state.player.species]);

    if (state.loading) return <div>Loading...</div>;

    const handleStart = () => setView('MAP');

    const handleSelectLocation = (locId) => {
        setActiveLocation(locId);
        setView('LOCATION');
    };

    const handleOpenCollection = () => {
        setView('COLLECTION');
    };

    const handleFight = (enemy) => {
        setActiveEnemy(enemy);
        setView('COMBAT');
    };

    const handleCombatFinish = (won, log) => {
        if (won) {
            // Calculate Rewards
            const tier = activeEnemy?.tier || 1;

            const xp = tierValues[tier] || 1;
            const credits = creditMap[tier] || 50;

            const { newLevel, newStamina } = levelUp(state.player, xp);

            track('combat_victory', {
                enemy_name: activeEnemy?.name,
                enemy_tier: tier,
                enemy_faction: activeEnemy?.factionId,
                location_id: activeLocation,
                xp_earned: xp,
                credits_earned: credits,
                leveled_up: state.player.level !== newLevel,
                new_level: newLevel,
                player_species: state.player.species,
            });

            if (state.player.level !== newLevel) {
                track('player_leveled_up', {
                    new_level: newLevel,
                    player_species: state.player.species,
                    stamina_increase: newStamina - state.player.stamina,
                });
            }

            dispatch({ type: 'GAIN_XP', payload: xp });
            dispatch({ type: 'ADD_CREDITS', payload: credits });
            dispatch({ type: 'DEFEAT_CHAMPION', payload: { locationId: activeLocation, championTier: tier } });

            if (tier > 2) {
                dispatch({ type: 'UPDATE_STANDING', payload: { factionKey: activeEnemy.factionId, amount: 1 } });
            }
            // Faction Politics
            // if (activeEnemy && activeEnemy.factionId && activeEnemy.tier >= 2) {
            //     const locDef = LOCATIONS.find(l => l.id === activeLocation);
            //     if (locDef && locDef.type === 'CONTESTED' && locDef.possibleFactions) {
            //         const enemyFaction = activeEnemy.factionId;
            //         const rivalFaction = locDef.possibleFactions.find(f => f !== enemyFaction);

            //         if (rivalFaction) {
            //             // Anger Enemy (-1)
            //             dispatch({ type: 'UPDATE_STANDING', payload: { factionKey: enemyFaction, amount: -1 } });
            //             // Please Rival (+1)
            //             dispatch({ type: 'UPDATE_STANDING', payload: { factionKey: rivalFaction, amount: 1 } });
            //         }
            //     }
            // }

            // Find techniques to learn - FILTERED
            let choices = [];
            if (activeEnemy && activeEnemy.loadout && activeEnemy.loadout.length > 0) {
                choices = activeEnemy.loadout.filter(id => !state.player.collection.includes(id));
            } else {
                // Fallback
                const fallback = ['flying_kick', 'mental_clarity', 'refining_stance'];
                choices = fallback.filter(id => !state.player.collection.includes(id));
            }

            setRewardOptions({
                techniques: choices,
                earnedXp: xp,
                earnedCredits: credits,
                leveledUp: state.player.level !== newLevel,
                newLevel,
                hpIncrease: newStamina - state.player.stamina,
            });
            setView('REWARD');
        } else {
            track('combat_defeat', {
                enemy_name: activeEnemy?.name,
                enemy_tier: activeEnemy?.tier,
                enemy_faction: activeEnemy?.factionId,
                location_id: activeLocation,
                player_species: state.player.species,
            });
            setLastLog(log || []);
            setView('DEFEAT');
        }
    };

    const handleSelectReward = (techId) => {
        track('technique_learned', {
            technique_id: techId,
            enemy_name: activeEnemy?.name,
            enemy_tier: activeEnemy?.tier,
        });
        dispatch({ type: 'UNLOCK_TECHNIQUE', payload: techId });
        setView('COLLECTION');
    };

    const handleResetGame = () => {
        track('new_game_started', { player_species: state.player.species });
        dispatch({ type: 'RESET_GAME' });
        setView('START');
    };

    return (
        <>
            {view === 'START' && <StartScreen onStart={handleStart} />}
            {view === 'MAP' && <WorldMap onSelectLocation={handleSelectLocation} onOpenCollection={handleOpenCollection} onResetGame={handleResetGame} />}
            {view === 'LOCATION' && <LocationDetail locationId={activeLocation} onBack={() => { setActiveLocation(null); setView('MAP') }} onFight={handleFight} onOpenCollection={handleOpenCollection} />}
            {view === 'COMBAT' && <CombatScreen enemyData={activeEnemy} onFinish={handleCombatFinish} />}
            {view === 'COLLECTION' && <CollectionScreen onBack={() => activeLocation ? setView('LOCATION') : setView('MAP')} />}
            {view === 'REWARD' && <RewardScreen rewardOptions={rewardOptions} onSelect={handleSelectReward} onSkip={() => setView('LOCATION')} />}
            {view === 'DEFEAT' && <DefeatScreen onContinue={() => setView('LOCATION')} log={lastLog} />}
        </>
    );
}

export default App;
