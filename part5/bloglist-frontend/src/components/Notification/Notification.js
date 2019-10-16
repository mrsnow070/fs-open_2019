import React, { useEffect } from 'react';
import PropTypes from 'prop-types'

import './Notification.css';

const Notification = ({ message, type, setter }) => {

    let className = ['announce']
    useEffect(() => {
        setTimeout(() => {
            setter({ type: null, message: '' })
        }, 5000)
    }, [message, setter, className, type])

    if (type === 'error') {
        className.push('error')
    }
    if (type === 'notification') {
        className.push('notification');
    }
    if (type === null) {
        return null
    }




    return (
        <div className={className.join(' ')}>
            {message}
        </div>
    )
}

Notification.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
}

export default Notification;

