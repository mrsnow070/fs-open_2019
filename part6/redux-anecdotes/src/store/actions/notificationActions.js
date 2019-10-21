import * as actionTypes from './actionTypes';

export const hideNotification = () => {
    return {
        type: actionTypes.NOTIFICATION_HIDE
    }
}

export const voteNotification = (content) => {
    return {
        type: actionTypes.NOTIFICATION_VOTE,
        payload: content
    }
}
export const createdNotification = (content) => {
    return {
        type: actionTypes.NOTIFICATION_CREATED,
        payload: content
    }
}