import * as actionTypes from '../actions/actionTypes';

const initialState = {
    users: [],
    singleUser: {
        blogs: [],
        id: '',
        name: '',
        username: ''
    },
    loading: true
}

const setUsers = (state, action) => {
    return {
        ...state,
        users: action.payload,
        loading: false
    }
}

const setOneUser = (state, action) => {

    return {
        ...state,
        singleUser: action.payload,
        loading: false
    }
}

const resetUser = (state, action) => {
    return initialState
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_USERS: return setUsers(state, action)
        case actionTypes.SET_USER: return setOneUser(state, action)
        case actionTypes.RESET_USER: return resetUser(state, action)

        default:
            return state
    }
}   
