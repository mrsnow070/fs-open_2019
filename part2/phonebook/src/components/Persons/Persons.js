import React from 'react';
import { deleteEntry } from '../../services/phonebookService'

export default ({ filter, persons, updatePersons, updateNotification }) => {

    const deleteHandler = (id, name) => {
        const updatedPersons = persons.filter(p => p.id !== id);
        if (window.confirm(`Do you really want delete ${name}`)) {

            deleteEntry(id).then(resp => {
                updatePersons([...updatedPersons])
                updateNotification({ type: 'notification', message: `${name} successely deleted` })

            }).catch(error => {
                updateNotification({
                    type: 'error',
                    message: `Information of ${name} has already removed from server`
                });
                updatePersons(persons.filter(person => person.name !== name))
            })
        }
    }

    const personsToShow = (filter) => {

        return findMatches(filter, persons).map(
            person => <p
                key={person.name}
            >
                {person.name} {person.number} <button onClick={() => deleteHandler(person.id, person.name)}>delete &times;
                </button>
            </p>
        )

    };

    const findMatches = (wordToMatch, persons) => {
        return persons.filter(string => {
            const regex = new RegExp(wordToMatch, 'gi');
            return string.name.match(regex);
        })
    }


    return (
        personsToShow(filter)
    )

};