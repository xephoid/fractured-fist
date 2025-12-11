import React from 'react';
import LogLine from '../common/LogLine';

export default function DefeatScreen({ onContinue, log }) {
    return (
        <div className="screen container" style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#220000',
            color: 'white'
        }}>
            <h1 style={{ fontSize: '48px', color: 'red', marginBottom: '20px' }}>DEFEAT</h1>
            <p style={{ fontSize: '18px', marginBottom: '40px' }}>You have been bested in combat.</p>

            {/* Combat Log Review */}
            <div style={{
                width: '100%', maxWidth: '500px',
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid #555',
                borderRadius: '8px',
                marginBottom: '30px',
                padding: '10px',
                maxHeight: '200px',
                overflowY: 'auto',
                fontSize: '12px',
                color: '#ccc',
                textAlign: 'left'
            }}>
                <h3 style={{ marginTop: 0, borderBottom: '1px solid #444', paddingBottom: '5px' }}>Combat Log</h3>
                {log && log.slice().reverse().map((l, i) => (
                    <LogLine key={i} text={l} />
                ))}
            </div>

            <button
                onClick={onContinue}
                style={{
                    padding: '15px 30px',
                    fontSize: '20px',
                    background: '#444',
                    color: 'white',
                    border: '1px solid #666',
                    cursor: 'pointer'
                }}
            >
                Retreat & Recover
            </button>
        </div>
    );
}
