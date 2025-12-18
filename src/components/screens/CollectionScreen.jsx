import React, { useState } from 'react';
import { useCampaign } from '../../context/CampaignContext';
import { TECHNIQUES, CARD_TYPES } from '../../data/techniques';
import TooltippedName from '../common/TooltippedName';

// Reusable for grid
const CardItem = ({ cardId, isSelected, onClick }) => {
    const def = TECHNIQUES.find(c => c.id === cardId);
    if (!def) return null;

    return (
        <div
            onClick={onClick}
            style={{
                border: isSelected ? '3px solid cyan' : '1px solid #555',
                borderRadius: '8px',
                padding: '10px',
                background: '#222',
                cursor: 'pointer',
                opacity: isSelected ? 1 : 0.6,
                width: '120px',
                height: '160px',
                display: 'flex', flexDirection: 'column'
            }}
        >
            <div style={{ fontWeight: 'bold', borderBottom: '1px solid #444', paddingBottom: '5px', marginBottom: '5px' }}>
                <TooltippedName techniqueId={def.id} />
            </div>
            <div style={{ fontSize: '10px', color: '#aaa' }}>{def.type}</div>
            <div style={{ flex: 1, fontSize: '11px', overflow: 'hidden' }}>{def.description}</div>
            <div style={{ textAlign: 'right', fontWeight: 'bold', color: 'lightblue' }}>{def.cost} Spirit</div>
        </div>
    );
};

export default function CollectionScreen({ onBack }) {
    const { state, dispatch } = useCampaign();
    const collection = state.player.collection || [];
    const initialLoadout = state.player.loadout || [];

    const [selected, setSelected] = useState([...initialLoadout]);

    const handleToggle = (id) => {
        if (selected.includes(id)) {
            setSelected(prev => prev.filter(c => c !== id));
        } else {
            if (selected.length >= 7) return; // Limit 7
            setSelected(prev => [...prev, id]);
        }
    };

    const handleSave = () => {
        if (selected.length !== 7) {
            alert("You must select exactly 7 techniques.");
            return;
        }
        dispatch({ type: 'SET_LOADOUT', payload: selected });
        onBack();
    };

    return (
        <div className="screen container">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0' }}>
                <h1>Available Techniques</h1>
                <small>Choose which techniques you will have available in a fight.</small>
                <div>
                    <span style={{ color: selected.length === 7 ? 'lightgreen' : 'orange', marginRight: '20px' }}>
                        Selected: {selected.length} / 7
                    </span>
                    <button onClick={handleSave} disabled={selected.length !== 7}>Save & Return</button>
                </div>
            </header>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                {collection.map(id => (
                    <CardItem
                        key={id}
                        cardId={id}
                        isSelected={selected.includes(id)}
                        onClick={() => handleToggle(id)}
                    />
                ))}
            </div>
        </div>
    );
}
