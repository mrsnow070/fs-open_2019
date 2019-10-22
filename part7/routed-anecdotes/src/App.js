import React, { useState } from 'react';
import { Route } from 'react-router-dom'
import AnecdoteList from './components/AnecdoteList';
import About from './components/About';
import CreateNew from './components/CreateNew';
import Layout from './components/Layout';
import Anecdote from './components/Anecdote';

const App = () => {

  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')


  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))

  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)


    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <Layout notification={{ notification, setNotification }}>


      <Route path="/" exact render={() => <AnecdoteList anecdotes={anecdotes} />} />
      <Route path="/anecdotes/:id" exact render={
        ({ match }) =>
          <Anecdote
            anecdote={anecdoteById(match.params.id)}
            vote={vote}
          />}
      />
      <Route path="/about" render={() => <About />} />
      <Route path="/create-new" render={() => <CreateNew
        setNotification={setNotification}
        addNew={addNew} />}
      />
    </Layout>
  )
}

export default App;