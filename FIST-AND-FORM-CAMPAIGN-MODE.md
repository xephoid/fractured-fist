# Fist & Form - Campaign Mode Design Document

## Overview
Solo campaign mode where players travel to different locations, challenge trainers, learn new techniques, and navigate faction politics.

## Core Campaign Mechanics

### Collection System
- Players have a **Collection** of all techniques they've learned throughout the campaign
- Before each fight, players select up to **7 technique types** from their Collection to be their **Available Techniques** for that fight
- Resource cards (Focus, Momentum, Mastery) are always available to channel
- All other mechanics follow the base game rules

### Progression

**Leveling and XP:**
- Players progress through 5 levels during the campaign
- XP is earned by defeating champions:
  - Tier 1 (Novice, 10 stamina): 1 XP
  - Tier 2 (Adept, 15 stamina): 2 XP
  - Tier 3 (Master, 20 stamina): 3 XP
  - Tier 4 (Legendary, 25 stamina): 5 XP
- XP is also earned from completing background milestone quests (double the equivalent champion tier)
- Level requirements:
  - Level 1 → 2: 8 XP
  - Level 2 → 3: 18 XP total (10 more)
  - Level 3 → 4: 32 XP total (14 more)
  - Level 4 → 5: 50 XP total (18 more)
- Levels trigger background story milestones and grant stamina increases

**Stamina Increases by Species:**
- **Human**: +1 stamina at levels 2, 3, 4 (7→8→9→10→10)
- **Grankiki**: +1 stamina at levels 2, 4 (5→6→6→7→7)
- **Unmoored**: +1 stamina at levels 2, 3, 4 (6→7→8→9→9)
- **Bouaux**: +2 stamina at levels 2, 3, 4 (10→12→14→16→16)

**Money and Economy:**
- Players earn credits by defeating champions:
  - Tier 1 (Novice): 50 credits
  - Tier 2 (Adept): 100 credits
  - Tier 3 (Master): 150 credits
  - Tier 4 (Legendary): 250 credits
- **Titan Entertainment Faction Bonus**: At +4 standing with Titan Entertainment, earn +50% credits from all fights (rounded up)
  - With bonus: Tier 1 = 75, Tier 2 = 150, Tier 3 = 225, Tier 4 = 375 credits

