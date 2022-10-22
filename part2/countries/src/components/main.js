import { Link } from 'react-router-dom';
import { useState } from 'react';
import CountryDetails from './CountryDetails';

function Main({countries, setCountries}) {
  
  const [query, setQuery] = useState('')

  

  const handleChange = e => {
    setQuery(e.target.value)
    console.log(filteredCountries);
    console.log(query);
  }

  const filteredCountries = countries.filter(country => 
    country.name.toLowerCase().includes(query)
  )


  return (
    <div className="App">
      <h1>Countries</h1>
      <p>Find Country <input value={query} onChange={handleChange}/></p>
      {
        filteredCountries.length > 10 && (<div>Too many Results</div>)
      }
      {
        filteredCountries.length <= 10 && filteredCountries.length > 1 && filteredCountries.map(country => 
          <div>
            {country.name}
            <Link to={'/country/'+country.cca2}>
                <button type='button'>Show</button>
            </Link>
          </div>
        )
      }
      {
        filteredCountries.length === 1 && ( 
          <CountryDetails country={filteredCountries[0]}/>
        )
      }
    </div>
  );
}

export default Main;
