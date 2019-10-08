import React, { useState } from 'react';
import { postAddEntry, putUpdateNumber, getByName, getAll } from '../../services/phonebookService';

export default ({ updatePersons, updateNotification }) => {

    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');

    const inputNameHandler = (e) => {
        setNewName(e.target.value)
    }
    const inputNumberHandler = (e) => setNewNumber(e.target.value);

    const submitHandler = (e) => {
        e.preventDefault();

        getByName(newName).then(data => {
            if (data.length === 0) {
                postAddEntry({ name: newName, number: newNumber })
                    .then(resp => {
                        updateNotification({
                            type: 'notification',
                            message: `Added ${newName}`
                        })
                        getAll()
                            .then(resp => updatePersons(resp));
                        return [setNewName(''), setNewNumber('')];
                    })
                    .catch(error => {
                        updateNotification({
                            type: 'error',
                            message: error.response.data.error
                        })

                    })
                    ;
            } else {
                if (window.confirm(`${newName} is already added to phonebook. Replace old number with a new one?`)) {
                    putUpdateNumber(data[0].id, {
                        ...data[0],
                        number: newNumber
                    })
                        .then(resp => {

                            updateNotification({
                                type: 'notification',
                                message: `Number ${newName} is changed`
                            });
                            getAll()
                                .then(resp => updatePersons(resp));
                            return [setNewName(''), setNewNumber('')];
                        })
                        .catch(err => {
                            console.log(err.response)
                            updateNotification({
                                type: 'error',
                                message: err.response.data.error
                            })
                        })
                }
            }
        })
    }


    return (
        <form onSubmit={submitHandler}>
            <div>
                name: <input
                    value={newName}
                    onChange={inputNameHandler}
                />
            </div>
            <div>
                number: <input
                    value={newNumber}
                    onChange={inputNumberHandler}
                />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
};