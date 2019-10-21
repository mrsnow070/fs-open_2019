import React from 'react'
import { vote } from '../reducers/anecdoteReducer';

export const AnecdoteList = ({ store }) => {
    let anecdotes = store.getState();
    anecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
    return (
        <>
            
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => store.dispatch(vote(anecdote.id))}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList 