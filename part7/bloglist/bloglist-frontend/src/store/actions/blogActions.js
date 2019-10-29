import *as actionTypes from './actionTypes';
import { setNotification } from './notificationActions';
import axios from 'axios';

const baseUrl = '/api/blogs';

export const addComment = (data, token) => {
    if (token) {
        return async dispatch => {
            try {
                await axios.post('/api/comment', data, getConfig(token))
                dispatch(getAll())
            } catch ({ response }) {
                console.log(response)
            }
        }
    } else {
        return async dispatch => {
            try {
                await axios.post('/api/comment/annon', data)
                dispatch(getAll())
            } catch ({ response }) {
                console.log(response)
            }
        }
    }
}

export const getAll = () => {
    return async dispatch => {

        dispatch(blogStartAction());
        try {
            const { data } = await axios.get(baseUrl)
            data.sort((a, b) => b.likes - a.likes)
            dispatch(getSuccess(data));
        } catch (exception) {
            dispatch(setNotification('error', exception.response.request.statusText))
            dispatch(getFail())
        }
    }
}

const getSuccess = (data) => {
    return {
        type: actionTypes.GET_ALL_BLOGS_SUCCESS,
        payload: data
    }
}


const blogStartAction = () => {

    return {
        type: actionTypes.BLOG_ACTION_START
    }
}

const getFail = () => {

    return {
        type: actionTypes.BLOG_ACTION_FAIL
    }
}

const getConfig = (newToken) => {
    return {
        headers: {
            Authorization: `bearer ${newToken}`
        }
    }
}

export const createNewBlog = (data, token) => {

    return async dispatch => {
        dispatch(blogStartAction())

        try {
            const result = await axios.post(baseUrl, data, getConfig(token));
            dispatch(getAll())
            dispatch(setNotification('notification', `New blog ${result.data.title} added`))

        } catch (exception) {
            dispatch(setNotification('error', exception.response.data.error))
            dispatch(getFail())

        }

    }
}

export const remove = (id, token) => {

    return async dispatch => {
        dispatch(blogStartAction());
        try {
            if (window.confirm()) {
                await axios.delete(
                    `/api/blogs/${id}`,
                    getConfig(token)
                )
                dispatch(getAll())
                dispatch(setNotification('notification', 'Entry successefuly deleted'))
            }
        } catch (exception) {
            console.log(exception.response);

        }
    }
}

export const addLike = (id, data) => {
    return async dispatch => {
        dispatch(blogStartAction());
        try {
            await axios.put(`${baseUrl}/${id}`, data)
            dispatch(getAll())

        } catch (exception) {
            console.log(exception.response);

        }

    }
}