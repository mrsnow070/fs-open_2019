import * as actionTypes from '../actions/actionTypes';


const initialState = {
    isAuth: false,
    data: null,
    loading: false
}

const authSuccess = (state, action) => {
    return {
        isAuth: true,
        data: action.payload,
        loading: false
    }
}

const authStart = (state, action) => {
    return {
        ...state,
        loading: true
    }
}
const authFail = (state, action) => {
    return {
        ...state,
        loading: false
    }
}
const authLogout = (state, action) => {
    return initialState
}


export default (state = initialState, action) => {
  
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);


        default:
            return state
    }
}   