import React from 'react'
import WeatherInfo from './WeatherInfo'

export default function CountryDetails({ country }) {
  return (
    <div>
        <h1>{country.name}</h1>
        <div><strong>Capital City: </strong> {country.capital}</div>
        <div><strong>Area:</strong> {country.area} sq. km</div>
        <div><h3>Languages: </h3>
            <ul>
            {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
            </ul> 
        </div>
        <img src={country.flags.png} alt={'flag of '+ country.name} />
        
        <h1>Weather in {country.capital}, {country.name}</h1>
        <WeatherInfo country={country} />
    </div>
  )
}
