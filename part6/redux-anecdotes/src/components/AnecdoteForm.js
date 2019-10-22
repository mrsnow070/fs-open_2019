import React, { useState } from 'react'
import { connect } from 'react-redux'
import * as actions from '../store/actions/actions';


export const AnecdoteForm = ({ addAnecdote }) => {
    const [anecdote, setAnecdote] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        addAnecdote(anecdote);
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

const mapDispatchToProps = (dispatch) => {
    return {
        addAnecdote: (data) => {
            dispatch(actions.create(data))
        }

    }
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)