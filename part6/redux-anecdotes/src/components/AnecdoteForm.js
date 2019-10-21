import React, { useState } from 'react'
import { vote, create } from '../reducers/anecdoteReducer';


export const AnecdoteForm = ({ store }) => {
    const [anecdote, setAnecdote] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        store.dispatch(create(anecdote))
    }
    return (
        <>
            <h2>create new</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <input
                        value={anecdote}
                        onChange={(e) => setAnecdote(e.target.value)}
                    />
                </div>
                <button>create</button>
            </form>
        </>
    )
}

export default AnecdoteForm 