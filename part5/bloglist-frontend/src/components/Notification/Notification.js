import React, { useEffect } from 'react';
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

export default Notification;