export const FACTION_IDS = {
    MASTERS_CIRCLE: 'masters_circle',
    UNCOUNTED: 'uncounted',
    TITAN_ENTERTAINMENT: 'titan_entertainment',
    THE_AWAKENED: 'the_awakened',
};

export const FACTIONS = {
    [FACTION_IDS.MASTERS_CIRCLE]: {
        id: FACTION_IDS.MASTERS_CIRCLE,
        name: "The Masters' Circle",
        description: "Preservation of traditional techniques, discipline, honor in combat.",
        color: '#aaa', // Gray
        rival: FACTION_IDS.UNCOUNTED, // Simplified rival
    },
    [FACTION_IDS.UNCOUNTED]: {
        id: FACTION_IDS.UNCOUNTED,
        name: "Uncounted",
        description: "Survive and thrive in the streets, loyalty to the crew, pragmatic fighting.",
        color: '#0984e3', // Blue
        rival: FACTION_IDS.MASTERS_CIRCLE,
    },
    [FACTION_IDS.TITAN_ENTERTAINMENT]: {
        id: FACTION_IDS.TITAN_ENTERTAINMENT,
        name: "Titan Entertainment",
        description: "Combat as spectacle, marketability, crowd-pleasing performance.",
        color: '#fdcb6e', // Gold
        rival: FACTION_IDS.THE_AWAKENED,
    },
    [FACTION_IDS.THE_AWAKENED]: {
        id: FACTION_IDS.THE_AWAKENED,
        name: "The Awakened",
        description: "Combat as spiritual practice, unlocking inner power, transcendence.",
        color: '#00b894', // Green
        rival: FACTION_IDS.TITAN_ENTERTAINMENT,
    },
};
