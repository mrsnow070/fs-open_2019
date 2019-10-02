import React from 'react';

export default ({ filter, persons }) => {

    const personsToShow = (filter) => {

        return findMatches(filter, persons).map(person => <p key={person.name}>{person.name} {person.number}</p>)
        // return(
        //   persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)
        // )
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