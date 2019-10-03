import React from 'react';
import Weather from './Weather';

export default (props) => {
    console.log(props.data)
    const { name, capital, population, languages, flag } = props.data
    const langList = languages.map(lang => <li key={lang.name}>{lang.name}</li>)
    return (
        <div>
            <h2>{name}</h2>
            <p>Capital: {capital}</p>
            <p>Population: {population}</p>
            <ul>
                {langList}
            </ul>
            <img style={{ width: '100px' }} src={flag} alt="flag" />

            <Weather capital={capital} />
        </div>
    )
};