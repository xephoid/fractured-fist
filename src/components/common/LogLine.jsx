import React from 'react';
import { TECHNIQUES } from '../../data/techniques';
import TooltippedName from './TooltippedName';

const LogLine = ({ text }) => {
    let parts = [text];
    TECHNIQUES.forEach(tech => {
        let newParts = [];
        parts.forEach(part => {
            if (typeof part !== 'string') { newParts.push(part); return; }
            if (part.includes(tech.name)) {
                const split = part.split(tech.name);
                for (let i = 0; i < split.length; i++) {
                    if (split[i]) newParts.push(split[i]);
                    if (i < split.length - 1) {
                        newParts.push(<TooltippedName key={`${tech.id}-${i}`} techniqueId={tech.id} color="#bbb" />);
                    }
                }
            } else {
                newParts.push(part);
            }
        });
        parts = newParts;
    });
    return <div>{parts}</div>;
};

export default LogLine;
