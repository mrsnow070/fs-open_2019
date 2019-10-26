import *as actionTypes from './actionTypes';
import axios from 'axios';
import { getAll as getAllBlogs } from './blogActions'

const baseUrl = '/api/users';


export const getAllUsers = () => {
    return async dispatch => {
        dispatch(getAllBlogs())
        const { data } = await axios.get(baseUrl)
        dispatch(setUsers(data))
    }
}

const resetUser = () => {
    return {
        type: actionTypes.RESET_USER
    }
}

const setUsers = (users) => {
    return {
        type: actionTypes.GET_ALL_USERS,
        payload: users
    }
}

export const getUser = (id) => {
    return async dispatch => {
        dispatch(resetUser())
        const { data } = await axios.get(`${baseUrl}/${id}`)


        dispatch(setUser(data))
    }
}

const setUser = (data) => {
    return {
        type: actionTypes.SET_USER,
        payload: data
    }
}
