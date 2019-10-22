import React, { useEffect } from 'react'

export const Notification = ({ notification }) => {
    
    useEffect(() => {
        setTimeout(() => {
            notification.setNotification('')
        }, 10000)
    }, [notification])

    let notif = null;
    if (notification.notification) {
        notif = notification.notification
    }

    return (

        <div>
            {notif}
        </div>


    )
}

export default Notification