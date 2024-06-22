import './style.css';

const key = 'd29476f814a14afebb130134242106';
const searchBar = document.querySelector('.city-search');
const button = document.querySelector('.city-submit');
const weatherCards = document.querySelector('.cards');
const mainCard = document.querySelector('.card-main');
const cards = document.querySelectorAll('.card');
const loading = document.querySelector('.loading');

async function getWeather(location) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${location}&days=3`, { mode: 'cors' });
        let data = await response.json();
        return ({
            location: data.location.name,
            currentIcon: data.current.condition.icon,
            currentTemp: data.current.temp_f,
            forecast: data.forecast.forecastday
        });
    } catch (err) {
        console.log('fetch error:', err)
        return null;
    }
}

async function submitCity(e = "") {
    if (e) e.preventDefault();
    turnLoading("on");
    const data = await getWeather(searchBar.value ? searchBar.value : "London");
    displayWeather(data);
    turnLoading("off");
}

function displayWeather(data) {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    const date = new Date();

    let counter = date.getDay();

    const mainCardWeek = mainCard.querySelector('.card-week');
    const mainCardDate = mainCard.querySelector('.card-date');
    const mainCardCity = mainCard.querySelector('.card-city');
    const mainCardWeather = mainCard.querySelector('.card-weather span');
    const mainCardImg = mainCard.querySelector('#card-img');

    mainCardWeek.textContent = daysOfWeek[date.getDay()];
    mainCardDate.textContent = date.getDate() + ', ' + month[date.getMonth()];
    mainCardCity.textContent = data.locationName;
    mainCardWeather.textContent = Math.round(data.currentTemp);
    mainCardImg.src = 'https:' + data.currentIcon;

    cards.forEach((card, i) => {
        if (counter == 6) counter = 0;
        else counter += 1;

        const cardData = data.forecast[i];

        const cardWeek = card.querySelector('.card-date');
        const cardHigh = card.querySelector('.card-weather span');
        const cardLow = card.querySelector('.card-subweather span');
        const cardImg = card.querySelector('#card-img');

        cardWeek.textContent = daysOfWeek[counter];
        cardHigh.textContent = Math.round(cardData.day.maxtemp_f);
        cardLow.textContent = Math.round(cardData.day.mintemp_f);
        cardImg.src = 'https:' + cardData.day.condition.icon;
    });
}

function turnLoading(turn = "on") {
    if (turn == "on") {
        loading.classList.remove('hidden');
        weatherCards.classList.add('hidden');
    } else {
        loading.classList.add('hidden');
        weatherCards.classList.remove('hidden');
    }
}

submitCity();

button.addEventListener('click', submitCity);
