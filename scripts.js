// Refactored weather app script
// Replaced single-letter vars, separated concerns, added comments

const apiKey = 'd173de0a7a5ece720fdd7dbc6054d0fe'; // Your actual API key

/**
 * Fetch weather data and update UI
 */
function getWeatherData() {
  const cityInput = document.getElementById('cityInput').value.trim();
  const weatherResult = document.getElementById('weatherResult');

  if (!cityInput) {
    weatherResult.innerHTML = '<p class="error">Please enter a city name!</p>';
    return;
  }

  weatherResult.innerHTML = '<p>Loading...</p>';

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.cod === '404') {
        weatherResult.innerHTML = '<p class="error">City not found!</p>';
        return;
      }

      const weatherCondition = data.weather[0].main;
      const temperature = Math.round(data.main.temp);
      const humidity = data.main.humidity;
      const cityName = data.name;

      weatherResult.innerHTML = `
        <div class="weather">${weatherCondition}</div>
        <div class="temperature">${temperature}°C</div>
        <div class="detail">Humidity: ${humidity}%</div>
        <div class="detail">City: ${cityName}</div>
      `;
    })
    .catch(error => {
      weatherResult.innerHTML = '<p class="error">Error fetching weather data!</p>';
    });
}
