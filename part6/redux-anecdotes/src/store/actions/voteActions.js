import { voteNotification, hideNotification } from './notificationActions';
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
            dispatch(voteNotification(result.data.content))
            setTimeout(() => {
                dispatch(hideNotification())
            }, 5000)
        } catch (exception) {
            console.log(exception)
        }
        // dispatch(voteINCR(anecdote.id))


    }
}