**Trainers and Purchasing Techniques:**
- Each location has a **Trainer** NPC who sells techniques for credits
- Trainers are separate from Champions (you don't fight trainers, you pay them)
- Each trainer sells a selection of techniques:
  - 2-3 General Techniques (distributed across locations, some overlap)
  - Their location's faction techniques (if player meets standing requirements)
- **Technique Prices**:
  - General Techniques (3-4 spirit cost): 200 credits
  - Faction Mid-Tier (4-5 spirit cost): 300 credits
  - Faction Game Changers (6-8 spirit cost): 400-500 credits
- See "Learning Techniques" section below for full details

**Campaign Structure:**
- Players start with only basic starter techniques
- Defeat champions at various locations to unlock new techniques and earn XP and credits
- Each location is associated with a faction and offers faction-specific techniques
- Player choices affect faction standing (pleased/angered)
- Faction standing unlocks rewards or creates consequences
- Level 5 triggers the campaign finale

## Game Flow

### Campaign Setup

1. **Randomly assign locations:**
   - Select 1 faction whose home base becomes contested
   - Randomly pair that home base with a rival faction
   - Randomly assign the 5 naturally contested locations to faction pairs (can repeat pairings)

2. **Player Character Creation:**
   - Choose species (affects starting stamina and special rules)
   - Choose background (determines story milestones)
   - Start at Level 1, 0 XP, 0 credits
   - All factions at standing 0 (Neutral)
   - Collection contains only 7 starter techniques

### Main Game Loop

Players can freely:

**Explore and Plan:**
- View all 9 locations (except those locked at -4 standing)
- See all champions at each location (tier, stamina, signature moves)
- See trainer inventories and technique prices
- Plan strategy based on available information

**Purchase Techniques:**
- Buy techniques from trainers using credits
- Can purchase multiple in one visit
- Trainers prevent duplicate purchases
- Faction techniques require appropriate standing (+2 or +4)

**Fight Champions:**
- Select 7 techniques from collection as Available Techniques before fight
- Fight using standard game rules with species modifiers
- Can fight same champion multiple times until you beat them
- Once beaten, that champion is done
- Can flee/forfeit at any time (counts as loss)

**After Winning a Fight:**
See "End of Fight Sequence" below

**After Losing a Fight:**
- No rewards, no changes
- Option to retry same fight immediately
- Return to exploration if choosing not to retry

### End of Fight Sequence (Victory)

1. **Earn Rewards:**
   - Award XP (based on champion tier or milestone quest: 2× for milestone quests)
   - Award Credits (based on champion tier, +50% if Titan Entertainment +4)
   - Choose 1 technique from champion's Available Techniques (if applicable)
   - Heal to full stamina (unless special quest overrides)

2. **Check Faction Standing Changes:**
   - Apply standing changes from fight (Tier 2+ at contested locations), quest completion, or story choices
   - Update all faction standings

3. **Check for New Faction Quests (First Pass):**
   - If any faction just reached ±1 or ±3 standing, unlock their quest
   - Present story interrupt quests immediately (in order if multiple)
   - Add quest-type objectives to active quest list

4. **Check for Level Up:**
   - If total XP reaches next level threshold, level up
   - Apply stamina increase based on species
   - If reached Level 5, flag campaign finale (to be determined)

5. **Trigger Background Milestones (if leveled to 2, 3, or 4):**
   - Present story interrupt (if applicable) - player resolves immediately
   - Any faction standing changes from milestone choices apply here
   - Unlock milestone quest (if applicable) - added to active quest list

6. **Check for New Faction Quests (Second Pass):**
   - If milestone story choices changed faction standing to ±1 or ±3, unlock those quests
   - Present any new story interrupt quests
   - Add any new quest-type objectives to active quest list

7. **Check Faction Bonuses/Penalties:**
   - If Awakened standing changed from/to +4, adjust base stamina immediately
   - Apply any other faction effects
   - Check for home base lockouts at -4

8. **Return to Exploration Mode:**
   - Player can travel, buy techniques, fight champions, work on quests

### Quest System

**Faction Standing Quests:**
- Unlock at standing levels ±1 and ±3
- Required to progress standing further
- Persistent until completed (cannot be discarded)
- Multiple faction quests can be active simultaneously
- Three types:
  - **[General Objective]** - Can complete during any appropriate fight
  - **[Quest Fight]** - Special encounter that appears
  - **[Story Choice]** - Narrative moment requiring decision

**Background Milestone Quests:**
- Unlock at Levels 2, 3, and 4
- NOT required to level up, but award significant XP (2× champion tier equivalent)
- Persistent until completed
- Multiple milestone quests can be active if skipped
- Two types:
  - **Story Interrupt** - Immediate narrative moment
  - **Quest Unlock** - Added to active quest list

### Travel and Exploration

**Free Movement:**
- No travel costs, time limits, or current location tracking
- Can view and access any location except those locked at -4 standing
- Full information about all champions, trainers, and techniques visible

**Champion Information:**
- Can see champions' "signature moves" before fighting:
  - Tier 1: Shows General Techniques
  - Tier 2-3: Shows faction techniques
- Allows strategic targeting for specific techniques

**Planning:**
- Players can scout for techniques across locations
- Plan which champions to fight for XP/credits/techniques
- Manage faction standing strategically
- See consequences of choices before committing

---

## The Four Factions

### 1. The Masters' Circle
**Philosophy**: Preservation of traditional techniques, discipline, honor in combat

**Aesthetic**: Classical dojos, traditional garb mixed with modern touches, respect for lineage

**Technique Focus**: Balanced, fundamentally sound, no tricks - pure skill

**Locations**: Historic dojos, mountain retreats, traditional training halls

**What Pleases Them**: Honorable victories, respecting opponents, mastering fundamentals

**What Angers Them**: Dirty tactics, disrespecting traditions, flashy showboating

**Faction Dynamics**:
- Natural Ally: The Awakened (both value discipline and mastery)
- Natural Rival: The Neon Dragons (honor vs pragmatism), Titan Entertainment (tradition vs commercialization)

---

### 2. The Neon Dragons
**Philosophy**: Survive and thrive in the streets, loyalty to the crew, pragmatic fighting

**Aesthetic**: Urban gang culture, neon-lit back alleys, street wear, tattoos

**Technique Focus**: Aggressive, efficient, some "dirty" moves, disruption

**Locations**: Underground fight clubs, back-alley dojos, warehouse districts, night markets

**What Pleases Them**: Winning by any means, showing toughness, loyalty demonstrations

**What Angers Them**: Weakness, working with authorities/corpo types, being too "proper"

**Faction Dynamics**:
- Natural Ally: Titan Entertainment (pragmatic, results-oriented)
- Natural Rival: The Masters' Circle (honor vs pragmatism)

---

### 3. Titan Entertainment
**Philosophy**: Combat as spectacle, marketability, crowd-pleasing performance

**Aesthetic**: Corporate polish, cameras everywhere, branded gear, stadium lights

**Technique Focus**: High damage, flashy combos, dramatic finishers, risk/reward

**Locations**: Professional arenas, corporate training facilities, televised venues, sponsored gyms

**What Pleases Them**: Spectacular victories, entertaining fights, building your brand

**What Angers Them**: Boring fights, refusing sponsorships, anti-corporate sentiment

**Faction Dynamics**:
- Natural Ally: The Neon Dragons (pragmatic, results-oriented)
- Natural Rival: The Awakened (spectacle vs spirituality), The Masters' Circle (tradition vs commercialization)

---

### 4. The Awakened
**Philosophy**: Combat as spiritual practice, unlocking inner power, transcendence

**Aesthetic**: Mystical/spiritual, glowing chi effects, meditation spaces, ancient symbols with modern interpretation

**Technique Focus**: Spirit/chi economy, refinement, meditation techniques, supernatural edge

**Locations**: Spiritual temples, remote monasteries, energy nexus points, meditation centers

**What Pleases Them**: Seeking enlightenment, mastering inner power, discipline

**What Angers Them**: Using power recklessly, materialistic motivations, ignoring spiritual growth

**Faction Dynamics**:
- Natural Ally: The Masters' Circle (both value discipline and mastery)
- Natural Rival: Titan Entertainment (spectacle vs spirituality)

---

## Technique Distribution

### Target: 30 Total Techniques

**Starter Techniques: 7**
- Available to all players from the beginning
- Simple, low-cost techniques that teach core mechanics

**Faction-Specific Techniques: 16 (4 per faction)**
- Learned by defeating trainers associated with each faction
- Thematically aligned with faction philosophy
- Focus on mid-tier (4-6 spirit) and game changers (5-8 spirit)

**General Techniques: 7**
- Can be learned at various locations
- Not tied to any specific faction
- Includes efficient early-game cards (3-4 spirit range)

---

## Current Technique List

### Starter Techniques (7/7 Complete)

1. **Jab** - 2 spirit, +1 damage
2. **Block** - 2 spirit, +1 defense
3. **React** - 2 spirit, +2 actions
4. **Quicken** - 2 spirit, draw 1 card
5. **Center** - 2 spirit, +1 spirit
6. **Guard** - 3 spirit, +2 defense
7. **Assess** - 3 spirit, draw 2 cards

---

### The Masters' Circle Techniques (4/4 - COMPLETE)

1. **Defensive Kata** - 5 spirit. Add 2 defense during strike resolution and refine 2 cards during cleanup.
2. **Perfect Form** - 4 spirit. Refine 1 card, draw 2 cards, and play 1 more technique card.
3. **Master's Riposte** - 6 spirit. Add 1 defense and 1 damage during strike resolution
4. **Flowing Counter** - 6 spirit. Add 3 defense during strike resolution and play 2 more technique cards.

---

### The Neon Dragons Techniques (4/4 - COMPLETE)

1. **Impose Pressure** - 5 spirit. Draw 1 card, gain 2 more spirit, and channel 1 additional card during Channel Phase.
2. **Leg Sweep** - 5 spirit. Deal 1 damage during strike resolution and add 2 Misstep cards to opponent's discard pile.
3. **Overwhelming Assault** - 8 spirit. Deal 2 damage during strike resolution and play 2 more technique cards.
4. **Ruthless Barrage** - 5 spirit. Play 2 more technique cards, add 3 Misstep cards to opponent's discard pile, and draw 1 card.

---

### Titan Entertainment Techniques (4/4 - COMPLETE)

1. **Showstopper** - 7 spirit. Deal 1 damage during strike resolution and gain 2 spirit.
2. **Targeted Strike** - 6 spirit. Refine 1 card during cleanup and deal 1 damage during strike resolution.
3. **Grand Finale** - 10 spirit. Deal 5 damage during strike resolution
4. **Devastating Blow** - 8 spirit. Draw 1 card and deal 3 damage during strike resolution.

---

### The Awakened Techniques (4/4 - COMPLETE)

1. **Energy Channeling** - 4 spirit. Gain 2 more spirit and channel 1 additional card during Channel Phase.
2. **Enlightened Flow** - 5 spirit. Play 3 more technique cards and gain 1 spirit.
3. **Inner Harmony** - 6 spirit. Recover 2 stamina and refine 1 card during cleanup.
4. **Transcendent Strike** - 8 spirit. Deal 2 damage during strike resolution, recover 3 stamina, and draw 1 card.

---

### General Techniques (7/7 - COMPLETE)

1. **Reading the Opponent** - 3 spirit. Draw 1 card and play 2 more technique cards.
2. **Deflecting Block** - 3 spirit. Play 1 more technique card and add 1 defense during strike resolution.
3. **Counter Strike** - 3 spirit. Play 2 more technique cards and add 2 Misstep cards to opponent's discard pile.
4. **Combination Rush** - 3 spirit. Play 2 more technique cards and channel 1 additional card during Channel Phase.
5. **Refining Stance** - 3 spirit. Refine 1 card.
6. **Mental Clarity** - 4 spirit. Draw 3 cards.
7. **Flying Kick** - 4 spirit. Deal 2 damage during strike resolution.

---

## Player Backgrounds

At the start of a campaign, players choose a background that defines their character's narrative journey. Backgrounds are purely narrative-focused and do not provide mechanical bonuses. Each background is built around an ideal that overlaps with two factions, creating natural story tension and meaningful choices throughout the campaign.

### Background Structure

Each background includes:
- **Core Ideal**: The central theme/value the character represents
- **Concept**: Who the character is and what drives them
- **Faction Tension**: The two factions their ideal connects to and the choice they face
- **Three Story Milestones**: Major narrative beats that occur at specific campaign progress points

### The Six Backgrounds

---

### 1. The Oath-Keeper (Masters' Circle + Neon Dragons)

**Ideal**: Honor through Loyalty

**Concept**: You swore a sacred oath (to protect someone, avenge a wrong, or uphold a principle) but were forced to break it. Now you must rebuild your honor.

**Tension**: Traditional honor vs pragmatic loyalty - sometimes keeping your word means breaking it

**Milestone 1** (Upon reaching Level 2):
- **"The Reminder"** - Someone from your past appears and reminds you of the oath you broke. They demand you make amends.
- **Choice**: Commit to honoring traditional codes (Masters' Circle +1) OR acknowledge that survival required breaking it (Neon Dragons +1)

**Milestone 2** (Upon reaching Level 3):
- **"The Test"** - The person/principle you swore to protect is threatened again. You must choose how to act.
- **Quest Unlocked**: Face a champion while following a restriction related to your original oath

**Milestone 3** (Upon reaching Level 4):
- **"The Reckoning"** - Final confrontation with the consequences of your broken oath.
- **Major Choice**: 
  - Fully embrace traditional honor (Masters' Circle +2, Neon Dragons -2)
  - Fully embrace street loyalty (Neon Dragons +2, Masters' Circle -2)
  - Find balance - both matter in different contexts (Both factions +1)

---

### 2. The Legacy Bearer (Masters' Circle + Titan Entertainment)

**Ideal**: Glory through Redemption

**Concept**: Your family was once legendary but fell from grace (scandal, defeat, betrayal). You fight to restore their name - or forge a new one.

**Tension**: Redeem family honor through tradition vs escape their shadow through fame

**Milestone 1** (Upon reaching Level 2):
- **"The Shadow"** - Someone recognizes your family name and either mocks you or expresses pity. The past haunts you.
- **Choice**: Defend your family's honor (Masters' Circle +1) OR declare you'll surpass them (Titan Entertainment +1)

**Milestone 2** (Upon reaching Level 3):
- **"The Offer"** - Titan Entertainment wants to exploit your family story for ratings. Masters' Circle offers to help restore your name through traditional means.
- **Major Choice**: Take the Titan deal, take the Masters' offer, or reject both

**Milestone 3** (Upon reaching Level 4):
- **"The Legacy Defined"** - Face the person/event that disgraced your family (or a symbolic representative).
- **Quest Unlocked**: Epic confrontation that determines how your story is remembered

---

### 3. The Seeker (Masters' Circle + The Awakened)

**Ideal**: Wisdom through Discipline

**Concept**: You seek perfection - but is it found in traditional forms or spiritual transcendence?

**Tension**: Mastery of technique vs mastery of self - which path leads to truth?

**Milestone 1** (Upon reaching Level 2):
- **"The Question"** - Both a traditional master and a spiritual guide offer to teach you their path to perfection.
- **Choice**: Follow traditional mastery (Masters' Circle +1), follow spiritual transcendence (The Awakened +1), or try to learn from both (unlock special dual-path quest)

**Milestone 2** (Upon reaching Level 3):
- **"The Contradiction"** - Your chosen path reveals a flaw or limitation. Doubt creeps in.
- **Quest Unlocked**: Must win a fight using ONLY techniques from the faction you've been neglecting

**Milestone 3** (Upon reaching Level 4):
- **"The Answer"** - You face a challenge that tests your philosophy.
- **Major Choice**:
  - Technique is perfection (Masters' Circle +2, The Awakened -1)
  - Spirit is perfection (The Awakened +2, Masters' Circle -1)
  - Both paths lead to the same truth (Both factions +1, unlock unique ending)

---

### 4. The Ambitious Outsider (Neon Dragons + Titan Entertainment)

**Ideal**: Power through Determination

**Concept**: Born with nothing, you'll do whatever it takes to reach the top.

**Tension**: Street power vs corporate power - which ladder do you climb?

**Milestone 1** (Upon reaching Level 2):
- **"The Opportunity"** - Both Neon Dragons and Titan Entertainment notice your talent and offer you a path up.
- **Choice**: Join the crew (Neon Dragons +1) or sign the contract (Titan Entertainment +1)

**Milestone 2** (Upon reaching Level 3):
- **"The Price"** - Your chosen path demands something that compromises the other.
- **Major Choice**: Honor your commitment or betray for greater opportunity

**Milestone 3** (Upon reaching Level 4):
- **"The Summit"** - You've reached the top of your chosen ladder. But is it enough?
- **Major Choice**:
  - Consolidate power in your faction (Chosen faction +2)
  - Leverage position to control both factions (Both factions +1, unlock dangerous ending)
  - Reject it all - power corrupted you (Both factions -2, unlock redemption ending)

---

### 5. The Exile (Neon Dragons + The Awakened)

**Ideal**: Freedom through Rejection

**Concept**: You were cast out or walked away. Now you forge your own path.

**Tension**: Freedom through rebellion vs freedom through enlightenment - what does liberation mean?

**Milestone 1** (Upon reaching Level 2):
- **"The Past Calls"** - Someone from the place/group that exiled you tracks you down.
- **Revelation**: Learn why you were really cast out (or why you really left)
- **Choice**: Embrace your exile as freedom (The Awakened +1) or plot revenge/return (Neon Dragons +1)

**Milestone 2** (Upon reaching Level 3):
- **"The Invitation"** - You're offered a chance to return/reconcile with your past.
- **Major Choice**: Return on their terms, return on YOUR terms (fight for it), or refuse

**Milestone 3** (Upon reaching Level 4):
- **"The Truth"** - Final confrontation with the source of your exile.
- **Quest Unlocked**: Face the person/institution that cast you out
- **Multiple Endings**: Violent liberation, peaceful transcendence, or forgiveness

---

### 6. The Mystic Performer (Titan Entertainment + The Awakened)

**Ideal**: Transcendence through Expression

**Concept**: You believe combat is art, performance, and spiritual practice all at once.

**Tension**: Entertaining crowds vs achieving enlightenment - can spectacle be sacred?

**Milestone 1** (Upon reaching Level 2):
- **"The Critic"** - Someone challenges your philosophy: "Is your 'art' just shallow spectacle? Is your 'spirituality' just performance?"
- **Choice**: Prove spectacle has meaning (Titan Entertainment +1), prove combat is sacred (The Awakened +1), or prove they're inseparable (unlock special quest)

**Milestone 2** (Upon reaching Level 3):
- **"The Choice"** - A crucial moment where entertainment and enlightenment conflict.
- **Major Choice**: Compromise one ideal for the other or find synthesis

**Milestone 3** (Upon reaching Level 4):
- **"The Masterpiece"** - Create your ultimate expression - fight as art, art as spirituality.
- **Quest Unlocked**: Special exhibition match with unique victory conditions (must win beautifully AND spiritually)

---

### Design Notes

**Milestone Triggers:**
- All backgrounds trigger milestones at Levels 2, 3, and 4
- Level 5 triggers the campaign finale for all backgrounds
- Ensures consistent pacing across all playstyles
- Players experience all three milestones before the ending

**Integration with Faction Standing:**
- Backgrounds naturally guide players toward their two affiliated factions
- Choices allow rebellion against expected path
- Background story beats are separate from but complement faction standing quests

---

---

## Species Selection

At the start of a campaign, players choose which species they are playing. This affects their starting stamina and may provide special rules. All other campaign rules remain the same (starting deck of 7 Focus + 3 Misstep, draw hand size, etc.).

### Playable Species

**Human (Normal Difficulty)**
- Starting Stamina: 7
- Special Rules: None
- Standard baseline experience

**Grankiki (Hard Difficulty)**
- Starting Stamina: 5
- Special Rules: Draw 6 cards instead of 5 at the start of each turn
- Challenge: Lower health pool but more cards to work with

**Unmoored (Challenging Difficulty)**
- Starting Stamina: 6
- Special Rules: Opponent starts each fight with 2 additional Misstep cards in their starting deck (9 Focus, 5 Misstep total)
- Challenge: Slightly lower health but opponents are hindered

**Bouaux (Easy Difficulty)**
- Starting Stamina: 10
- Special Rules: Can increase maximum stamina over time through campaign milestones (mechanic to be determined)
- Challenge: Higher starting health provides more margin for error

### Design Notes
- Species selection is for campaign mode only
- Starting deck composition remains the same for all species (7 Focus, 3 Misstep)
- Grankiki is the only species that modifies hand size
- Difficulty ratings indicate relative challenge level for experienced players

---

## Campaign Structure

### Location System

**Total: 9 Locations**

**The 9 Locations:**

**Faction Home Bases:**
1. **The Sanctum Peaks** - Masters' Circle home base (Mountain monastery, traditional training halls)
2. **The Undercroft** - Neon Dragons home base (Underground city, abandoned subway fight clubs)
3. **Prism Arena** - Titan Entertainment home base (Entertainment district, massive stadium complex)
4. **Fracture Valley** - The Awakened home base (Major Fracture Zone, temples studying dimensional energy)

**Naturally Contested Locations:**
5. **Apex City** - Human capital, massive metropolis (NYC vibes), financial and cultural center
6. **Chrome Bay** - Cyberpunk island (Tokyo vibes), dense urban tech district with traditional harbor
7. **The Glasslands** - Desert Fracture Zone where sand turned to glass, crystalline structures
8. **Port Meridian** - Coastal trading city, multicultural hub, neutral ground for faction meetings
9. **The Verdant Sanctum** - Ancient forest with Awakened temples, Phase Two Bouaux homes in massive trees

**Campaign Start Setup:**
- One faction's home base is randomly selected to become contested (paired with a rival faction)
- The other 3 factions keep their home bases as controlled locations
- The 5 naturally contested locations get random faction pairings from these combinations:
  1. Masters' Circle vs Neon Dragons
  2. Masters' Circle vs Titan Entertainment
  3. Masters' Circle vs The Awakened
  4. Neon Dragons vs Titan Entertainment
  5. Neon Dragons vs The Awakened
  6. Titan Entertainment vs The Awakened

**Result:**
- **3 Controlled Locations** (home bases that stayed controlled)
- **6 Contested Locations** (5 naturally contested + 1 home base that became contested)

**Contested Location Mechanics:**
- Each contested location is competed over by 2 factions
- Faction pairings are randomly assigned at campaign start (as described above)
- Defeating champions affects both factions (anger one, please the other)
- Mix of both factions' techniques available through champions

**Controlled Location Mechanics:**
- Three factions control their home base (one faction's became contested)
- Only that faction's champions and techniques available
- Deeper access to that faction's philosophy and strongest techniques
- If you're at -4 standing with a faction, you're locked out of their controlled location

### Champion Tier System

**Location Structure:**
- **Tier 1: Novice Champions**
  - stamina based on species
  - Available Techniques: 5 starting, 1 General
  - Reward: Learn 1 General Technique from their pool
  
- **Tier 2: Adept Champions** (2 champions, 1 per faction in contested locations)
  - stamina based on species +3
  - Available Techniques: Mix of Starting (2) + General (2) + Faction Mid-Tier cards (2 from their faction)
  - Reward: Learn 1 technique from their pool
  
- **Tier 3: Master Champions** (2 champions, 1 per faction)
  - stamina based on species +5
  - Available Techniques: General (3) + faction pool (3 their faction's techniques)
  - Reward: Learn 1 technique from their pool
  - Each represents one of the two factions at this location

- **Optional Tier 4: Legendary Master** (1 per home base)
  - stamina based on species +7
  - Special rules or unique abilities
  - Guards coveted techniques or provides major faction standing boost

### Learning Techniques

Players can learn techniques through two methods:

**Method 1 - Defeat Champions:**
- When you defeat a champion, choose 1 technique from their Available Techniques to add to your collection (if you don't already have it)
- This is free and happens immediately after victory
- Limited by what techniques the champion has in their deck

**Method 2 - Purchase from Trainers:**
- Pay credits to a trainer at any location to learn a technique they offer
- Each location has one trainer with their own selection of techniques
- Not limited by champion availability - can buy any technique the trainer sells (subject to faction standing requirements)

**Technique Availability:**
- **General Techniques**: Distributed across trainers at different locations, always available for purchase
- **Faction Techniques**: Only available for purchase if you have +2 or higher standing with that faction
- Trainers at faction-aligned locations sell that faction's techniques

### Faction Standing System

Players build reputation (positive or negative) with each of the four factions. Faction standing affects available rewards, story options, and potentially unlocks special techniques or challenges.

**Two Ways to Change Faction Standing:**

1. **Story Choices** (to be defined in campaign narrative)
   - Dialogue decisions
   - Quest completion methods
   - Alliances and betrayals
   - Helping or hindering faction interests

2. **Defeating Champions in Contested Locations**
   - Defeating a faction's champion **angers** that faction (-1 standing)
   - **Pleases** their rival faction at that location (+1 standing)
   - Creates strategic tension: "I want this technique, but it'll anger this faction..."
   - Only applies to Tier 2 and Tier 3 champions (faction-aligned)
   - Tier 1 champions are neutral and don't affect standing

### Faction Standing System

Players build reputation (positive or negative) with each of the four factions. Faction standing affects available rewards, story options, and potentially unlocks special techniques or challenges.

**Two Ways to Change Faction Standing:**

1. **Story Choices** (to be defined in campaign narrative)
   - Dialogue decisions
   - Quest completion methods
   - Alliances and betrayals
   - Helping or hindering faction interests

2. **Defeating Champions in Contested Locations**
   - Defeating a faction's champion **angers** that faction (-1 standing)
   - **Pleases** their rival faction at that location (+1 standing)
   - Creates strategic tension: "I want this technique, but it'll anger this faction..."
   - Only applies to Tier 2 and Tier 3 champions (faction-aligned)
   - Tier 1 champions are neutral and don't affect standing

**Standing Levels:**

Faction standing ranges from **-4 to +4** for a total of 9 levels:

- **+4: Maximum Favor** - Major rewards/benefits
- **+3: High Favor** - Quest Gate (unlock special quest to reach +4)
- **+2: Favor** - Moderate rewards/benefits
- **+1: Friendly** - Quest Gate (unlock special quest to reach +2)
- **0: Neutral** - Starting position, no bonuses or penalties
- **-1: Unfriendly** - Quest Gate (unlock special quest to recover to 0 or fall to -2)
- **-2: Disfavor** - Moderate penalties/consequences
- **-3: Hostile** - Quest Gate (unlock special quest to recover to -2 or fall to -4)
- **-4: Maximum Enmity** - Major penalties/consequences

**Quest Gates (Levels ±1 and ±3):**
- At these levels, normal standing changes stop
- Player unlocks a special faction quest
- Completing the quest advances standing (up or down depending on positive/negative)
- Player can choose whether to do the quest
- Quests are faction-specific and reflect their values/methods

**Example Faction Quests:**

### The Masters' Circle Quests

**+1 → +2 (Proving Discipline):**
- **"The Traditional Challenge"** - Defeat a designated champion using only techniques from The Masters' Circle (no other faction techniques, no general techniques except starter techniques)
- Tests commitment to traditional methods and mastery of their style

**+3 → +4 (Becoming a Master):**
- **"The Exhibition Match"** - Face a legendary Masters' Circle champion in a demonstration match at their main dojo. Win or lose honorably (cannot use techniques that add Missteps to opponent)
- Tests skill, honor, and embodiment of their philosophy

**-1 → -2 or back to 0:**
- **"Redemption Through Form"** - Fight a Masters' Circle champion and must refine 3 cards during the fight to prove you're purifying your fighting style
- Win the fight while refining to stay at -1, refuse and fall to -2

**-3 → -4 or back to -2:**
- **"Face the Council"** - A Master challenges you to a duel. Win dishonorably (using techniques that add Missteps) and fall to -4. Lose honorably and recover to -2. Win honorably and return to 0.
- High stakes choice about what kind of fighter you are

### The Neon Dragons Quests

**+1 → +2 (Proving Loyalty):**
- **"The Job"** - Help the crew by defeating a rival gang's champion at a specific location (location chosen by quest, not player optimization)
- Tests loyalty over convenience

**+3 → +4 (Blood In, Blood Out):**
- **"Take the Heat"** - Accept blame for something the crew did. Automatically lose 2 standing with another faction of your choice
- Tests ultimate loyalty - willing to make enemies for the crew

**-1 → -2 or back to 0:**
- **"Prove You're Not a Snitch"** - Turn down an offer from The Masters' Circle or Titan Entertainment. Lose a potential reward to prove loyalty
- Choice: Take the deal (fall to -2) or refuse it (stay at -1)

**-3 → -4 or back to -2:**
- **"The Gauntlet"** - Face three Neon Dragons champions back-to-back with no healing between fights
- Win all three to recover to -2, lose any fight and fall to -4

### Titan Entertainment Quests

**+1 → +2 (Building the Brand):**
- **"Take a Dive"** - Purposely lose a fight against a lower-tier champion. The rematch will be available later with better rewards
- Tests willingness to compromise for showmanship and profit

**+3 → +4 (Superstar Status):**
- **"The Main Event"** - Fight their champion in a televised match. Must use at least 3 damage-dealing techniques during the fight and win
- Tests ability to deliver entertainment AND victory

**-1 → -2 or back to 0:**
- **"The Apology Tour"** - Permanently remove one technique from your collection as a "public apology" for boring fights
- Choice: Sacrifice technique (stay at -1) or refuse (fall to -2)

**-3 → -4 or back to -2:**
- **"Blacklisted"** - They send assassins. Defeat their champion BUT you start with only 5 Focus cards instead of 7 in your starting deck
- Win with handicap to recover to -2, lose and fall to -4

### The Awakened Quests

**+1 → +2 (Seeking Enlightenment):**
- **"The Meditation"** - Fight at a Fracture Zone location and must refine 3 cards during the fight (spiritual purification)
- Win while refining to advance standing

**+3 → +4 (Transcendence):**
- **"The Spiritual Trial"** - Face one of their Phase Two Bouaux masters. Alternate win condition: Reach 15 stamina through healing (instead of reducing opponent to 0)
- Tests mastery of The Awakened's healing techniques and spiritual approach to combat

**-1 → -2 or back to 0:**
- **"Question Your Path"** - They challenge you to explain your motivations in a story choice
- Answer affects standing based on alignment with their spiritual values

**-3 → -4 or back to -2:**
- **"The Corruption"** - They believe you've been corrupted by material pursuits. Fight their champion while they add 5 Missteps to your starting deck (12 Focus, 8 Missteps total)
- Win despite corruption to recover to -2, lose and fall to -4

**Rewards and Consequences:**

**+2 (Favor):**
- Unlock mid-tier faction techniques (4-5 spirit cost) for purchase from trainers
- Positive story interactions and opportunities with faction members

**+4 (Maximum Favor):**
- Unlock game-changer faction techniques (6-8 spirit cost) for purchase from trainers
- Gain faction-specific bonus (see below)
- Maximum positive story outcomes with faction

**-2 (Disfavor):**
- Story consequences only
- Negative interactions with faction members
- Miss out on certain story opportunities and quests
- Faction members are hostile in dialogue

**-4 (Maximum Enmity):**
- Locked out of that faction's home base location (if they have one)
- Cannot purchase any of that faction's techniques
- Severe negative story consequences
- Faction actively opposes you in the narrative

### Faction-Specific Bonuses (+4 Standing)

**The Masters' Circle:**
- Can refine 1 additional card per fight for free (beyond what techniques allow)
- Represents perfecting your form through their teachings

**The Neon Dragons:**
- Start each fight with opponent having +1 Misstep in their starting deck (8 Focus, 4 Missteps total)
- Your crew sabotages opponents and spreads rumors about them

**Titan Entertainment:**
- Earn +50% credits from all fights (this replaces the +1 standing bonus)
- Corporate sponsorship and prime venue access provide maximum payouts

**The Awakened:**
- Increase base stamina by +2 (temporary while at +4 standing)
- If standing drops below +4, lose the +2 stamina bonus immediately
- Spiritual enlightenment strengthens your body and essence

**Progression:**
- Players can move between locations freely
- Higher tier trainers within a location may require completing lower tiers first (to be determined)
- Strategic decisions about which locations to visit and which factions to align with

---

## Win Conditions

### Reaching Level 5

When a player reaches Level 5, the campaign finale is triggered. The finale is a multi-part challenge based on the player's chosen background, testing whether they truly embody their background's ideal.

### Adaptive Campaign Finales

Each finale adapts to the player's collection, faction standings, and choices throughout the campaign to ensure it's always completable while remaining challenging.

---

### 1. The Oath-Keeper: "The Final Oath"
**Theme**: Prove where your loyalty truly lies

**Adaptive Setup:**
- Determine "honor path" = Masters' Circle standing
- Determine "loyalty path" = Neon Dragons standing  
- Use whichever faction standing is higher (player chooses if equal)

**Challenge:**
- Part 1: Win using only techniques from your chosen path's faction
- Part 2: Win without using techniques from the opposing path's faction
- Part 3: Win a final fight that tests your chosen philosophy:
  - If Masters' Circle: Cannot use techniques that add Missteps to opponent
  - If Neon Dragons: Must add at least 2 Missteps to opponent during the fight

---

### 2. The Legacy Bearer: "Reclaim the Name"
**Theme**: Restore or surpass your family's legacy through skill

**Challenge:**
- Part 1: Win 3 fights in a row without losing
- Part 2: Each victory must demonstrate mastery - deal 7+ damage OR end with 8+ stamina remaining
- Part 3: Final champion fight with no special restrictions

**Note**: No collection requirements - pure skill test

---

### 3. The Seeker: "The Path Revealed"
**Theme**: Demonstrate your understanding of perfection

**Adaptive Setup:**
- Identify player's highest standing between Masters' Circle and The Awakened
- If both equal, use whichever they have more techniques from
- Path A = primary faction, Path B = secondary faction

**Challenge:**
- Part 1: Win using at least 3 techniques from Path A (or ALL techniques if fewer than 3)
- Part 2: Win using at least 3 techniques from Path B (or ALL techniques if fewer than 3)
- Part 3: Win using techniques from BOTH paths (at least 2 from each, or 1 from each if limited collection)

---

### 4. The Ambitious Outsider: "King of the Hill"
**Theme**: Prove your power and dominance

**Adaptive Setup:**
- Use player's highest faction standing between Neon Dragons and Titan Entertainment
- If both equal, player chooses

**Challenge:**
- Part 1: Defeat a Tier 4 champion representing your dominant faction
- Part 2: Win with at least 5 stamina remaining
- Part 3: Immediately fight their rival faction's champion without healing between fights

---

### 5. The Exile: "The Return"
**Theme**: Face your past unbound by it

**Challenge:**
- Part 1: Win using ONLY General Techniques + Starter Techniques (no faction techniques allowed)
- Part 2: Win a second fight with the same restriction
- Part 3: Win a third fight with same restriction while refining at least 3 cards total across all three fights

**Note**: Tests whether you're truly free from faction ties - may be difficult if collection is heavily faction-focused, but always possible with General techniques

---

### 6. The Mystic Performer: "The Perfect Performance"
**Theme**: Create your masterpiece blending spectacle and spirituality

**Adaptive Setup:**
- Check if player has techniques from Titan Entertainment and/or The Awakened

**Challenge (if player has techniques from both factions):**
- Part 1: Win dealing at least 8 damage total (spectacle)
- Part 2: Win while healing at least 4 stamina (spirituality)
- Part 3: Win using at least 1 Titan Entertainment technique AND 1 Awakened technique

**Challenge (if player only has one or neither):**
- Part 1: Win dealing at least 8 damage total
- Part 2: Win while healing at least 4 stamina
- Part 3: Win using techniques from your 2 highest-standing factions (at least 1 from each)

---

### Campaign Completion

Upon completing your background's finale challenge:
- Campaign is complete - Victory!
- Ending narrative based on your faction standings, choices throughout the campaign, and finale performance
- Different endings reflect your path through the game

**Ending Variations** (to be developed):
- Faction allegiances determine political outcomes
- Background choices determine personal resolution
- Finale performance determines legacy

---

## Balance Notes

### Point Valuation System

**Base Effect Values:**
- **+1 Damage**: 2 points
- **+1 Defense**: 2 points
- **+1 Action**: 1.5 points
- **Draw 1 Card**: 1.5 points
- **+1 Spirit**: 1 point
- **Channel 1 Additional Card**: 2 points
- **Refine 1 Card**: 1.5 points
- **Add 1 Misstep to Opponent**: 1 point
- **Heal 1 Stamina**: 2 points

**Expected Value by Cost:**
- **3 spirit**: ~3-4 points
- **4 spirit**: ~4-5 points
- **5 spirit**: ~5-7 points
- **6 spirit**: ~6-8 points
- **7 spirit**: ~7-9 points
- **8 spirit**: ~8-10 points

### Faction Point Totals (Current)

- **Masters' Circle**: 28-29 points (avg 7-7.25 per card) - HIGHEST
- **The Awakened**: 26.5 points (avg 6.6 per card)
- **Titan Entertainment**: 26 points (avg 6.5 per card)
- **Neon Dragons**: 25 points (avg 6.25 per card) - LOWEST

### Cards Flagged for Review

**Significantly Overpowered:**
- **Transcendent Strike** (The Awakened, 7 spirit): 11.5 points (expected 7-9)
  - Current: 2 damage + heal 3 + draw 1
  - Suggested fix: 2 damage + heal 2 + draw 1 (9.5 points)

**Significantly Underpowered:**
- **Targeted Strike** (Titan Entertainment, 6 spirit): 3.5 points (expected 6-8)
  - Current: Refine 1 + 1 damage
  - Suggested fix: Refine 2 + 1 damage (5 points)

**Slightly Above Curve:**
- **Perfect Form** (Masters' Circle, 4 spirit): 6 points (expected 4-5)
- **Enlightened Flow** (The Awakened, 4 spirit): 5.5 points (expected 4-5)

**Slightly Below Curve:**
- **Devastating Blow** (Titan Entertainment, 8 spirit): 7.5 points (expected 8-10)
  - Potential fix: Add +1 spirit or change to draw 2 cards

### Balance Goals
- Target: All factions within 3-4 total points of each other
- After suggested fixes: Masters' Circle (28-29), Titan Entertainment (27.5), Neon Dragons (25), The Awakened (24.5)

---

## Next Steps

### Campaign Design - Complete! ✅

The core campaign design is complete with all major systems defined:
1. ✅ Four factions with philosophies, standing system, and quests
2. ✅ All 30 techniques (7 starter, 16 faction, 7 general)
3. ✅ Species selection mechanics (4 species)
4. ✅ XP/leveling system (5 levels)
5. ✅ Money/economy system
6. ✅ Six player backgrounds with story milestones
7. ✅ Nine locations with random faction assignment
8. ✅ Complete game flow and order of operations
9. ✅ Quest system (faction and milestone quests)
10. ✅ Adaptive campaign finales

### Future Development

**For Implementation:**
- Specific champion deck compositions and AI behavior
- Detailed ending narrative variations
- Trainer dialogue and personality
- Quest-specific encounter details
- Balance testing and refinement

**For Expansion:**
- Additional backgrounds
- Additional species
- More locations
- New techniques
- Alternative campaign modes