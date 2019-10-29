import * as actionTypes from '../actions/actionTypes';


const initialState = {
    isAuth: false,
    data: { name: '', token: null, username: '' },
    loading: false
}

const authSuccess = (state, action) => {
    return {
        isAuth: true,
        data: action.payload,
        loading: false
    }
}

const authStart = (state) => {
    return {
        ...state,
        loading: true
    }
}
const authFail = (state) => {
    return {
        ...state,
        loading: false
    }
}
const authLogout = () => {
    return initialState
}


export default (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state);
        case actionTypes.AUTH_LOGOUT: return authLogout();


        default:
            return state
    }
}   