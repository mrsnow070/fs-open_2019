import React, { useState, useEffect } from 'react';
import axios from "axios";
import Country from './components/Country';

function App() {

  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');



  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(resp => setCountries([...resp.data]))
  }, [])

  const filterHandler = (e) => {
    setFilter(e.target.value)
  }



  const findMatches = (wordToMatch, countries) => {
    return countries.filter(string => {
      const regex = new RegExp(wordToMatch, 'gi');
      return string.name.match(regex);
    })
  }

  const countriesToShow = () => {

    let data = findMatches(filter, countries);

    if (data.length === 1) {
      return <Country data={data[0]} />
    }
    if (data.length <= 10) {
      return (
        <ul>
          {data.map(
            c => <li
              key={c.name}
            >
              {c.name}
              <button onClick={() => setFilter(c.name)}>show</button>
            </li>
          )
          }
        </ul>)
    }
    if (filter.length === 0) {
      return null
    }

    if (data.length > 10) {
      return <p>To many matches, specify another filter</p>

    }


  }

  return (
    <div className="App">
      <div>
        find countries <input type="text" value={filter} onChange={filterHandler} />

      </div>
      {countriesToShow()}
    </div>
  );
}

export default App;
