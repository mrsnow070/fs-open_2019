import React, { useState } from 'react';
import { postAddEntry, putUpdateNumber } from '../../services/phonebookService';

export default ({ persons, updatePersons }) => {

    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');

    let indexOfExistingElement = -1;

    const inputNameHandler = (e) => {
        setNewName(e.target.value)
    }
    const inputNumberHandler = (e) => setNewNumber(e.target.value);

    const submitHandler = (e) => {
        e.preventDefault();

        if (isExist(newName)) {
            postAddEntry({ name: newName, number: newNumber })
            updatePersons(persons.concat({ name: newName, number: newNumber }))
            return [setNewName(''), setNewNumber('')];
        } else {
            if (window.confirm(`${newName} is already added to phonebook. Replace old number with a new one?`)) {
                const entry = persons[indexOfExistingElement];

                putUpdateNumber(entry.id, { ...entry, number: newNumber }).then(resp => {
                    if (resp.status === 200) {
                        updatePersons(persons.map(person => person.id !== entry.id ? person : resp.data))
                        return [setNewName(''), setNewNumber('')];
                    }
                })
            }
        }
    }

    const isExist = (string) => {
        const existingIndex = persons.findIndex(p => p.name === string)

        if (existingIndex === -1) {
            return true
        } else {
            indexOfExistingElement = existingIndex
        }


    }

    return (
        <form onSubmit={submitHandler}>
            <div>
                name: <input value={newName} onChange={inputNameHandler} />
            </div>
            <div>
                number: <input value={newNumber} onChange={inputNumberHandler} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
};