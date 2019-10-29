import *as actionTypes from './actionTypes';
import axios from 'axios';


import { setNotification } from './notificationActions'

const baseUrl = '/api/login';

export const authCheckout = () => {


    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser');

        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            dispatch(authSuccess(user))
        }
    }
}

export const auth = (data) => {
    console.log(data);

    return async dispatch => {
        dispatch(authStart())
        try {
            const result = await axios.post(baseUrl, data)
            dispatch(authSuccess(result.data))
        } catch (exception) {
            dispatch(setNotification('error', exception.response.data.error))
            dispatch(authFail())
        }
    }
}

const authFail = () => {
    return {
        type: actionTypes.AUTH_FAIL
    }
}

const authSuccess = (data) => {
    window.localStorage.setItem('loggedUser', JSON.stringify(data))

    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: data
    }
}

export const authLogout = () => {
    window.localStorage.clear();

    return {
        type: actionTypes.AUTH_LOGOUT
    }
}


const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}