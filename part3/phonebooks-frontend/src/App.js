import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm/PersonForm';
import Filter from './components/Filter/Filter';
import Persons from './components/Persons/Persons';
import { getAll } from "./services/phonebookService";
import Notification from './components/Notification/Notification';



const App = () => {
  const [persons, setPersons] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState({
    type: null,
    message: ''
  })

  useEffect(() => {
    getAll().then(resp => setPersons([...resp]))

  }, [])

  const [filter, setFilter] = useState('');

  return (
    <div>
      {notificationMessage.type === null ? null
        : <Notification
          type={notificationMessage.type}
          message={notificationMessage.message}
          setter={setNotificationMessage}
        />
      }
      <h2>Phonebook</h2>
      <Filter
        filter={filter}
        updateFilter={setFilter}
      />

      <h2>Add a new</h2>
      <PersonForm
        updatePersons={setPersons}
        updateNotification={setNotificationMessage}
      />

      <h2>Numbers</h2>
      <Persons
        filter={filter}
        persons={persons}
        updatePersons={setPersons}
        updateNotification={setNotificationMessage}
      />
    </div>
  )
}

export default App