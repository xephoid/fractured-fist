import { TECHNIQUES, CARD_TYPES } from '../data/techniques';
import { FACTIONS } from '../data/factions';

// Helpers
const getRandom = (arr, count) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

// Actually rules list 7 specific starters: Jab, Block, React, Quicken, Center, Guard, Assess.
const TRUE_STARTERS = ['jab', 'block', 'react', 'quicken', 'center', 'distract', 'assess'];

const getGenerals = () => TECHNIQUES.filter(t => !t.faction && t.type === CARD_TYPES.TECHNIQUE && !TRUE_STARTERS.includes(t.id)).map(t => t.id);
const getFactionCards = (factionId) => TECHNIQUES.filter(t => t.faction === factionId && t.type === CARD_TYPES.TECHNIQUE).map(t => t.id);

export const generateChampion = (tier, factionId) => {
    // Stamina Base: 
    // Humans = 7. 
    // Tier 1 (Novice) = Base.
    // Tier 2 (Adept) = Base + 3.
    // Tier 3 (Master) = Base + 5.
    // For simplicity, let's assume Human/Average stamina (7) as base for enemies? 
    // Or random species? Let's stick to simple base + tier bonus for now.
    const baseStamina = 7;
    let staminaBonus = 0;
    let nameTitle = "Novice";

    // Loadout Logic
    let loadout = [];
    const starters = TRUE_STARTERS.filter(t => t !== 'jab');
    const generals = getGenerals();
    const factionCards = factionId ? getFactionCards(factionId) : [];

    switch (tier) {
        case 1:
            staminaBonus = 0;
            nameTitle = "Novice";
            // 4 Starter + 1 General + 1 Faction
            loadout = [
                'jab',
                ...getRandom(starters, 4),
                ...getRandom(generals, 2),
                //...(factionId ? getRandom(factionCards, 1) : getRandom(starters, 1))
            ];
            break;
        case 2:
            staminaBonus = 5;
            nameTitle = "Adept";
            // 2 Starter + 2 General + 2 Faction
            loadout = [
                'jab',
                ...getRandom(starters, 2),
                ...getRandom(generals, 2),
                ...(factionId ? getRandom(factionCards, 2) : getRandom(generals, 2)) // Fallback if no faction
            ];
            break;
        case 3:
            staminaBonus = 10;
            nameTitle = "Master";
            // 3 General + 3 Faction
            loadout = [
                'flying_kick',
                ...getRandom(generals.filter(g => g !== 'flying_kick'), 3),
                ...(factionId ? getRandom(factionCards, 3) : getRandom(generals, 3))
            ];
            break;
        default:
            staminaBonus = 0;
            loadout = [...getRandom(starters, 7)];
    }

    // Name Gen
    const factionName = Object.values(FACTIONS).find(f => f.id === factionId)?.name || "Ronin";
    const name = `${nameTitle} of ${factionName}`;

    return {
        id: `champ_${Date.now()}_${Math.random()}`,
        name,
        tier,
        factionId,
        stamina: baseStamina + staminaBonus,
        loadout,
        // Potential for rewards tracking here
    };
};
