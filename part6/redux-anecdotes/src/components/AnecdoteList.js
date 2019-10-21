import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../store/actions/actions';

export const AnecdoteList = (props) => {

    const { store, vote } = props;
    let anecdotes = store;

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
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        store: state.anecdote,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        vote: (anecdote) => {
            dispatch(actions.vote(anecdote))
            
        },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList) 