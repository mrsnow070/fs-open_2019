import { createdNotification, hideNotification } from './notificationActions';
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

            dispatch(createdNotification(result.data.content));

            setTimeout(() => {
                dispatch(hideNotification())
            }, 5000);
            dispatch(getAll());

        } catch (exception) {
            console.log(exception)
        }


    }
}


