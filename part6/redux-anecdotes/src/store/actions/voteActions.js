import { setNotification } from './notificationActions';
import { updateOne } from './fetchActions';
import axios from 'axios';


export const vote = (anecdote) => {
    return async dispatch => {
        try {
            const newObj = {
                ...anecdote,
                votes: anecdote.votes + 1
            }
            const result = await axios.put(`http://localhost:3001/anecdotes/${anecdote.id}`, newObj)
            dispatch(updateOne(result.data))
            dispatch(setNotification(
                `you voted ${result.data.content}`,
                10
            ));
        } catch (exception) {
            console.log(exception)
        }
    }
}
