import * as actionTypes from '../actions/actionTypes';

const initialState = {
    blogs: [],
    loading: false
}

const getAllSuccess = (state, action) => {
    return {
        ...state,
        blogs: action.payload,
        loading: false
    }
}
const failAction = (state, action) => {
    return {
        ...state,
        loading: false
    }
}

const startAction = (state, action) => {
    return {
        ...state,
        loading: true
    }
}

 

export default (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.GET_ALL_BLOGS_SUCCESS: return getAllSuccess(state, action)
        case actionTypes.BLOG_ACTION_START: return startAction(state, action)
        case actionTypes.BLOG_ACTION_FAIL: return failAction(state, action)

        default:
            return state
    }
}   
