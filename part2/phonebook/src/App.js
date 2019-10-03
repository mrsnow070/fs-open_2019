import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm/PersonForm';
import Filter from './components/Filter/Filter';
import Persons from './components/Persons/Persons';
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(
        (resp) => setPersons([...resp.data]))
  }, [])


  const [filter, setFilter] = useState('');

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} updateFilter={setFilter} />

      <h2>Add a new</h2>
      <PersonForm persons={persons} updatePersons={setPersons} />

      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons} />
    </div>
  )
}

export default App