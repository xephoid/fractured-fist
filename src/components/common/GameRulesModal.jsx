import React from 'react';

export default function GameRulesModal({ setShowRules }) {
    return (
        <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 100,
            padding: '40px', overflowY: 'auto'
        }}>
            <div style={{ maxWidth: '600px', margin: '0 auto', background: '#222', padding: '20px', borderRadius: '8px', border: '1px solid #444' }}>
                <h2 style={{ color: 'gold', marginTop: 0 }}>Rules of Combat</h2>
                <ul style={{ lineHeight: '1.6', color: '#ddd' }}>
                    <li><strong>Goal:</strong> Build a deck of cards that can reduce opponent's Stamina to 0.</li>
                    <li><strong>Setup:</strong> Each player shuffles a deck of 10 cards containing 7 focus and 3 missteps. Draw 5 cards.</li>
                    <li><strong>Each turn has three phases:</strong></li>
                    <li><strong>Phase 1: Technique</strong> - Play <strong>technique</strong> cards which have various effects. One card per turn, unless otherwise specified.</li>
                    <li><strong>Phase 2: Channel</strong> - Spend <span style={{ color: 'yellow' }}>spirit</span> (Focus, Momentum, Mastery) to buy new cards. You start with 1 Channel (Buy). Purchased cards are added to your discard pile.</li>
                    <li><strong>Phase 3: Cleanup</strong> - Discard your hand and draw 5 new cards. If your deck is empty reshuffle your discard pile.</li>
                    <li><strong>Resolution:</strong> Damage and Defense are calculated simultaneously after both players have played their turns.</li>
                    <li><strong>Refining:</strong> Specialized cards like <span style={{ color: 'cyan' }}>Assess</span> allow you to "Refine" (Trash) weak cards permanently.</li>
                    <li><strong>Missteps:</strong> Useless clutter cards added by enemies. Refine them to clean your deck.</li>
                    <li><strong>Catch Up:</strong> If you have less Stamina than your opponent, you may discard all your <span style={{ color: 'yellow' }}>Focus</span> cards to draw that many new cards.</li>
                </ul>
                <button onClick={() => setShowRules(false)} style={{ marginTop: '20px', width: '100%', padding: '10px' }}>Got it</button>
            </div>
        </div>
    );
}