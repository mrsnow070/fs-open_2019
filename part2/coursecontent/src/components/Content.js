import React from 'react';
import Part from './Part';
import Total from './Total';

const Content = ({ content }) => {
    let displayParts = content.parts.map(
        p => <Part
            key={p.id}
            name={p.name}
            exercise={p.exercises}
        />
    );
    const total = content.parts.reduce((t, e) => {
        return t + e.exercises
    }, 0)


    return (
        <div>
            {displayParts}
            <Total count={total} />
        </div>
    )
}

export default Content;