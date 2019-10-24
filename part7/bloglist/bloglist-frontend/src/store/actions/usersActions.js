import *as actionTypes from './actionTypes';
import axios from 'axios';

const baseUrl = '/api/users';


export const getAllUsers = () => {
    return async dispatch => {
        const { data } = await axios.get(baseUrl)
        dispatch(setUsers(data))
    }
}

const setUsers = (users) => {
    return {
        type: actionTypes.GET_ALL_USERS,
        payload: users
    }
}
