import './style.css';

const key = 'd29476f814a14afebb130134242106';

async function getWeather(city) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=3`, { mode: 'cors' });
        let data = await response.json();
        return ({
            location: data.location.name,
            currentIcon: data.current.condition.icon,
            currentTempC: data.current.temp_c,
            currentTempF: data.current.temp_f,
            forecast: data.forecast.forecastday
        });
    } catch (err) {
        console.log('fetch error:', err)
        return null;
    }
}


