import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { TECHNIQUES } from '../../data/techniques';

const TooltippedName = ({ techniqueId, color = 'inherit' }) => {
    const def = TECHNIQUES.find(t => t.id === techniqueId);
    const [coords, setCoords] = useState(null);
    const triggerRef = useRef(null);

    if (!def) return <span style={{ color }}>{techniqueId}</span>;

    const handleMouseEnter = () => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            setCoords({
                left: rect.left + (rect.width / 2),
                top: rect.top,
                bottom: rect.bottom
            });
        }
    };

    const handleMouseLeave = () => {
        setCoords(null);
    };

    return (
        <>
            <span
                ref={triggerRef}
                style={{ color, borderBottom: '1px dotted #555', cursor: 'help' }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {def.name}
            </span>
            {coords && createPortal(
                <div style={{
                    position: 'fixed',
                    left: coords.left,
                    top: coords.top < 150 ? coords.bottom + 10 : coords.top - 10,
                    transform: 'translateX(-50%)', // Center horizontally
                    backgroundColor: '#1a1a1a',
                    color: '#fff',
                    padding: '10px',
                    borderRadius: '6px',
                    zIndex: 9999,
                    pointerEvents: 'none',
                    width: 'max-content',
                    maxWidth: '250px',
                    fontSize: '12px',
                    border: '1px solid #444',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.5)',
                    textAlign: 'left'
                }}>
                    <strong style={{ display: 'block', marginBottom: '5px', color: 'gold', fontSize: '14px' }}>{def.name}</strong>
                    <div style={{ lineHeight: '1.4', marginBottom: '8px', color: '#ccc' }}>{def.description}</div>
                    <div style={{ fontSize: '10px', color: '#666', borderTop: '1px solid #333', paddingTop: '4px', display: 'flex', justifyContent: 'space-between' }}>
                        <span>Type: {def.type}</span>
                        <span>Cost: {def.cost} Spirit</span>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
};

export default TooltippedName;
