import * as actionTypes from '../actions/actionTypes';

const initialState = {
    users: [],
}

const setUsers = (state, action) => {
    return {
        users: action.payload
    }
}

export default (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case actionTypes.GET_ALL_USERS: return setUsers(state, action)

        default:
            return state
    }
}   
