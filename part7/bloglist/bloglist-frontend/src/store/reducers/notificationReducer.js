import * as actionTypes from '../actions/actionTypes';

const initialState = {
    type: '',
    message: '',
    show: false,
}

const showNotification = (state, action) => {
    return {
        type: action.payload.type,
        message: action.payload.message,
        show: true,
    }
}

const hideNotification = (state, action) => {
    return initialState
}

export default (state = initialState, action) => {


    switch (action.type) {
        case actionTypes.NOTIFICATION_SHOW: return showNotification(state, action)
        case actionTypes.NOTIFICATION_HIDE: return hideNotification(state, action)

        default:
            return state
    }
}   