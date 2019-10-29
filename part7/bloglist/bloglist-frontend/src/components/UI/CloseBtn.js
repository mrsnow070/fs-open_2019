import React from 'react'

export const CloseBtn = ({ closeHandler }) => {
    return (
        <span
            onClick={closeHandler}
            className="btn-close">
                &times;
            </span>
    )
}

export default CloseBtn