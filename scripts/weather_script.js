const daysOfWeek = [
    'Sun', 'Mon', 'Tue', 'Wed',
    'Thu', 'Fri', 'Sat'
];

const path = "../static/";

const weatherToSVG = {
    'clouds': "clouds.svg",
    'rain': "rain.svg",
    'clear': 'sun.svg',
    'smoke': 'clouds.svg',
    'haze': 'clouds.svg'
}

async function getWeather() {
    const res = await fetch("https://api.openweathermap.org/data/3.0/onecall?lat=19.075983&lon=72.877655&appid=493539b698dd287f1855cd6f2c7976c7&units=metric");
    var data = await res.json();

    // console.log(data);

    // Populate card with data
    document.getElementById("temp").innerText = data.current.temp.toFixed(1) + '°C';
    document.getElementById("feels-like").innerText += ` ${data.current.feels_like.toFixed(1)}°`;
    const current_icon = document.getElementById("current_icon");
    current_icon.src = path+weatherToSVG[data.current.weather[0].main.toLowerCase()];
    current_icon.alt = data.current.weather[0].description;
    // document.getElementById('humidity').innerHTML = data.current.humidity;
    // document.getElementById('wind_speed').innerHTML = data.current.wind_speed;
    // document.getElementById('current_main_weather').innerText = data.current.weather[0].description;


    data.daily.forEach((dayData, i) => {
        // console.log(dayData);

        // Get the container to generate elements in
        const container = document.getElementById('daily-weather-container');
        // Create a new div element for the day's weather
        const weatherDiv = document.createElement('div');
        weatherDiv.classList.add('daily-data-row');

        // 
        const minTemp = document.createElement('span');
        minTemp.textContent = `${dayData.temp.min.toFixed(1)}°`;

        const maxTemp = document.createElement('span');
        maxTemp.textContent = `${dayData.temp.max.toFixed(1)}°`;

        const today = new Date();
        const targetDate = new Date(today);
        targetDate.setDate(today.getDate() + i);

        const dayElement = document.createElement('span');
        dayElement.textContent = i == 0 ? 'Today' : i == 1 ? 'Tomorrow' : daysOfWeek[targetDate.getDay()];


        const mainWeatherIcon = document.createElement('img');
        mainWeatherIcon.classList.add('daily-weather-icon');
        var mainWeather = dayData.weather[0].main.toString();
        mainWeatherIcon.src = path+weatherToSVG[mainWeather.toLowerCase()];
        
        // Append elements to the weather div
        weatherDiv.appendChild(dayElement);
        weatherDiv.appendChild(minTemp);
        weatherDiv.appendChild(maxTemp);
        weatherDiv.appendChild(mainWeatherIcon);

        // Append the weather div to the container
        container.appendChild(weatherDiv);
    });
}

getWeather();


function getDate() {
    document.getElementById('date').innerHTML = new Date().toDateString();
}
getDate();

function checkTime(i) {
    if (i < 10) { i = "0" + i };
    return i;
}

function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('hrs').innerHTML = h;
    document.getElementById('min').innerHTML = m;
    document.getElementById('sec').innerHTML = s;
    setTimeout(startTime, 1000);
}

startTime();
