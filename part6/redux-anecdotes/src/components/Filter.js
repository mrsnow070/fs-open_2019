import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import * as actions from '../store/actions/actions'

export const Filter = ({ anecdotes, updateFilter }) => {
    const [filter, setFilter] = useState('');
    
    useEffect(() => {
        updateFilter(filter, anecdotes);
    }, [filter, updateFilter, anecdotes])

    const filterHandler = (e) => {
        setFilter(e.target.value)
    }

    return (
        <div>
            filter<input
                value={filter}
                onChange={filterHandler}
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdote
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateFilter: (filter, array) => dispatch(actions.applyFilter(filter, array))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)