import { FACTION_IDS } from './factions';

export const CARD_TYPES = {
    RESOURCE: 'RESOURCE',
    TECHNIQUE: 'TECHNIQUE',
    MISSTEP: 'MISSTEP'
};

export const TECHNIQUES = [
    // --- RESOURCES ---
    { id: 'focus', name: 'Focus', type: CARD_TYPES.RESOURCE, cost: 0, value: 1, description: "1 Spirit.\r\n\r\nIf your stamina < \r\nopponent, discard\r\nall Focus for redraw.", faction: null },
    { id: 'momentum', name: 'Momentum', type: CARD_TYPES.RESOURCE, cost: 3, value: 2, description: "2 Spirit.", faction: null },
    { id: 'mastery', name: 'Mastery', type: CARD_TYPES.RESOURCE, cost: 6, value: 3, description: "3 Spirit.", faction: null },

    // --- MISSTEP ---
    { id: 'misstep', name: 'Misstep', type: CARD_TYPES.MISSTEP, cost: 0, value: 0, description: "Unplayable.\r\nRefine to remove.", faction: null },

    // --- STARTER ---
    { id: 'jab', name: 'Attack', type: CARD_TYPES.TECHNIQUE, cost: 4, description: "+1 Damage.", faction: null, effects: { damage: 1 } },
    { id: 'block', name: 'Block', type: CARD_TYPES.TECHNIQUE, cost: 3, description: "+1 Defense.", faction: null, effects: { defense: 1 } },
    { id: 'react', name: 'React', type: CARD_TYPES.TECHNIQUE, cost: 3, description: "+2 Tech.", faction: null, effects: { actions: 2 } },
    { id: 'quicken', name: 'Quicken', type: CARD_TYPES.TECHNIQUE, cost: 2, description: "+2 Draws.", faction: null, effects: { draw: 2 } },
    { id: 'center', name: 'Center', type: CARD_TYPES.TECHNIQUE, cost: 2, description: "+2 Spirit.", faction: null, effects: { spirit: 2 } },
    { id: 'distract', name: 'Distract', type: CARD_TYPES.TECHNIQUE, cost: 3, description: "+2 Missteps.", faction: null, effects: { add_misstep: 2 } },
    { id: 'assess', name: 'Assess', type: CARD_TYPES.TECHNIQUE, cost: 2, description: "+2 Refine.", faction: null, effects: { refine: 2 } },

    // --- MASTERS' CIRCLE ---
    { id: 'defensive_kata', name: 'Defensive Kata', type: CARD_TYPES.TECHNIQUE, cost: 4, description: "+2 Refine,\r\n+2 Defense.", faction: FACTION_IDS.MASTERS_CIRCLE, effects: { defense: 2, refine: 2 } },
    { id: 'perfect_form', name: 'Perfect Form', type: CARD_TYPES.TECHNIQUE, cost: 5, description: "+1 Refine,\r\n+2 Draw,\r\n+1 Tech.", faction: FACTION_IDS.MASTERS_CIRCLE, effects: { refine: 1, draw: 2, actions: 1 } },
    { id: 'masters_riposte', name: "Master's Riposte", type: CARD_TYPES.TECHNIQUE, cost: 5, description: "+1 Defense,\r\n+1 Damage.", faction: FACTION_IDS.MASTERS_CIRCLE, effects: { defense: 1, damage: 1 } },
    { id: 'flowing_counter', name: 'Flowing Counter', type: CARD_TYPES.TECHNIQUE, cost: 5, description: "+2 Tech,\r\n+3 Defense.", faction: FACTION_IDS.MASTERS_CIRCLE, effects: { defense: 3, actions: 2 } },

    // --- UNCOUNTED ---
    { id: 'impose_pressure', name: 'Impose Pressure', type: CARD_TYPES.TECHNIQUE, cost: 4, description: "+1 Draw,\r\n+2 Spirit,\r\n+1 Channel.", faction: FACTION_IDS.UNCOUNTED, effects: { draw: 1, spirit: 2, channels: 1 } },
    { id: 'leg_sweep', name: 'Leg Sweep', type: CARD_TYPES.TECHNIQUE, cost: 5, description: "+2 Missteps,\r\n+1 Damage.", faction: FACTION_IDS.UNCOUNTED, effects: { damage: 1, add_misstep: 2 } },
    { id: 'overwhelming_assault', name: 'Overwhelming Assault', type: CARD_TYPES.TECHNIQUE, cost: 8, description: "+2 Tech,\r\n+2 Damage.", faction: FACTION_IDS.UNCOUNTED, effects: { damage: 2, actions: 2 } },
    { id: 'ruthless_barrage', name: 'Ruthless Barrage', type: CARD_TYPES.TECHNIQUE, cost: 5, description: "+1 Draw,\r\n+2 Tech,\r\n+3 Missteps.", faction: FACTION_IDS.UNCOUNTED, effects: { actions: 2, add_misstep: 3, draw: 1 } },

    // --- TITAN ENTERTAINMENT ---
    { id: 'showstopper', name: 'Showstopper', type: CARD_TYPES.TECHNIQUE, cost: 5, description: "+2 Spirit,\r\n+1 Damage.", faction: FACTION_IDS.TITAN_ENTERTAINMENT, effects: { damage: 1, spirit: 2 } },
    { id: 'targeted_strike', name: 'Targeted Strike', type: CARD_TYPES.TECHNIQUE, cost: 5, description: "+1 Refine,\r\n+1 Damage.", faction: FACTION_IDS.TITAN_ENTERTAINMENT, effects: { refine: 1, damage: 1 } },
    { id: 'grand_finale', name: 'Grand Finale', type: CARD_TYPES.TECHNIQUE, cost: 10, description: "+5 Damage.", faction: FACTION_IDS.TITAN_ENTERTAINMENT, effects: { damage: 5 } },
    { id: 'devastating_blow', name: 'Devastating Blow', type: CARD_TYPES.TECHNIQUE, cost: 8, description: "+1 Draw,\r\n+3 Damage.", faction: FACTION_IDS.TITAN_ENTERTAINMENT, effects: { draw: 1, damage: 3 } },

    // --- THE AWAKENED ---
    { id: 'energy_channeling', name: 'Energy Channeling', type: CARD_TYPES.TECHNIQUE, cost: 4, description: "+2 Spirit,\r\n+1 Channel.", faction: FACTION_IDS.THE_AWAKENED, effects: { spirit: 2, channels: 1 } },
    { id: 'enlightened_flow', name: 'Enlightened Flow', type: CARD_TYPES.TECHNIQUE, cost: 5, description: "+3 Tech,\r\n+2 Spirit.", faction: FACTION_IDS.THE_AWAKENED, effects: { actions: 3, spirit: 2 } },
    { id: 'inner_harmony', name: 'Inner Harmony', type: CARD_TYPES.TECHNIQUE, cost: 6, description: "+2 Heal,\r\n+2 Refine.", faction: FACTION_IDS.THE_AWAKENED, effects: { heal: 2, refine: 2 } },
    { id: 'transcendent_strike', name: 'Transcendent Strike', type: CARD_TYPES.TECHNIQUE, cost: 8, description: "+1 Draw,\r\n+3 Heal,\r\n+2 Damage.", faction: FACTION_IDS.THE_AWAKENED, effects: { damage: 2, heal: 3, draw: 1 } },

    // --- GENERAL ---
    { id: 'reading_the_opponent', name: 'Read Opponent', type: CARD_TYPES.TECHNIQUE, cost: 4, description: "+1 Draw,\r\n+2 Tech.", faction: null, effects: { draw: 1, actions: 2 } },
    { id: 'deflecting_block', name: 'Deflecting Block', type: CARD_TYPES.TECHNIQUE, cost: 3, description: "+1 Tech,\r\n+1 Defense.", faction: null, effects: { actions: 1, defense: 1 } },
    { id: 'smoke_bomb', name: 'Smoke Bomb', type: CARD_TYPES.TECHNIQUE, cost: 3, description: "+2 Tech,\r\n+1 Misstep.", faction: null, effects: { actions: 2, add_misstep: 1 } },
    { id: 'combination_rush', name: 'Combination Rush', type: CARD_TYPES.TECHNIQUE, cost: 3, description: "+2 Tech,\r\n+1 Channel.", faction: null, effects: { actions: 2, channels: 1 } },
    { id: 'thoughtful_composure', name: 'Thoughtful Composure', type: CARD_TYPES.TECHNIQUE, cost: 4, description: "+2 Tech,\r\n+2 Refine.", faction: null, effects: { actions: 2, refine: 2 } },
    { id: 'mental_clarity', name: 'Mental Clarity', type: CARD_TYPES.TECHNIQUE, cost: 3, description: "+3 Draw.", faction: null, effects: { draw: 3 } },
    { id: 'flying_kick', name: 'Flying Kick', type: CARD_TYPES.TECHNIQUE, cost: 6, description: "+2 Damage.", faction: null, effects: { damage: 2 } },
];

