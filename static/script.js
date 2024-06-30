document.addEventListener('DOMContentLoaded', () => {

    getLocationAndWeather();

    // Initial weather info for predefined cities on page load
    getWeather('Tunisia', 'tunisiaInfo', 'tunisiaIcon');
    getWeather('Bizerte', 'bizerteInfo', 'bizerteIcon');
    getWeather('Beja', 'bejaInfo', 'bejaIcon');

    // Attach click event listener to the button
    const getWeatherBtn = document.getElementById('getWeatherBtn');
    getWeatherBtn.addEventListener('click', () => {
        const city = document.getElementById('cityInput').value.trim(); // Trim to remove leading/trailing spaces
        if (city === '') {
            alert('Please enter a city name.');
            return;
        }
        getWeather(city, 'weatherInfo'); // 'weatherInfo' is the div id where dynamic weather is shown
    });
});

function getWeather(city, infoId, iconId) {
    const apiKey = 'a3f586e9f9aa7265230bbc10f8891a93';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Check if data is received correctly in the browser console
            const weatherInfo = document.getElementById(infoId);
            if (!weatherInfo) {
                throw new Error(`Element with id '${infoId}' not found.`);
            }
            weatherInfo.innerHTML = `
            <h2>Weather in ${city}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Pressure: ${data.main.pressure} hPa</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Description: ${data.weather[0].description}</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
        

            const weatherIcon = document.getElementById(iconId);
            if (weatherIcon) {
                weatherIcon.innerHTML = getWeatherIcon(data.weather[0].icon);
            }

        })
        .catch(error => {
            console.error('Error fetching data:', error);
            const weatherInfo = document.getElementById(infoId);
            if (weatherInfo) {
                weatherInfo.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
            } else {
                console.error(`Element with id '${infoId}' not found to display error message.`);
            }
        });
}

function getWeatherIcon(icon) {
    switch (icon) {
        case '01d':
        case '01n':
            return '<i class="fa fa-sun"></i>';
        case '02d':
        case '02n':
            return '<i class="fa fa-cloud-sun"></i>';
        case '03d':
        case '03n':
            return '<i class="fa fa-cloud"></i>';
        case '04d':
        case '04n':
            return '<i class="fa fa-cloud"></i>';
        case '09d':
        case '09n':
            return '<i class="fa fa-cloud-showers-heavy"></i>';
        case '10d':
        case '10n':
            return '<i class="fa fa-cloud-rain"></i>';
        case '11d':
        case '11n':
            return '<i class="fa fa-bolt"></i>';
        case '13d':
        case '13n':
            return '<i class="fa fa-snowflake"></i>';
        case '50d':
        case '50n':
            return '<i class="fa fa-smog"></i>';
        default:
            return '<i class="fa fa-question-circle"></i>';
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    getLocationAndWeather();
});

function getLocationAndWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById('locationOutput').innerText = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Assign location without altitude and longitude initially
    document.getElementById('locationOutput').innerText = "Fetching weather data...";

    const apiKey = 'a3f586e9f9aa7265230bbc10f8891a93';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        const locationName = data.name;
        const temperature = data.main.temp;
        const weatherDescription = data.weather[0].description;
        const pressure = data.main.pressure;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;

        
        // Update locationOutput with desired weather data
        document.getElementById('locationOutput').innerText = `Location: ${locationName}\nTemperature: ${temperature}°C\nWeather: ${weatherDescription}\nPressure: ${pressure} hPa\nHumidity: ${humidity}%\nWind Speed: ${windSpeed} m/s`;
    })
    .catch(error => console.error('Error fetching weather data:', error));

}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById('locationOutput').innerText = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById('locationOutput').innerText = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            document.getElementById('locationOutput').innerText = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById('locationOutput').innerText = "An unknown error occurred.";
            break;
    }
}

document.getElementById('clearBtn').addEventListener('click', function() {
    document.getElementById('locationOutput').innerText = "";
});



document.addEventListener('DOMContentLoaded', function() {
    // Function to update day, date, and time
    function updateDateTime() {
        const now = new Date();
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const day = days[now.getDay()];
        
        const date = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        
        // Update elements only if they exist
        const dayElement = document.getElementById('day');
        const dateElement = document.getElementById('date');
        const timeElement = document.getElementById('time');
        
        if (dayElement) {
            dayElement.textContent = day;
        }
        if (dateElement) {
            dateElement.textContent = date;
        }
        if (timeElement) {
            timeElement.textContent = time;
        }
    }
    
    // Initial call to updateDateTime
    updateDateTime();
    
    // Update time every second
    setInterval(updateDateTime, 1000);
});
