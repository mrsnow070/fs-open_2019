import * as actionTypes from './actionTypes';


export const setNotification = (type, message, timeout = 10) => {
    const notifData = {
        show: true,
        type: type,
        message: message
    }
    return async dispatch => {
        dispatch(notificationShow(notifData))

        setTimeout(() => {
            dispatch(notificationHide())
        }, timeout * 1000)
    }

}

const notificationShow = (data) => {
    return {
        type: actionTypes.NOTIFICATION_SHOW,
        payload: data
    }
}
export const notificationHide = () => {
    return {
        type: actionTypes.NOTIFICATION_HIDE
    }
}