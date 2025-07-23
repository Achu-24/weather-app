// API key (replace with your valid key)
const apiKey = '3a2b4c5d6e7f8g9h0i1j2k3l4m5n6o7p';

// DOM elements
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');
const getWeatherBtn = document.getElementById('getWeatherBtn');

// Event listener for button click
getWeatherBtn.addEventListener('click', getWeatherData);

/**
 * Fetch weather data for the entered city
 */
function getWeatherData() {
    const cityName = cityInput.value.trim();

    // Validate input
    if (!cityName) {
        weatherResult.innerHTML = `<p class="error-message">Please enter a city name!</p>`;
        return;
    }

    // Show loading message
    weatherResult.innerHTML = `<p>Loading...</p>`;

    // Fetch weather data from OpenWeatherMap
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                weatherResult.innerHTML = `<p class="error-message">City not found!</p>`;
                return;
            }

            // Extract required data
            const condition = data.weather[0].main;
            const temperature = Math.round(data.main.temp);
            const humidity = data.main.humidity;
            const city = data.name;

            // Display weather info
            weatherResult.innerHTML = `
                <div class="weather-condition">${condition}</div>
                <div class="temperature">${temperature}°C</div>
                <div class="weather-details">Humidity: ${humidity}%</div>
                <div class="weather-details">City: ${city}</div>
            `;
        })
        .catch(error => {
            weatherResult.innerHTML = `<p class="error-message">Error fetching weather data!</p>`;
            console.error(error);
        });
}
