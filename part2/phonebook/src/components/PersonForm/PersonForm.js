import React, { useState } from 'react';

export default ({ persons, updatePersons }) => {

    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');

    const inputNameHandler = (e) => {
        setNewName(e.target.value)
    }
    const inputNumberHandler = (e) => setNewNumber(e.target.value);

    const submitHandler = (e) => {
        e.preventDefault();

        if (isExist(newName)) {
            updatePersons(persons.concat({ name: newName, number: newNumber }))
            return [setNewName(''), setNewNumber('')];
        } else {
            alert(`${newName} is already added to phonebook`);
        }
    }

    const isExist = (string) => {
        return persons.filter(p => p.name === string).length <= 0;

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