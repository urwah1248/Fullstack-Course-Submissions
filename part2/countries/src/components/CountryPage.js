import React from 'react'
import { useParams, Link } from 'react-router-dom'
import WeatherInfo from './WeatherInfo';
import CountryDetails from './CountryDetails';


export default function CountryPage({countries}) {
    const {id} = useParams();

    console.log(id);
    console.log(countries.filter(country => country.cca2 === id));
    console.log(countries);

    const theCountry = countries.filter(country => country.cca2 === id)[0]
    console.log(theCountry);

  return (
    <div>
        <Link to='/'>
            Back to Main
        </Link>

        <CountryDetails country={theCountry}/>

    </div>
  )
}
