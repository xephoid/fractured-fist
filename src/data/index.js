export const levelThresholds = { 1: 4, 2: 8, 3: 12, 4: 24, 5: 48 };

export const tierValues = { 1: 1, 2: 2, 3: 4, 4: 8, 5: 16 };

export const creditMap = { 1: 50, 2: 100, 3: 150 };

export const MAX_MISSTEPS = 10;

export const STARTING_HAND = ['focus', 'focus', 'focus', 'focus', 'focus', 'focus', 'focus', 'misstep', 'misstep', 'misstep'];

export const levelUp = (player, xp) => {
    const newXp = player.xp + xp;
    let newLevel = player.level;
    let newStamina = player.stamina;

    // Level Thresholds
    // 1->2: 4, 2->3: 8, 3->4: 12, 4->5: 24
    if (levelThresholds[newLevel] && newXp >= levelThresholds[newLevel]) {
        newLevel++;
        // Stamina Increases
        const s = player.species;
        if (s === 'Bouaux') newStamina += 2;
        else if (s === 'Grankiki') {
            if (newLevel !== 3) newStamina += 1;
        }
        else newStamina += 1;
    }
    return { newLevel, newStamina, newXp };
}

export const displayPlayerName = (player) => {
    switch (player.name.toLowerCase()) {
        case 'power overwhelming':
            return 'Archon';
        case 'charade sc':
            return 'Necrid';
        case 'brash taunter':
            return 'Crerature - Goblin';
        case 'minneapolis':
            return 'Minnesota';
        default:
            return player.name;
    }
}