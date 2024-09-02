function changeWeather(response) {
  let tempElement = document.querySelector("#weather-app-temp");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#weather-app-city");
  let city = response.data.city;
  let descriptionElement = document.querySelector("#description");
  let descript = response.data.condition.description;
  let humidityElement = document.querySelector("#humidity");
  let humid = response.data.temperature.humidity;
  let windSpeedElement = document.querySelector("#wind-speed");
  let speed = response.data.wind.speed;
  let timeElement = document.querySelector("#day-time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");
  let icon = `<img src="${response.data.condition.icon_url}" class="weather-icon" />`;

  tempElement.innerHTML = temperature;
  iconElement.innerHTML = icon;
  cityElement.innerHTML = city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = descript;
  humidityElement.innerHTML = humid;
  windSpeedElement.innerHTML = speed;
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thrusday",
    "Firday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "3tb400c941f2a4edo23f9347ffbbacfd";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(changeWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let city = searchInput.value;
  searchCity(city);
}

function displayForecast() {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
        <div class="forecast-day">
            <div class="day-of-week">${day}</div>
            <div class="forecast-day-icon">☀️</div>
            <div class="forecast-temps">
            <div class="forecast-temp">
                <strong>90°</strong>
            </div>
            <div class="forecast-temp">
                75°
            </div>
            </div>
        </div>
        `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Tucson");
displayForecast();
