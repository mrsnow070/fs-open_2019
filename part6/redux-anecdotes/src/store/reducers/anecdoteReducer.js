import *as actionTypes from '../actions/actionTypes'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const findById = (state, action) => {
  const index = state.findIndex((item) => {
    return item.id === action.payload.id
  });

  const newState = [...state];
  newState[index] = { ...state[index], votes: state[index].votes + 1 }

  return newState
}

const addNew = (state, action) => {
  const newState = state.concat(asObject(action.payload))
  return newState
}

 

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case actionTypes.INCR: return findById(state, action)
    case actionTypes.CREATE: return addNew(state, action)

    default: return state;
  }

}

export default reducer