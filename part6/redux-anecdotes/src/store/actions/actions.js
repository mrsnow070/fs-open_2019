import * as actionTypes from './actionTypes';

export const vote = (anecdote) => {
    return dispatch => {
        dispatch(voteINCR(anecdote.id))
        dispatch(voteNotification(anecdote.content))
        setTimeout(() => {
            dispatch(hideNotification())
        }, 5000)
    }
}
const voteINCR = (id) => {
    return {
        type: actionTypes.INCR,
        payload: {
            id: id
        }
    }
}

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

const hideNotification = () => {
    return {
        type: actionTypes.NOTIFICATION_HIDE
    }
}

const voteNotification = (content) => {
    return {
        type: actionTypes.NOTIFICATION_VOTE,
        payload: content
    }
}
const createdNotification = (content) => {
    return {
        type: actionTypes.NOTIFICATION_CREATED,
        payload: content
    }
}