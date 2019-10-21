import * as actionTypes from '../actions/actionTypes'

const initialState = {
    filter: '',
    anecdotes: []
}

function findMatches(wordToMatch, array) {
    return array.filter(anec => {
        const regex = new RegExp(wordToMatch, 'gi');
        return anec.content.match(regex);
    })
}

const filterHandler = (state, action) => {
    const filtered = findMatches(action.payload.filter, action.payload.array)
    return {
        filter: action.payload.filter,
        anecdotes: [...filtered]
    }
}




export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FILTER: return filterHandler(state, action)

        default:
            return state
    }
}