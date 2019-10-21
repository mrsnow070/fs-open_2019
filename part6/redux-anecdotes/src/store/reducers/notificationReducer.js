import *as actionTypes from '../actions/actionTypes'

const initialState = {
    message: '',
    show: false
}
const voted = (state, action) => {
    return {
        message: `you voted ${action.payload}`,
        show: true
    }
}
const createdNew = (state, action) => {
    return {
        message: `New anecdote ${action.payload} has been created`,
        show: true
    }
}

const hideNotification = (state, action) => {
    if (state.show) {
        return initialState
    }
    return state
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.NOTIFICATION_VOTE: return voted(state, action);
        case actionTypes.NOTIFICATION_CREATED: return createdNew(state, action);
        case actionTypes.NOTIFICATION_HIDE: return hideNotification(state, action);

        default: return state;
    }

}

export default reducer