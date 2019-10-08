import React from 'react';

export default ({ filter, updateFilter }) => {
    const inputFilterHandler = e => {
        updateFilter(e.target.value);
    }
    return (
        <div>
            filter shown with: <input
                value={filter}
                onChange={inputFilterHandler}
            />
        </div>
    )
};