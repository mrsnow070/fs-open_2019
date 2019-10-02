import React, { useState } from 'react'
import PersonForm from './components/PersonForm/PersonForm';
import Filter from './components/Filter/Filter';
import Persons from './components/Persons/Persons';

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);

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