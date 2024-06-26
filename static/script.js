document.addEventListener('DOMContentLoaded', () => {
    // Initial weather info for predefined cities on page load
    getWeather('Tunisia', 'tunisiaInfo');
    getWeather('Bizerte', 'bizerteInfo');
    getWeather('Beja', 'bejaInfo');

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

function getWeather(city, infoId) {
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

document.getElementById('getLocationBtn').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById('locationOutput').innerText = "Geolocation is not supported by this browser.";
    }
});

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    document.getElementById('locationOutput').innerText = "Latitude: " + latitude + "°, Longitude: " + longitude + "°";

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
        document.getElementById('locationOutput').innerText = `Location: ${locationName}\nLatitude: ${latitude}°, Longitude: ${longitude}°\nTemperature: ${temperature}°K\nWeather: ${weatherDescription}\nPressure: ${pressure} hPa\nHumidity: ${humidity}%\nWind Speed: ${windSpeed} m/s`;
    })
    .catch(error => console.error('Error fetching weather data:', error));


}
document.getElementById('clearBtn').addEventListener('click', function() {
    document.getElementById('locationOutput').innerText = "";
});


function showError(error) {
    switch(error.code) {
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

