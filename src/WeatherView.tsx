import { useEffect } from 'react';

async function showWeatherAsync() {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

    if (!apiKey) {
        alert("put API key in .env.local as REACT_APP_WEATHER_API_KEY");
        return;
    }

    const city = prompt("Enter city for weather forecast", localStorage.getItem("CITY") || "");

    if (!city) {
        return;
    }

    localStorage.setItem("CITY", city);

    try {
        const requestUri = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        const response = await fetch(requestUri);
        const data = await response.json();
        alert(`Today it feels like ${Math.round(data.main.feels_like - 273)}°C`);
    } catch (err) {
        alert(err?.message || err);
    }
}

export default function WeatherView() {
    useEffect(() => {
        showWeatherAsync();
    }, []);

    return <div />
}