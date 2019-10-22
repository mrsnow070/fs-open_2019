import { setNotification } from './notificationActions';
import axios from 'axios';
import { getAll } from './fetchActions'

export const create = (data) => {
    return async dispatch => {
        const dataObj = {
            content: data,
            votes: 0
        }

        try {
            const result = await axios
                .post('http://localhost:3001/anecdotes', dataObj);

            dispatch(setNotification(
                `New anecdote ${result.data.content} has been created`,
                10
            ));

            dispatch(getAll());

        } catch (exception) {
            console.log(exception)
        }


    }
}