export const CHEAT_TECHNIQUES = [
    { id: 'everything', name: 'Do All The Things!', type: CARD_TYPES.TECHNIQUE, cost: 0, description: "+1 Draw,\r\n+1 Tech,\r\n+1 Refine,\r\n+1 Channel,\r\n+1 Defense,\r\n+1 Damage,\r\n+1 Heal,\r\n+1 Spirit,\r\n+1 Misstep", faction: null, effects: { draw: 1, actions: 1, refine: 1, channels: 1, defense: 1, damage: 1, heal: 1, spirit: 1, add_misstep: 1 } },
    { id: 'cart_blanche', name: 'Cart Blanche', type: CARD_TYPES.TECHNIQUE, cost: 0, description: "+100 Spirit,\r\n+100 Channels", faction: null, effects: { spirit: 100, channels: 100 } },
    { id: 'one_hundred_damage', name: 'Hundred Damage', type: CARD_TYPES.TECHNIQUE, cost: 0, description: "+100 Damage", faction: null, effects: { damage: 100 } },
    { id: 'x_potion', name: 'X Potion', type: CARD_TYPES.TECHNIQUE, cost: 0, description: "+100 Healing", faction: null, effects: { heal: 100 } },
    { id: 'force_field', name: 'Force Field', type: CARD_TYPES.TECHNIQUE, cost: 0, description: "+100 Defense", faction: null, effects: { defense: 100 } },
    { id: 'infinite_actions', name: 'Infinite Actions', type: CARD_TYPES.TECHNIQUE, cost: 0, description: "+100 Actions", faction: null, effects: { actions: 100 } },
    { id: 'refine_all', name: 'Refine All', type: CARD_TYPES.TECHNIQUE, cost: 0, description: "+100 Refine", faction: null, effects: { refine: 100 } },
    { id: 'maximum_misstep', name: 'Maximum Missteps', type: CARD_TYPES.TECHNIQUE, cost: 0, description: "+20 Missteps", faction: null, effects: { add_misstep: 20 } },
    { id: 'draw_party', name: 'Draw Party', type: CARD_TYPES.TECHNIQUE, cost: 0, description: "+5 Draw", faction: null, effects: { draw: 5 } },
];