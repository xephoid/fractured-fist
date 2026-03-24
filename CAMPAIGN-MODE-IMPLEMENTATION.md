# Fractured Fist - Campaign Mode Implementation
> *Based on codebase analysis as of February 2026*

## Overview
The current campaign mode is a simplified version of the original design. It focuses on a core loop of traveling between locations and fighting champions.

## Core Mechanics

### Campaign State
- **Player Stats**: Level, XP, Credits, Stamina, Max Stamina.
- **Collection**: Pool of owned technique cards.
- **Loadout**: Active 7 techniques brought into combat.
- **Locations**: 9 predefined locations (4 Home Bases, 5 Contested).

### Progression
**Leveling:**
- **XP Thresholds**:
  - Level 1 → 2: **4 XP**
  - Level 2 → 3: **8 XP**
  - Level 3 → 4: **12 XP**
  - Level 4 → 5: **24 XP**
  - Level 5+: **48 XP**
- **Rewards**: Leveling up increases Stamina (+1 for Humans/Unmoored, +2 for Bouaux).
- **Grankiki Exception**: Grankikis do not gain stamina at Level 3.

**Economy (Credits):**
- **Tier 1 (Initiate)**: 50 Credits
- **Tier 2 (Adept)**: 100 Credits
- **Tier 3 (Champion)**: 150 Credits
*(Note: Credits currently accumulate but there is no shop implementation to spend them).*

**Technique Acquisition:**
- **Victory Reward**: Upon defeating a champion, you pick 1 technique from their loadout to add to your collection.
- **Restriction**: You can only choose cards you do not already own.
- **Fallback**: If the enemy has no learnable techniques, a default set is offered (`Flying Kick`, `Mental Clarity`, `Refining Stance`).

---

## Species Classes
Differences in starting Stamina and special mechanics:

1.  **Human** (Normal)
    - **Stamina**: 7
    - **Hand Size**: 5
    - Standard experience.

2.  **Grankiki** (Hard)
    - **Stamina**: 4
    - **Hand Size**: **6** (Bonus card draw)

3.  **Unmoored** (Easy)
    - **Stamina**: 6
    - **Hand Size**: 5
    - **Special**: Opponents start with **4 additional Misstep cards** in their deck (Total 14 cards).

4.  **Bouaux** (Mild)
    - **Stamina**: 10
    - **Hand Size**: 5
    - Gains +2 Stamina per level instead of +1.

---

## Combat Mechanics
The code (`useCombat.js`) implements specific rules not fully detailed in the UI:

- **Deck Construction**: Players start with 7 Focus + 3 Missteps + Loadout.
- **Supply**: Infinite `Focus`, `Momentum`, `Mastery`. Techniques/Missteps are limited to 5 copies.
- **Focus Reload**: If your hand contains `Focus` cards AND your Stamina is **lower** than the enemy's, you can discard all Focus cards to draw that many new cards.
- **Refining**: Trashing a card removes it from the current combat hand/deck (not permanent collection removal).

### Enemy AI
The AI (`useCombat.js`) evaluates its strategy at the start of each turn based on its loadout cost vs average resource value:
- **RAMP Strategy**: Optimizes for buying resources and high-value cards. Used when deck is expensive.
- **AGGRO Strategy**: Optimizes for immediate damage and cheap efficiency. Used when deck is cheap.

---

## Champions & Locations
**Locations**:
- 9 total locations.
- Each spawns 3 Champions (Tier 1, 2, 3) daily (reset on defeat/level up logic).

**Champion Generation**:
- **Tier 1 (Initiate)**: Base Stamina (7) | Loadout: 1 Jab + 4 Starters + 2 Generals.
- **Tier 2 (Adept)**: Base + 5 Stamina | Loadout: 1 Jab + 2 Starters + 2 Generals + 2 Faction/Generals.
- **Tier 3 (Champion)**: Base + 10 Stamina | Loadout: 1 Flying Kick + 3 Generals + 3 Faction/Generals.