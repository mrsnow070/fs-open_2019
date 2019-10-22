import *as actionTypes from '../actions/actionTypes'

const initialState = {
    message: '',
    show: false
}

const showNotification = (state, action) => {
    return {
        message: action.payload,
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
        case actionTypes.NOTIFICATION_HIDE: return hideNotification(state, action);
        case actionTypes.NOTIFICATION_SHOW: return showNotification(state, action);

        default: return state;
    }

}

export default reducer