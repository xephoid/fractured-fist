import React, { useState, useEffect } from 'react';
import { CampaignProvider, useCampaign } from './context/CampaignContext';
import { LOCATIONS } from './data/locations';
import StartScreen from './components/screens/StartScreen';
import WorldMap from './components/screens/WorldMap';
import CombatScreen from './components/screens/CombatScreen';
import LocationDetail from './components/screens/LocationDetail';
import CollectionScreen from './components/screens/CollectionScreen';
import RewardScreen from './components/screens/RewardScreen';
import DefeatScreen from './components/screens/DefeatScreen';
import { tierValues } from './data';

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
            const creditMap = { 1: 50, 2: 100, 3: 150 };

            const xp = tierValues[tier] || 1;
            const credits = creditMap[tier] || 50;

            dispatch({ type: 'GAIN_XP', payload: xp });
            dispatch({ type: 'ADD_CREDITS', payload: credits });
            dispatch({ type: 'DEFEAT_CHAMPION', payload: { locationId: activeLocation, championTier: tier } });

            if (tier > 2) {
                dispatch({ type: 'UPDATE_STANDING', payload: { factionKey: activeEnemy.factionId, amount: 0.5 } });
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
                earnedCredits: credits
            });
            setView('REWARD');
        } else {
            // Loss
            setLastLog(log || []);
            setView('DEFEAT');
        }
    };

    const handleSelectReward = (techId) => {
        dispatch({ type: 'UNLOCK_TECHNIQUE', payload: techId });
        setView('COLLECTION');
    };

    const handleResetGame = () => {
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
