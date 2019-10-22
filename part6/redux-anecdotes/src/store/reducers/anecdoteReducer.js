import *as actionTypes from '../actions/actionTypes'

const findById = (state, action) => {
  const index = state.findIndex((item) => {
    return item.id === action.payload.id
  });

  const newState = [...state];
  newState[index] = { ...state[index], votes: state[index].votes + 1 }

  return newState
}

const initStateFromDb = (state, action) => {
  const newState = action.payload;
  return newState
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.ADD_VOTE: return findById(state, action)
    case actionTypes.FETCH_INIT_STATE: return initStateFromDb(state, action)

    default: return state;
  }

}

export default reducer