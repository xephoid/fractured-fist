import { FACTION_IDS } from './factions';

export const LOCATIONS = [
    // Faction Home Bases
    {
        id: 'sanctum_peaks',
        name: 'The Sanctum Peaks',
        type: 'HOME_BASE',
        owner: FACTION_IDS.MASTERS_CIRCLE,
        description: "Masters' Circle home base (Mountain monastery).",
        x: 20, y: 20, // Map coordinates (0-100)
    },
    {
        id: 'undercroft',
        name: 'The Undercroft',
        type: 'HOME_BASE',
        owner: FACTION_IDS.UNCOUNTED,
        description: "Uncounted home base (Underground city).",
        x: 80, y: 80,
    },
    {
        id: 'prism_arena',
        name: 'Prism Arena',
        type: 'HOME_BASE',
        owner: FACTION_IDS.TITAN_ENTERTAINMENT,
        description: "Titan Entertainment home base (Massive stadium).",
        x: 80, y: 20,
    },
    {
        id: 'fracture_valley',
        name: 'Fracture Valley',
        type: 'HOME_BASE',
        owner: FACTION_IDS.THE_AWAKENED,
        description: "The Awakened home base (Dimensional energy zone).",
        x: 20, y: 80,
    },
    // Contested Locations
    {
        id: 'apex_city',
        name: 'Apex City',
        type: 'CONTESTED',
        possibleFactions: [FACTION_IDS.MASTERS_CIRCLE, FACTION_IDS.UNCOUNTED], // Default pair, randomized in game
        description: "Human capital, massive metropolis.",
        x: 50, y: 50,
    },
    {
        id: 'chrome_bay',
        name: 'Chrome Bay',
        type: 'CONTESTED',
        possibleFactions: [FACTION_IDS.MASTERS_CIRCLE, FACTION_IDS.TITAN_ENTERTAINMENT],
        description: "Cyberpunk island, dense urban tech district.",
        x: 70, y: 40,
    },
    {
        id: 'glasslands',
        name: 'The Glasslands',
        type: 'CONTESTED',
        possibleFactions: [FACTION_IDS.UNCOUNTED, FACTION_IDS.THE_AWAKENED],
        description: "Desert Fracture Zone where sand turned to glass.",
        x: 30, y: 70,
    },
    {
        id: 'port_meridian',
        name: 'Port Meridian',
        type: 'CONTESTED',
        possibleFactions: [FACTION_IDS.TITAN_ENTERTAINMENT, FACTION_IDS.UNCOUNTED],
        description: "Coastal trading city, neutral ground.",
        x: 50, y: 30, // Adjusted layout
    },
    {
        id: 'verdant_sanctum',
        name: 'The Verdant Sanctum',
        type: 'CONTESTED',
        possibleFactions: [FACTION_IDS.MASTERS_CIRCLE, FACTION_IDS.THE_AWAKENED],
        description: "Ancient forest with Phase Two Bouaux homes.",
        x: 30, y: 50,
    },
];
