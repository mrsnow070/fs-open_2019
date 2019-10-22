import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../store/actions/actions';

export const AnecdoteList = (props) => {
    const { store, vote, filter } = props;
    let anecdotes = store;

    const style = {
        border: '1px solid black',
        padding: '5px',
        marginBottom: '5px',
        borderRadius: '5px'
    }

    if (filter.filter.length > 0) {
        anecdotes = [...props.filter.anecdotes]
    }

    anecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
    return (
        <>
            {anecdotes.map(anecdote =>
                <div style={style}
                    key={anecdote.id}>
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
        filter: state.filter
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        vote: (anecdote) => {
            dispatch(actions.vote(anecdote))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList) 