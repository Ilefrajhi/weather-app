function getWeather() {
    const city = document.getElementById('cityInput').value;
    const apiKey = 'a3f586e9f9aa7265230bbc10f8891a93';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Check if data is received correctly in the browser console
            const weatherInfo = document.getElementById('weatherInfo');
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
            const weatherInfo = document.getElementById('weatherInfo');
            weatherInfo.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
        });
}
