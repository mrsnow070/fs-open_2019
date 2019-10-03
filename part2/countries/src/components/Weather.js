import React, { useState, useEffect } from 'react';
import axios from "axios";

export default ({ capital }) => {
    const apiKey = '2032b556f193c3250849f2dfe78bebc6';
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        axios.get(`http://api.weatherstack.com/current?access_key=${apiKey}&query=${capital}`)
            .then(resp => setWeather(resp.data.current))
    }, [])

    console.log(weather)

    let currentWeather = <div>
        <h2>Weather in {capital}</h2>
        <p>Loading...</p>
    </div>

    if (weather) {
        currentWeather = (
            <div>
                <h2>Weather in {capital}</h2>
                <p>
                    <span>temperature</span>: {weather.temperature} Celsius</p>
                <div>
                    <img src={weather.weather_icons} alt="weather icon" />
                </div>
                <p>
                    <span>wind </span>:{weather.wind_speed} kph direction {weather.wind_dir}
                </p>
            </div>
        )
    }

    return (
        <>
            {currentWeather}
        </>
    )
};