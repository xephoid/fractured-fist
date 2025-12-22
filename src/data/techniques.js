import { FACTION_IDS } from './factions';

export const CARD_TYPES = {
    RESOURCE: 'RESOURCE',
    TECHNIQUE: 'TECHNIQUE',
    MISSTEP: 'MISSTEP'
};

export const TECHNIQUES = [
    // --- RESOURCES ---
    { id: 'focus', name: 'Focus', type: CARD_TYPES.RESOURCE, cost: 0, value: 1, description: "1 Spirit. If stamina < opponent, discard all Focus for redraw.", faction: null },
    { id: 'momentum', name: 'Momentum', type: CARD_TYPES.RESOURCE, cost: 3, value: 2, description: "2 Spirit.", faction: null },
    { id: 'mastery', name: 'Mastery', type: CARD_TYPES.RESOURCE, cost: 6, value: 3, description: "3 Spirit.", faction: null },

    // --- MISSTEP ---
    { id: 'misstep', name: 'Misstep', type: CARD_TYPES.MISSTEP, cost: 0, value: 0, description: "Unplayable. Refine to remove.", faction: null },

    // --- STARTER ---
    { id: 'jab', name: 'Attack', type: CARD_TYPES.TECHNIQUE, cost: 4, description: "+1 Damage.", faction: null, effects: { damage: 1 } },
    { id: 'block', name: 'Block', type: CARD_TYPES.TECHNIQUE, cost: 3, description: "+1 Defense.", faction: null, effects: { defense: 1 } },
    { id: 'react', name: 'React', type: CARD_TYPES.TECHNIQUE, cost: 3, description: "+2 Tech.", faction: null, effects: { actions: 2 } },
    { id: 'quicken', name: 'Quicken', type: CARD_TYPES.TECHNIQUE, cost: 2, description: "+2 Draws.", faction: null, effects: { draw: 2 } },
    { id: 'center', name: 'Center', type: CARD_TYPES.TECHNIQUE, cost: 4, description: "+3 Spirit.", faction: null, effects: { spirit: 3 } },
    { id: 'distract', name: 'Distract', type: CARD_TYPES.TECHNIQUE, cost: 2, description: "+2 Missteps.", faction: null, effects: { add_misstep: 2 } },
    { id: 'assess', name: 'Assess', type: CARD_TYPES.TECHNIQUE, cost: 3, description: "+1 Refine.", faction: null, effects: { refine: 1 } },

    // --- MASTERS' CIRCLE ---
    { id: 'defensive_kata', name: 'Defensive Kata', type: CARD_TYPES.TECHNIQUE, cost: 4, description: "+1 Refine, +2 Defense.", faction: FACTION_IDS.MASTERS_CIRCLE, effects: { defense: 2, refine: 2 } },
    { id: 'perfect_form', name: 'Perfect Form', type: CARD_TYPES.TECHNIQUE, cost: 5, description: "+1 Refine, +2 Draw, +1 Tech.", faction: FACTION_IDS.MASTERS_CIRCLE, effects: { refine: 1, draw: 2, actions: 1 } },
    { id: 'masters_riposte', name: "Master's Riposte", type: CARD_TYPES.TECHNIQUE, cost: 5, description: "+1 Defense, +1 Damage.", faction: FACTION_IDS.MASTERS_CIRCLE, effects: { defense: 1, damage: 1 } },
    { id: 'flowing_counter', name: 'Flowing Counter', type: CARD_TYPES.TECHNIQUE, cost: 5, description: "+2 Tech, +3 Defense.", faction: FACTION_IDS.MASTERS_CIRCLE, effects: { defense: 3, actions: 2 } },

    // --- UNCOUNTED ---
    { id: 'impose_pressure', name: 'Impose Pressure', type: CARD_TYPES.TECHNIQUE, cost: 4, description: "+1 Draw, +2 Spirit, +1 Channel.", faction: FACTION_IDS.UNCOUNTED, effects: { draw: 1, spirit: 2, channels: 1 } },
    { id: 'leg_sweep', name: 'Leg Sweep', type: CARD_TYPES.TECHNIQUE, cost: 5, description: "+2 Missteps, +1 Damage.", faction: FACTION_IDS.UNCOUNTED, effects: { damage: 1, add_misstep: 2 } },
    { id: 'overwhelming_assault', name: 'Overwhelming Assault', type: CARD_TYPES.TECHNIQUE, cost: 8, description: "+2 Tech, +2 Damage.", faction: FACTION_IDS.UNCOUNTED, effects: { damage: 2, actions: 2 } },
    { id: 'ruthless_barrage', name: 'Ruthless Barrage', type: CARD_TYPES.TECHNIQUE, cost: 5, description: "+1 Draw, +2 Tech, +3 Missteps.", faction: FACTION_IDS.UNCOUNTED, effects: { actions: 2, add_misstep: 3, draw: 1 } },

    // --- TITAN ENTERTAINMENT ---
    { id: 'showstopper', name: 'Showstopper', type: CARD_TYPES.TECHNIQUE, cost: 5, description: "+2 Spirit, +1 Damage.", faction: FACTION_IDS.TITAN_ENTERTAINMENT, effects: { damage: 1, spirit: 2 } },
    { id: 'targeted_strike', name: 'Targeted Strike', type: CARD_TYPES.TECHNIQUE, cost: 5, description: "+1 Refine, +1 Damage.", faction: FACTION_IDS.TITAN_ENTERTAINMENT, effects: { refine: 1, damage: 1 } },
    { id: 'grand_finale', name: 'Grand Finale', type: CARD_TYPES.TECHNIQUE, cost: 10, description: "+5 Damage.", faction: FACTION_IDS.TITAN_ENTERTAINMENT, effects: { damage: 5 } },
    { id: 'devastating_blow', name: 'Devastating Blow', type: CARD_TYPES.TECHNIQUE, cost: 8, description: "+1 Draw, +3 Damage.", faction: FACTION_IDS.TITAN_ENTERTAINMENT, effects: { draw: 1, damage: 3 } },

    // --- THE AWAKENED ---
    { id: 'energy_channeling', name: 'Energy Channeling', type: CARD_TYPES.TECHNIQUE, cost: 4, description: "+2 Spirit, +1 Channel.", faction: FACTION_IDS.THE_AWAKENED, effects: { spirit: 2, channels: 1 } },
    { id: 'enlightened_flow', name: 'Enlightened Flow', type: CARD_TYPES.TECHNIQUE, cost: 5, description: "+3 Tech, +2 Spirit.", faction: FACTION_IDS.THE_AWAKENED, effects: { actions: 3, spirit: 2 } },
    { id: 'inner_harmony', name: 'Inner Harmony', type: CARD_TYPES.TECHNIQUE, cost: 6, description: "+2 Heal, +1 Refine.", faction: FACTION_IDS.THE_AWAKENED, effects: { heal: 2, refine: 1 } },
    { id: 'transcendent_strike', name: 'Transcendent Strike', type: CARD_TYPES.TECHNIQUE, cost: 8, description: "+1 Draw, +3 Heal, +2 Damage.", faction: FACTION_IDS.THE_AWAKENED, effects: { damage: 2, heal: 3, draw: 1 } },

    // --- GENERAL ---
    { id: 'reading_the_opponent', name: 'Read Opponent', type: CARD_TYPES.TECHNIQUE, cost: 4, description: "+1 Draw, +2 Tech.", faction: null, effects: { draw: 1, actions: 2 } },
    { id: 'deflecting_block', name: 'Deflecting Block', type: CARD_TYPES.TECHNIQUE, cost: 3, description: "+1 Tech, +1 Defense.", faction: null, effects: { actions: 1, defense: 1 } },
    { id: 'smoke_bomb', name: 'Smoke Bomb', type: CARD_TYPES.TECHNIQUE, cost: 3, description: "+2 Tech, +2 Missteps.", faction: null, effects: { actions: 2, add_misstep: 2 } },
    { id: 'combination_rush', name: 'Combination Rush', type: CARD_TYPES.TECHNIQUE, cost: 3, description: "+2 Tech, +1 Channel.", faction: null, effects: { actions: 2, channels: 1 } },
    { id: 'thoughtful_composure', name: 'Thoughtful Composure', type: CARD_TYPES.TECHNIQUE, cost: 4, description: "+2 Tech, +1 Refine.", faction: null, effects: { spirit: 2, refine: 1 } },
    { id: 'mental_clarity', name: 'Mental Clarity', type: CARD_TYPES.TECHNIQUE, cost: 3, description: "+3 Draw.", faction: null, effects: { draw: 3 } },
    { id: 'flying_kick', name: 'Flying Kick', type: CARD_TYPES.TECHNIQUE, cost: 6, description: "+2 Damage.", faction: null, effects: { damage: 2 } },
];
