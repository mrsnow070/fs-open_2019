import * as actionTypes from './actionTypes';
import { createdNotification, hideNotification } from './notificationActions';

export const create = (data) => {
    return dispatch => {
        dispatch(createNew(data));
        dispatch(createdNotification(data))
        setTimeout(() => {
            dispatch(hideNotification())
        }, 5000)
    }
}
const createNew = (data) => {
    return {
        type: actionTypes.CREATE,
        payload: data
    }
}

