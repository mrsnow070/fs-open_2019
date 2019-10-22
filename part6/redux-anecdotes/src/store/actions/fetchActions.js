import * as actionTypes from './actionTypes';
import axios from 'axios';


export const fetchInitState = () => {
    return async dispatch => {
        const resp = await axios.get('http://localhost:3001/anecdotes')
        dispatch(setData(resp.data))
    }
}

const setData = (data) => {
    return {
        type: actionTypes.FETCH_INIT_STATE,
        payload: data
    }
}

export const updateOne = (one) => {

    return {
        type: actionTypes.ADD_VOTE,
        payload: one
    }

}

export const getAll = () => {

    return async dispatch => {
        const resp = await axios.get('http://localhost:3001/anecdotes')
        dispatch(setData(resp.data))
    }

}

