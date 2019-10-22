import React, { useEffect } from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import Filter from './components/Filter';
import * as actions from './store/actions/actions';
import { connect } from 'react-redux'

const App = ({ fetchInitData }) => {
  useEffect(() => {
    fetchInitData();
  }, [fetchInitData])
  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div >
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchInitData: () => dispatch(actions.fetchInitState())
  }
}

export default connect(null, mapDispatchToProps)(App)