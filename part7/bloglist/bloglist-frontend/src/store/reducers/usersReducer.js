import * as actionTypes from '../actions/actionTypes';

const initialState = {
    users: [],
    singleUser: {
        blogs: [],
        id: '',
        name: '',
        username: ''
    }
}

const setUsers = (state, action) => {
    return {
        ...state,
        users: action.payload,
    }
}

const setOneUser = (state, action) => {
    console.log(action)
    return {
        ...state,
        singleUser: action.payload
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_USERS: return setUsers(state, action)
        case actionTypes.SET_USER: return setOneUser(state, action)

        default:
            return state
    }
}   
