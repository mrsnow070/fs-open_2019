import * as actionTypes from './actionTypes';
import { voteNotification, hideNotification } from './notificationActions';

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