import React from 'react'

export const Anecdote = ({ anecdote, vote }) => {
    const style = {
        border: '1px solid black',
        padding: '5px',
        marginBottom: '5px',
        borderRadius: '5px'
    }
    return (
        <div>
            <div style={style} >
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)
                    }>vote</button>
                </div>
            </div>
        </div >
    )
}

export default Anecdote