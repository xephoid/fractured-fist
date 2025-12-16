import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { api } from '../services/api';
import { LOCATIONS } from '../data/locations';
import { FACTION_IDS } from '../data/factions';

const CampaignContext = createContext();

const initialLocations = {};
LOCATIONS.forEach(loc => {
    initialLocations[loc.id] = {
        id: loc.id,
        controller: loc.owner || null,
        locked: false,
    };
});

const initialState = {
    player: {
        name: 'Player',
        species: null,
        background: null,
        level: 1,
        xp: 0,
        credits: 0,
        stamina: 0, // Set on species selection
        collection: [],
        loadout: [],
        deck: [],
    },
    world: {
        currentLocationId: null,
        locations: initialLocations,
        factions: {
            [FACTION_IDS.MASTERS_CIRCLE]: { standing: 0, name: "The Masters' Circle" },
            [FACTION_IDS.UNCOUNTED]: { standing: 0, name: "Uncounted" },
            [FACTION_IDS.TITAN_ENTERTAINMENT]: { standing: 0, name: "Titan Entertainment" },
            [FACTION_IDS.THE_AWAKENED]: { standing: 0, name: "The Awakened" },
        },
        quests: [],
    },
    loading: true,
    error: null,
};

function campaignReducer(state, action) {
    switch (action.type) {
        case 'LOAD_GAME_SUCCESS':
            return { ...state, ...action.payload, loading: false };
        case 'LOAD_GAME_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case 'SET_PLAYER_SPECIES':
            // logic to set stamina based on species
            let stamina = 7;
            if (action.payload === 'Grankiki') stamina = 5;
            if (action.payload === 'Unmoored') stamina = 6;
            if (action.payload === 'Bouaux') stamina = 10;

            // Default Starter Collection & Loadout (if empty)
            const starterCards = ['jab', 'block', 'react', 'quicken', 'center', 'distract', 'assess'];

            return {
                ...state,
                player: {
                    ...state.player,
                    species: action.payload,
                    stamina,
                    collection: starterCards,
                    loadout: starterCards
                },
            };
        case 'SET_LOADOUT':
            return {
                ...state,
                player: { ...state.player, loadout: action.payload }
            };
        case 'SET_BACKGROUND':
            return {
                ...state,
                player: { ...state.player, background: action.payload }
            };
        case 'UPDATE_STANDING':
            const { factionKey, amount } = action.payload;
            const newStanding = (state.world.factions[factionKey].standing || 0) + amount;
            return {
                ...state,
                world: {
                    ...state.world,
                    factions: {
                        ...state.world.factions,
                        [factionKey]: { ...state.world.factions[factionKey], standing: newStanding }
                    }
                }
            };
        case 'ADD_CREDITS':
            return {
                ...state,
                player: { ...state.player, credits: state.player.credits + action.payload }
            };

        case 'GAIN_XP':
            const xpGained = action.payload;
            const newXp = state.player.xp + xpGained;
            let newLevel = state.player.level;
            let newStamina = state.player.stamina;

            // Level Thresholds
            // 1->2: 8, 2->3: 18, 3->4: 32, 4->5: 50
            const thresholds = { 1: 8, 2: 18, 3: 32, 4: 50 };

            if (thresholds[newLevel] && newXp >= thresholds[newLevel]) {
                newLevel++;
                // Stamina Increases
                const s = state.player.species;
                if (s === 'Bouaux') newStamina += 2;
                else if (s === 'Grankiki') {
                    if (newLevel !== 3) newStamina += 1;
                }
                else newStamina += 1;
            }

            return {
                ...state,
                player: {
                    ...state.player,
                    xp: newXp,
                    level: newLevel,
                    stamina: newStamina
                }
            };

        case 'UNLOCK_TECHNIQUE':
            const newTech = action.payload;
            if (state.player.collection.includes(newTech)) return state;
            return {
                ...state,
                player: { ...state.player, collection: [...state.player.collection, newTech] }
            };
        default:
            return state;
    }
}

export function CampaignProvider({ children }) {
    const [state, dispatch] = useReducer(campaignReducer, initialState);

    useEffect(() => {
        api.loadGameState().then(data => {
            if (data) {
                dispatch({ type: 'LOAD_GAME_SUCCESS', payload: data });
            } else {
                dispatch({ type: 'LOAD_GAME_SUCCESS', payload: initialState });
            }
        }).catch(err => {
            dispatch({ type: 'LOAD_GAME_FAILURE', payload: err.message });
        });
    }, []);

    const value = { state, dispatch };

    return (
        <CampaignContext.Provider value={value}>
            {children}
        </CampaignContext.Provider>
    );
}

export function useCampaign() {
    const context = useContext(CampaignContext);
    if (!context) {
        throw new Error('useCampaign must be used within a CampaignProvider');
    }
    return context;
}
