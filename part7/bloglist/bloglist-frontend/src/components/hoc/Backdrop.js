import React from 'react'

export const Backdrop = ({ children }) => {
    return (
        <div className="backdrop">
            {children}
        </div>
    )
}

export default Backdrop