import * as actionTypes from './actionTypes';

export const hideNotification = () => {
    return {
        type: actionTypes.NOTIFICATION_HIDE
    }
}

export const setNotification = (text, time) => {

    return dispatch => {
        dispatch(notification(text))

        setTimeout(() => {
            dispatch(hideNotification());
        }, time * 1000)
    }
}

const notification = (text) => {
    return {
        type: actionTypes.NOTIFICATION_SHOW,
        payload: text
    }
}

 